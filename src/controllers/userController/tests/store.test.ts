import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('User Controller Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store a user', async () => {
        
        const response = await supertest(app).post('/users')
            .send({
                name: 'joão da silva',
                email: 'js@email.com',
                password: '753222'
            })
        ;
   
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('joão da silva');
    });

    it('should return code 400 for "E-mail already in use"', async () => {

        const user = UserModel.create({
            name: 'joão silva',
            email: 'js@email.com',
            password: '741258'
        });
        await user.save();
        
        const response = await supertest(app).post('/users')
            .send({
                name: 'joão da silva',
                email: 'js@email.com',
                password: '753222'
            })
        ;
   
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('E-mail already in use');
    });
});
