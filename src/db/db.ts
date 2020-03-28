import { getRepository } from "typeorm";
import { Piece, PieceBase, PieceComplexity, PieceGenre, PieceStatus } from "../types/Piece";
import { AuthorEntity } from "./entity/Author";
import { PieceEntity } from "./entity/Piece";
import { TagEntity } from "./entity/Tag";

const createTags = (tags: string[]): TagEntity[] => tags.map(tag => {
    const ent = new TagEntity();
    ent.name = tag;

    return ent;
});

const createAuthors = (authors: string[]): AuthorEntity[] => authors.map(author => {
    const ent = new AuthorEntity();
    ent.name = author;

    return ent;
});

export const addPiece = async (piece: Piece): Promise<Piece> => {
    const newPiece = new PieceEntity();
    newPiece.name = piece.name;
    newPiece.addedOn = Date.now();
    newPiece.notificationsInterval = piece.notifications.interval;
    newPiece.notificationsOn = piece.notifications.enabled;
    newPiece.isFavourite = false;
    newPiece.imageUri = piece.imageUri !== undefined ? piece.imageUri : '';
    newPiece.tags = createTags(piece.tags);
    newPiece.authors = createAuthors(piece.authors);

    const pieceRepository = getRepository(PieceEntity);
    await pieceRepository.save(newPiece);

    return Promise.resolve({ ...piece, id: newPiece.id });
};

export const getPieceById = async (id: number): Promise<Piece | undefined> => {
    const repos = await getRepository(PieceEntity);
    const ent = await repos.findOne(id, { relations: ['authors', 'tags', 'notes'] });

    if (ent === undefined) {
        return Promise.resolve(undefined);
    }

    return Promise.resolve(pieceFromEntity(ent));
};

export const updatePiece = async (piece: Piece): Promise<void> => {
    const repo = await getRepository(PieceEntity);
    const pieceUpd = await repo.findOne(piece.id, { relations: ['authors', 'tags'] });

    if (pieceUpd === undefined) {
        return await Promise.reject('piece not found');
    }

    pieceUpd.name = piece.name;
    pieceUpd.imageUri = piece.imageUri !== undefined ? piece.imageUri : '';
    pieceUpd.tags = createTags(piece.tags);
    pieceUpd.authors = createAuthors(piece.authors);
};

export const togglePieceNotifs = async (id: number): Promise<void> => {
    const repo = getRepository(PieceEntity);
    const pieceUpd = await repo.findOne(id);

    if (pieceUpd === undefined) {
        throw new Error('piece not found');
    }

    pieceUpd.notificationsOn = !pieceUpd.notificationsOn;
    await repo.save(pieceUpd);
};

export const updatePieceNotifsInterval = async (id: number, interval: number): Promise<void> => {
    const repo = getRepository(PieceEntity);
    const pieceUpd = await repo.findOne(id);

    if (pieceUpd === undefined) {
        throw new Error('piece not found');
    }

    pieceUpd.notificationsInterval = interval;
    await repo.save(pieceUpd);
};

export const togglePieceIsFavourite = async (id: number): Promise<void> => {
    // todo optimize
    const repo = getRepository(PieceEntity);
    const pieceUpd = await repo.findOne(id);

    if (pieceUpd === undefined) {
        return await Promise.reject('piece not found, id: ' + id);
    }

    pieceUpd.isFavourite = !pieceUpd.isFavourite;
    await repo.save(pieceUpd);
};

export const deletePiece = async (id: number): Promise<void> => {
    const repo = getRepository(PieceEntity);
    const piece = await repo.findOne({ id });

    if (piece === undefined) {
        return await Promise.reject('piece not found, id: ' + id);
    }

    await repo.remove(piece);
};

export const getPiecesMeta = async (): Promise<PieceBase[]> => {
    const repo = await getRepository(PieceEntity);
    return (await repo.find({ relations: ['authors', 'tags'] })).map(pieceBaseFromEntity);
};

export const getPieces = async (): Promise<Piece[]> => {
    const repo = await getRepository(PieceEntity);

    return (await repo.find({ relations: ['authors', 'tags', 'notes'] })).map(pieceFromEntity);
};

const pieceBaseFromEntity = (ent: PieceEntity): PieceBase => ({
    id: ent.id,
    name: ent.name,
    timeSpent: 0,
    isFavourite: ent.isFavourite,
    imageUri: ent.imageUri === '' ? undefined : ent.imageUri,
    tags: ent.tags.map(tag => tag.name),
    authors: ent.authors.map(author => author.name),
    addedOn: new Date(ent.addedOn),
    status: PieceStatus.NotStarted,
    complexity: PieceComplexity.Easy,
    genre: PieceGenre.Classical,
});

const pieceFromEntity = (ent: PieceEntity): Piece => ({
    ...pieceBaseFromEntity(ent),
    notifications: {
        interval: ent.notificationsInterval,
        enabled: ent.notificationsOn,
    },
    notes: [],
    recordings: [],
    originalUri: ent.originalUri,
});
