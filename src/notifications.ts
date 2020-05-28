import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import pieceDb from "./db/fix/Database";
import { Piece } from "./types/piece";
import { dayToSeconds, getDaysFromSeconds } from "./utils/time";
import { PieceCredits } from "./utils/title";

const { updateNotifId, updateNotifInterval } = pieceDb();

export const getNotifsPermission = async () => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        if (existingStatus !== 'granted') {
            await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    }
};

const getPieceNotifContent = (pieceCredits: PieceCredits, lastPracticed: number) => {
    const days = getDaysFromSeconds(Date.now() - lastPracticed),
        daysText = days > 1 ? `${days} days` : `a day`;
    const authorsText = (pieceCredits.authors !== undefined ? `by ${pieceCredits.authors}` : '');

    return {
        title: `Time to practice ${pieceCredits.name} ${authorsText}`,
        body: `You haven't practiced this piece for ${daysText}`,
    };
};

export const schedulePieceNotif = async (piece: Piece): Promise<number> => {
    const startPoint = piece.lastPracticedOn !== undefined ? piece.lastPracticedOn : piece.addedOn,
        lastPracticeInterval = Date.now() - startPoint.getSeconds(),
        secondsTillFireNotif = dayToSeconds(piece.notifsInterval) - lastPracticeInterval;

    const authors = piece.authors.length > 0 ? piece.authors : undefined;
    const content = getPieceNotifContent({ name: piece.name, authors }, lastPracticeInterval);

    const localNotification = {
        title: content.title,
        body: content.body,
        android: {
            sound: true,
            sticky: false,
            vibrate: true
        },
    };

    const schedulingOptions = {
        time: (new Date()).getSeconds() + Math.max(secondsTillFireNotif, 0),
        repeat: "day" as "day",
    };

    const notifId = Number(await Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions));

    await updateNotifId(piece.id, notifId);

    return Promise.resolve(notifId);
};

export const updatePieceNotifInterval = async (piece: Piece) =>
    await Promise.all([
        updateNotifInterval(piece.id, piece.notifsInterval),
        rescheduleNotifIfSet(piece)
    ]);

const rescheduleNotifIfSet = async (piece: Piece) => {
    if (piece.notifsOn && piece.notifId !== null) {
        await Promise.all([
            cancelNotifById(piece.notifId),
            schedulePieceNotif(piece),
        ]);
    }
};

export const cancelPieceNotif = async (pieceId: number, notifId: number) =>
    await Promise.all([
        updateNotifId(pieceId, null),
        cancelNotifById(notifId),
    ]);

export const cancelNotifById = async (id: number) => await Notifications.cancelScheduledNotificationAsync(id);

export const cancelNotifIfSet = async (notifId: number | null) => {
    if (notifId !== null) {
        await cancelNotifById(notifId);
    }
};
