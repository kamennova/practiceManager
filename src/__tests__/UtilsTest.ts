import { ActivityType, Exercise, Tonality } from "../types/activity/Activity";
import { enumKeys, pieceGroupBy, replaceItem, swipe } from "../utils/array";
import { daysAgo, formatDateDiff, getHours, getMinutes } from "../utils/time";
import { getActivityTitle } from "../utils/title";

it('replaceItem, pure', () => {
    const arr = [{ id: 1, val: 2 }, { id: 2, val: 10 }, { id: 3, val: 15 }, { id: 4, val: 4 }];
    const replaced = replaceItem<{ id: number, val: number }>(arr, { id: 3, val: 100 });

    expect(replaced[2].val).toBe(100);
    expect(arr).toEqual([{ id: 1, val: 2 }, { id: 2, val: 10 }, { id: 3, val: 15 }, { id: 4, val: 4 }]);
});

it('swipe, pure', () => {
    const arr = [1, 2, 3, 4, 5];

    const swiped1 = swipe(arr, 0, 1);
    expect(swiped1[0]).toBe(2);
    expect(swiped1[1]).toBe(1);

    const swiped2 = swipe(arr, 2, 3);
    expect(swiped2[2]).toBe(4);
    expect(swiped2[3]).toBe(3);

    expect(arr).toEqual([1, 2, 3, 4, 5]);
});

it('enum keys', () => {
    enum TestEnum {
        FirstKey = 'firstVal',
        secondKey = 'secondVal',
        ThirdKey = 'thirdVal'
    }

    const keys =enumKeys(TestEnum);
    expect(keys[0]).toBe('FirstKey');
    expect(keys[1]).toBe('secondKey')
});

it('get minutes', () => expect(getMinutes(123)).toBe(3));

it('get hours', () => expect(getHours(215)).toBe(3));

it('technique title without details',
    () => expect(getActivityTitle({ type: ActivityType.Technique })).toBe('Technique'));

it('technique title with tonality', () => expect(getActivityTitle({
    type: ActivityType.Technique,
    tonality: Tonality.ASharp
})).toBe('Technique in A#'));

it('technique title with details', () => expect(getActivityTitle({
    type: ActivityType.Technique,
    tonality: Tonality.C,
    exercise: Exercise.Chords,
})).toBe('Chords in C'));

it('piece title with name', () => expect(getActivityTitle({
    type: ActivityType.Piece,
    pieceId: 1
}, { name: 'Canon' })).toBe('Canon'));

it('piece title with details', () => expect(getActivityTitle({
    type: ActivityType.Piece,
    pieceId: 1
}, { name: 'Canon', authors: ['Pachelbel'] })).toBe('Canon'));

it('sightreading title with details', () => expect(getActivityTitle({
    type: ActivityType.SightReading,
    pieceId: 1
}, { name: 'Canon', authors: ['Pachelbel'] })).toBe('Sight reading: Canon'));

it('pieceGroupByDuration', () => {
    const grouped = pieceGroupBy([
        { pieceId: 4, duration: 5 },
        { pieceId: 4, duration: 8 },
        { pieceId: 1, duration: 2 },
        { pieceId: 3, duration: 8 }]);

    expect(grouped[4]).toBe(13);
    expect(grouped[1]).toBe(2);
    expect(grouped[3]).toBe(8);
});

it('formatDateDiff', () => {
    expect(formatDateDiff(new Date())).toBe('Today');
    expect(formatDateDiff(daysAgo(1))).toBe('Yesterday');
    expect(formatDateDiff(daysAgo(3))).toBe('3 days ago');
    expect(formatDateDiff(daysAgo(7))).toBe('1 week ago');
    expect(formatDateDiff(daysAgo(200))).toBe('Long ago');
});
