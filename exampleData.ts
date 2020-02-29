import { ActivityType } from "./types/Activity";
import { Piece } from "./types/Piece";
import { SessionPlan } from "./types/SessionPlan";

export const pieces: Piece[] = [
    { name: 'Believer', composers: ['Imagine Dragons'], timeSpent: 23 },
    { name: 'Faded', composers: ['Alan Walker'] , timeSpent: 22},
];

export const plans: SessionPlan[] = [
    new SessionPlan('Daily session',
        [
            {
                type: ActivityType.WarmUp,
                duration: 5,
            },
            {
                type: ActivityType.Technique,
                duration: 20,
                schedule: [
                    {
                        name: 'Arpegio',
                        sideNote: 'quicker',
                        duration: 5,
                    },
                    {
                        name: 'Scales',
                        sideNote: 'neat',
                        duration: 25,
                    }
                ]
            },
            {
                type: ActivityType.Break,
                duration: 5,
            },
            {
                type: ActivityType.Pieces,
                duration: 40,
                schedule: [
                    {
                        name: 'Faded by Alan Walker',
                        duration: 14,
                    },
                    {
                        name: 'Pachelbel\'s Canon',
                        duration: 23
                    }
                ]
            }
        ]
    ),
    new SessionPlan('Pre-concert',
        [
            {
                type: ActivityType.WarmUp,
                duration: 5,
            },
            {
                type: ActivityType.Technique,
                duration: 20,
                schedule: [
                    {
                        name: 'Arpegio',
                        sideNote: 'quicker',
                        duration: 5,
                    },
                    {
                        name: 'Scales',
                        sideNote: 'neat',
                        duration: 25,
                    }
                ]
            },
            {
                type: ActivityType.Break,
                duration: 5,
            },
            {
                type: ActivityType.Pieces,
                duration: 40,
                schedule: [
                    {
                        name: 'Faded by Alan Walker',
                        duration: 14,
                    },
                    {
                        name: 'Pachelbel\'s Canon',
                        duration: 23
                    }
                ]
            }
        ]
    )
];
