import { PieceComplexity } from "common/types/piece/Piece";
import React from "react";
import { FormControl } from "../FormControl";
import { Select } from "./Select";

export const PieceComplexitySelect = (props: { value?: PieceComplexity, onChange: (c: PieceComplexity) => void }) => (
    <FormControl label={'Complexity'}>
        <Select options={[
            { label: PieceComplexity.Easy, value: PieceComplexity.Easy, icon: 'mood' },
            { label: PieceComplexity.Medium, value: PieceComplexity.Medium, icon: 'mood' },
            { label: PieceComplexity.Hard, value: PieceComplexity.Hard, icon: 'mood' },
            { label: PieceComplexity.Challenging, value: PieceComplexity.Challenging, icon: 'mood' },
        ]}
                value={props.value}
                onChange={(s) => props.onChange(s as PieceComplexity)}/>
    </FormControl>
);
