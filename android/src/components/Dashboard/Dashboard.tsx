import React from 'react';
import { connect } from "react-redux";
import { StateShape } from "../../store/StoreState";
import { getActivitiesReport, totalDuration } from "../../types/activity";
import { PieceBase, PieceStatus } from "../../types/piece";
import { Session } from "../../types/Session";
import { secondsToHumanlyFormat } from "common/utils/time";
import { ItemFeatures } from "../basic/Item/ItemFeatures";
import { ItemSection } from "../basic/ItemSection";
import { ScreenWrapper } from "../basic/ScreenWrapper";

type DashboardProps = {
    pieces: PieceBase[],
    sessions: Session[],
};

const _Dashboard = (props: DashboardProps) => {
    const piecesOverview = getPiecesOverview(props.pieces);
    const sessionsOverview = getSessionsOverview(props.sessions);
    const activitiesOverview = getActivitiesOverview(props.sessions);

    return (
        <ScreenWrapper>
            <ItemSection title={'Pieces overview'}>
                <ItemFeatures items={piecesOverview}/>
            </ItemSection>

            <ItemSection title={'Sessions overview'}>
                <ItemFeatures items={sessionsOverview}/>
            </ItemSection>

            <ItemSection title={'Activities overview'}>
                <ItemFeatures items={activitiesOverview}/>
            </ItemSection>
        </ScreenWrapper>
    );
};

const getPiecesOverview = (pieces: PieceBase[]) => {
    const inWork = pieces.filter(p => p.status === PieceStatus.InWork).length;

    return [
        { label: 'All', val: pieces.length },
        { label: 'In work', val: inWork },
        { label: 'Not started', val: pieces.length - inWork },
    ];
};

const getSessionsOverview = (sessions: Session[]) => [
    { label: 'Total number', val: sessions.length, },
    { label: 'Total time', val: secondsToHumanlyFormat(getTotalSessionsLength(sessions)) },
    { label: 'Longest session', val: secondsToHumanlyFormat(getLongestSessionTime(sessions)) },
];

const getActivitiesOverview = (sessions: Session[]) => {
    const reports = sessions.map(s => getActivitiesReport(s.history));

    let values = {
        technique: 0,
        pieces: 0,
        sightReading: 0
    };

    reports.forEach(r => {
        values.technique += r.technique;
        values.pieces += r.pieces;
        values.sightReading += r.sightReading;
    });

    return [
        { label: 'Technique', val: secondsToHumanlyFormat(values.technique) },
        { label: 'Pieces', val: secondsToHumanlyFormat(values.pieces) },
        { label: 'Sight-reading', val: secondsToHumanlyFormat(values.sightReading) },
    ];
};

const getTotalSessionsLength = (sessions: Session[]) => {
    let time = 0;

    sessions.map(s => time += totalDuration(s.history));

    return time;
};

const getLongestSessionTime = (sessions: Session[]) => {
    return sessions.length > 0 ? Math.max.apply(null, sessions.map(s => totalDuration(s.history))) : 0;
};

const mapStateToProps = (state: StateShape) => ({
    sessions: state.sessions.items,
    pieces: state.pieces.items,
});

export const Dashboard = connect(mapStateToProps)(_Dashboard);
