import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Address Controller Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should store a address', async () => {

        const user = UserModel.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });

        await user.save();

        const response = await supertest(app).post(`/users/${user.id}/address`)
            .send({
                street: 'rua bla',
                number: '10',
                neighborhood: 'bairro foo',
                city: 'blabla',
                uf: 'sp',
                zipcode: '874589663'
            });
        
        expect(response.status).toBe(200);
        expect(response.body.street).toBe('rua bla');
    });

    it('should return code 400 for "User not found"', async () => {

        const response = await supertest(app).post(`/users/1/address`)
            .send({
                street: 'rua bla',
                number: '10',
                neighborhood: 'bairro foo',
                city: 'blabla',
                uf: 'sp',
                zipcode: '874589663'
            });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User not found');
    });

    it('should store a address removing the old one', async () => {

        const user = UserModel.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const address = AddressModel.create({
            street: 'rua bla',
            number: '10',
            neighborhood: 'bairro foo',
            city: 'blabla',
            uf: 'sp',
            zipcode: '874589663',
            user
        });
        await address.save();

        const response = await supertest(app).post(`/users/${user.id}/address`)
            .send({
                street: 'rua boo',
                number: '22',
                neighborhood: 'bairro bla',
                city: 'jaja',
                uf: 'rj',
                zipcode: '365412556'
            });
        
        expect(response.status).toBe(200);
        expect(response.body.street).toBe('rua boo');
    });
});
