import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('User Controller Show test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return a specific of user', async () => {

        const user = UserModel.create({
            name: 'aaa',
            email: 'gg@hh.com',
            password: '789654'
        });
        await user.save();
        
        const response = await supertest(app).get(`/users/${user.id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(user.id);
        expect(response.body.name).toBe('aaa');
    });

    it('should return code 400 for "User not found"', async () => {
        
        const response = await supertest(app).get(`/users/1`);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User not found');
    });
});
