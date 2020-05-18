import React from 'react';

import renderer from 'react-test-renderer';
import { PieceNotifications } from "../components/Pieces/PieceNotifications";

describe('PieceNotifications', () => {
    it('has 1 child', () => {
        const tree = renderer.create(<PieceNotifications updateInterval={() => {
        }} enabled={true} interval={3} updateEnabled={() => {
        }}/>).toJSON();
        expect(tree.children.length).toBe(2);
    });
});
