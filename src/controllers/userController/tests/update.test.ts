import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('User Controller Update test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should update a user', async () => {

        const user = UserModel.create({
            name: 'aaa',
            email: 'gg@hh.com',
            password: '789654'
        });
        await user.save();
        
        const response = await supertest(app).put(`/users/${user.id}`)
            .send({
                name: 'maria da silva',
                email: 'ms@goo.com',
                password: '852222'
            })
        ;
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(user.id);
        expect(response.body.name).toBe('maria da silva');
        expect(response.body.email).toBe('ms@goo.com');
        expect(response.body.email).not.toHaveProperty('password');
    });

    it('should return code 400 for "User not found"', async () => {
        
        const response = await supertest(app).put(`/users/1`)
            .send({
                name: 'maria da silva',
                email: 'ms@goo.com',
                password: '852222'
            })
        ;
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User not found');
    });
});
