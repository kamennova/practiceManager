import { StateShape, SessionState } from 'common/store/StoreState';
import { ActivitiesReport, getActivitiesReport } from "common/types/activity";
import { getActivitiesWithDuration } from 'common/utils/activity';
import { secondsToHumanlyFormat } from 'common/utils/time';
import React from 'react';
import { connect } from "react-redux";

const SessionEnd = (props: { session: SessionState, }) => {
    const report = getActivitiesReport(getActivitiesWithDuration(props.session));

    return (
        <div style={{
            width: '100%'
        }}>
            <div style={{
                alignItems: 'center',
                alignContent: 'center',
                marginTop: 'auto',
                marginBottom: 'auto'
            }}>
                <h2> Well done! </h2>

                <SessionStats report={report}/>

                <div style={{ marginTop: 20, marginBottom: 120 }} className={'flex'}>
                    <span style={{
                        fontSize: 15,
                        marginRight: 5,
                        fontWeight: 'bold'
                    }}> {secondsToHumanlyFormat(report.totalDuration)}{' '}</span><span>in total</span>
                </div>

            </div>
        </div>
    );
};

const SessionStats = (props: { report: ActivitiesReport }) => (
    <div className={'flex'} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
        <ActivityStats label={'Technique'} duration={props.report.technique}/>
        <ActivityStats label={'Pieces'} duration={props.report.pieces}/>
        <ActivityStats label={'Sight-reading'} duration={props.report.sightReading}/>
    </div>

);

const ActivityStats = (props: { label: string, duration: number, isLast?: boolean }) => {
    return (
        <div style={{ paddingLeft: 6, paddingRight: 7, alignItems: 'center', marginRight: props.isLast ? 0 : 15 }}>
            <span
                style={{
                    fontSize: 23,
                    fontWeight: 'bold'
                }}>{secondsToHumanlyFormat(Math.floor(props.duration))}</span><br/>
            <span style={{ fontSize: 14 }}>{props.label}</span>
        </div>
    );
};

const mapStateToProps = (state: StateShape) => ({
    session: state.sessions.current,
});

export const SessionEndScreen = connect(mapStateToProps)(SessionEnd);
