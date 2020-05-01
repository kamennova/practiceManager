import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { getNotificationId, updateNotificationId, updateNotificationInterval } from "./db/piece";
import { Piece } from "./types/Piece";
import { dayToSeconds, getDaysFromSeconds } from "./utils/time";

export const getNotifsPermission = async () => {
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

        if (existingStatus !== 'granted') {
            await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
    }
};

const getPieceNotifContent = (name: string, authors: string, lastPracticed: number) => ({
    title: `Time to practice ${name} by ${authors}`,
    body: `You haven't practiced this piece in ${getDaysFromSeconds(Date.now() - lastPracticed)} days`,
});

const updatePieceNotifId = async (pieceId: number, notifId: number | null) => await
    updateNotificationId(pieceId, notifId);

export const getPieceNotifId = async (pieceId: number): Promise<number | null> => await getNotificationId(pieceId);

export const schedulePieceNotif = async (piece: Piece): Promise<void> => {
    const startPoint = piece.lastPracticedOn !== undefined ? piece.lastPracticedOn : piece.addedOn;
    const lastPracticeInterval = Date.now() - startPoint.getSeconds();
    const secondsTillFireNotif = dayToSeconds(piece.notifsInterval) - lastPracticeInterval;

    const content = getPieceNotifContent(piece.name, piece.authors.toString(), lastPracticeInterval);

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

    await updatePieceNotifId(piece.id, notifId);
};

export const updatePieceNotifInterval = async (piece: Piece) => {
    await updateNotificationInterval(piece.id, piece.notifsInterval);

    if (piece.notifsOn && piece.notifId !== null) {
        await Promise.all([
            Notifications.cancelScheduledNotificationAsync(piece.notifId),
            schedulePieceNotif(piece),
        ]);
    }
};

export const cancelPieceNotif = async (pieceId: number) => {
    const notifId = await getPieceNotifId(pieceId);

    if (notifId !== null) {
        await Promise.all([
            updatePieceNotifId(pieceId, null),
            Notifications.cancelScheduledNotificationAsync(notifId),
        ]);
    }
};
