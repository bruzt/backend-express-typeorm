import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('User Controller List test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an array of users', async () => {

        const user1 = UserModel.create({
            name: 'aaa',
            email: 'gg@hh.com',
            password: '789654'
        });
        await user1.save();

        const user2 = UserModel.create({
            name: 'bbb',
            email: 'rr@yyy.com',
            password: '159632'
        });
        await user2.save();
        
        const response = await supertest(app).get('/users');
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});
