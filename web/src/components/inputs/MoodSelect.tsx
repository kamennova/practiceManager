import { PieceMood } from "common/types/piece/Piece";
import React from "react";
import { FormControl } from "../FormControl";
import { Select } from "./Select";

export const MoodSelect = (props: { value?: PieceMood, onChange: (m: PieceMood) => void }) => (
    <FormControl label={'Mood'}>
        <Select options={[
            { label: PieceMood.Cheerful, value: PieceMood.Cheerful, icon: 'mood' },
            { label: PieceMood.Peaceful, value: PieceMood.Peaceful, icon: 'sentiment_satisfied_alt' },
            { label: PieceMood.Sad, value: PieceMood.Sad, icon: 'mood_bad' },
            { label: PieceMood.Mixed, value: PieceMood.Mixed, icon: 'help_center' },
        ]}
                value={props.value}
                onChange={(v) => props.onChange(v as PieceMood)}/>
    </FormControl>
);
