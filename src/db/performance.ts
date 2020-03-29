import { createTags, createTags2 } from "./db";

export const check = async (n: number = 100) => {
    const a = Date.now();
    console.log('check', a);
    // const repo = getRepository(PieceEntity);

    for (let i = 0; i < n; i++) {
        await createTags2(['one', 'tow', 'three'])
    }

    const b = Date.now();
    console.log('time', (b - a) / n);

    for (let i = 0; i < n; i++) {
        await createTags(['one', 'tow', 'three']);
    }

    console.log('time', (Date.now() - b) / n);
};
