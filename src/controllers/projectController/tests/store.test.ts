import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import ProjectModel from '../../../models/ProjectModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Project Controller Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store a project', async () => {
        
        const response = await supertest(app).post('/projects')
            .send({
                title: 'novo projeto',
                description: 'descrição do novo projeto',
                status: 'testing'
            })
        ;
        
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('novo projeto');
    });
});
