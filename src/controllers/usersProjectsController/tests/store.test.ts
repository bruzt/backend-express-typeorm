import supertest from 'supertest';

import connection from '../../../database/connection';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import ProjectModel from '../../../models/ProjectModel';
import UsersProjectsModel from '../../../models/UsersProjectsModel';
import truncateDBTables from '../../../testUtils/truncateDBTables';

describe('UsersProject Controller Store test suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {

        return truncateDBTables();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should assign project to user', async () => {

        const user = UserModel.create({
            name: 'aaa',
            email: 'gg@hh.com',
            password: '789654'
        });
        await user.save();

        const project = ProjectModel.create({
            title: 'titulo test',
            description: 'desc test'
        });
        await project.save();
        
        const response = await supertest(app).post(`/users/${user.id}/projects/${project.id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.user.id).toBe(user.id);
        expect(response.body.project.id).toBe(project.id);
    });

    it('should return code 400 for "User not found"', async () => {

        const project = ProjectModel.create({
            title: 'titulo test',
            description: 'desc test'
        });
        await project.save();
        
        const response = await supertest(app).post(`/users/1/projects/${project.id}`);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User not found');
    });

    it('should return code 400 for "Project not found"', async () => {

        const user = UserModel.create({
            name: 'aaa',
            email: 'gg@hh.com',
            password: '789654'
        });
        await user.save();
        
        const response = await supertest(app).post(`/users/${user.id}/projects/1`);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Project not found');
    });

    it('should recover previous assign of userProject', async () => {

        const user = UserModel.create({
            name: 'aaa',
            email: 'gg@hh.com',
            password: '789654'
        });
        await user.save();

        const project = ProjectModel.create({
            title: 'titulo test',
            description: 'desc test'
        });
        await project.save();

        const userProject = UsersProjectsModel.create({
            user,
            project
        });
        await userProject.save();
        await userProject.softRemove();

        const response = await supertest(app).post(`/users/${user.id}/projects/${project.id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(userProject.id);
        expect(response.body.deletedAt).toBe(null);
        expect(response.body.user.id).toBe(user.id);
        expect(response.body.project.id).toBe(project.id);
    });

    it('should return code 400 for "User already assign to this project"', async () => {

        const user = UserModel.create({
            name: 'aaa',
            email: 'gg@hh.com',
            password: '789654'
        });
        await user.save();

        const project = ProjectModel.create({
            title: 'titulo test',
            description: 'desc test'
        });
        await project.save();

        const userProject = UsersProjectsModel.create({
            user,
            project
        });
        await userProject.save();

        const response = await supertest(app).post(`/users/${user.id}/projects/${project.id}`);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User already assign to this project");
    });

});
