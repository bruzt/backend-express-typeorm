import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import ProjectModel from '../../../models/ProjectModel';
import UserModel from '../../../models/UserModel';
import UsersProjectsModel from '../../../models/UsersProjectsModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('Project Controller Show test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should return an specific project', async () => {

        const project = ProjectModel.create({
            title: 'titulo proj',
            description: 'desc proj'
        });
        await project.save();
        
        const response = await supertest(app).get(`/projects/${project.id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('titulo proj');
    });

    it('should return code 400 for "Project not found"', async () => {
        
        const response = await supertest(app).get(`/projects/1`);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Project not found");
    });

    it('should delete user password when assign to an user', async () => {

        const user = UserModel.create({
            name: 'josé',
            email: 'jose@aaa.com',
            password: '123654'
        });
        await user.save();

        const project = ProjectModel.create({
            title: 'titulo proj',
            description: 'desc proj'
        });
        await project.save();

        const userProject = UsersProjectsModel.create({
            user,
            project
        });
        await userProject.save();
        
        const response = await supertest(app).get(`/projects/${project.id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.usersProjects[0].user.name).toBe('josé');
        expect(response.body.usersProjects[0].user).not.toHaveProperty("password");
    });
});
