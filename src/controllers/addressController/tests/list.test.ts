
import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Address Controller List test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an array of addresses', async () => {

        const user1 = UserModel.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });

        await user1.save();

        const user2 = UserModel.create({
            name: 'test 2',
            email: 'test2@test.com',
            password: '456'
        });
        await user2.save();

        const addr1 = AddressModel.create({
            street: 'aaa',
            number: 'bbb',
            neighborhood: 'ccc',
            city: 'ddd',
            uf: 'eee',
            zipcode: '111',
            user: user1
        });
        await addr1.save();

        const addr2 = AddressModel.create({
            street: 'fff',
            number: 'ggg',
            neighborhood: 'hhh',
            city: 'iii',
            uf: 'jjj',
            zipcode: '222',
            user: user2
        });
        await addr2.save();

        const response = await supertest(app).get('/address');
        
        expect(response.body.length).toBe(2);
    });
});
