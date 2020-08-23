import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import PhoneModel from '../../../models/PhoneModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Phone Controller List test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an array of phones', async () => {

        const user = UserModel.create({
            name: 'teste 1',
            email: 'teste@teste.com',
            password: '123'
        });
        await user.save();

        const phone1 = PhoneModel.create({
            phone: '1996354321',
            user: user
        });
        await phone1.save();

        const phone2 = PhoneModel.create({
            phone: '19874541236',
            user: user
        });
        await phone2.save();

        const response = await supertest(app).get('/phones');
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});
