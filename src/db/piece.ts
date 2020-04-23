import { getRepository } from "typeorm";
import { Piece, PieceBase, PieceComplexity, PieceGenre, PieceStatus } from "../types/Piece";
import { AuthorEntity, PieceEntity, TagEntity } from "./entity/piece";

export const createTags = async (tags: string[]): Promise<TagEntity[]> => {
    const ents: TagEntity[] = [],
        repo = getRepository(TagEntity);

    await Promise.all(tags.map(async tag => {
        const sameTag = await repo.findOne({ name: tag });

        if (sameTag === undefined) {
            const ent = new TagEntity();
            ent.name = tag;
            ents.push(ent);
        } else {
            ents.push(sameTag)
        }
    }));

    return Promise.resolve(ents);
};

const createAuthors = async (authors: string[]): Promise<AuthorEntity[]> => {
    const ents: AuthorEntity[] = [],
        repo = getRepository(AuthorEntity);

    await Promise.all(authors.map(async (author) => {
        const same = await repo.findOne({ name: author });
        if (same === undefined) {
            const ent = new AuthorEntity();
            ent.name = author;
            ents.push(ent);
        } else {
            ents.push(same);
        }
    }));

    return Promise.resolve(ents);
};

export const addPiece = async (piece: Piece): Promise<number> => {
    const newPiece = new PieceEntity();
    newPiece.name = piece.name;
    newPiece.addedOn = Date.now();
    newPiece.notificationsInterval = piece.notifsInterval;
    newPiece.notificationsOn = piece.notifsOn;
    newPiece.isFavourite = piece.isFavourite;
    newPiece.imageUri = piece.imageUri !== undefined ? piece.imageUri : '';
    newPiece.tags = await createTags(piece.tags);
    newPiece.authors = await createAuthors(piece.authors);

    const pieceRepository = getRepository(PieceEntity);
    await pieceRepository.save(newPiece);

    return Promise.resolve(newPiece.id);
};

export const getPieceById = async (id: number): Promise<Piece | undefined> => {
    const repos = getRepository(PieceEntity);
    const ent = await repos.findOne(id, { relations: ['authors', 'tags', 'notes'] });

    if (ent === undefined) {
        return Promise.resolve(undefined);
    }

    return Promise.resolve(pieceFromEntity(ent));
};

export const updatePiece = async (piece: Piece): Promise<void> => {
    const repo = await getRepository(PieceEntity);
    const pieceUpd = await repo.createQueryBuilder("piece")
        .where("piece.id = :id", { id: piece.id })
        .getOne();

    if (pieceUpd === undefined) {
        return await Promise.reject('piece not found');
    }

    pieceUpd.name = piece.name;
    pieceUpd.imageUri = piece.imageUri !== undefined ? piece.imageUri : '';
    pieceUpd.tags = await createTags(piece.tags);
    pieceUpd.authors = await createAuthors(piece.authors);

    await repo.save(pieceUpd);
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
    notifsOn: ent.notificationsOn,
    notifsInterval: ent.notificationsInterval,
    notes: [],
    recordings: [],
    originalUri: ent.originalUri,
});
