import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Phone Controller Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store a phone', async () => {

        const user = UserModel.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const response = await supertest(app).post(`/users/${user.id}/phones`)
            .send({
                phone: '19874524563',
            })
        ;
        
        expect(response.status).toBe(200);
        expect(response.body.phone).toBe('19874524563');
    });

    it('should return code 400 for "User not found"', async () => {

        const response = await supertest(app).post(`/users/1/phones`)
            .send({
                phone: '19874524563',
            })
        ;
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User not found");
    });
});
