import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import ProjectModel from '../../../models/ProjectModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Project Controller List test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an array of projects', async () => {

        const project1 = ProjectModel.create({
            title: 'titulo proj',
            description: 'desc proj'
        });
        await project1.save();

        const project2 = ProjectModel.create({
            title: 'titulo proj2',
            description: 'desc proj2'
        });
        await project2.save();
        
        const response = await supertest(app).get('/projects');
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});
