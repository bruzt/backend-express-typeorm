import db from '../database/connection';

interface IEntitiesList {
    tableName: string;
}

async function getEntities() {

    const entities: { tableName: string; }[] = [];

    (await db).entityMetadatas.forEach(entity => entities.push({ tableName: entity.tableName }));

    return entities;
}


async function cleanAll(entities: IEntitiesList[]) {

    try {

        for (const entity of entities) {

            await (await db).query(`TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE ;`);
        }

    } catch (error) {
        throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
}

export default async function truncateDBTables() {

    const entities = await getEntities();
    await cleanAll(entities);
}
