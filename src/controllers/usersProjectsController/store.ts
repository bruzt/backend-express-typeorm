import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';
import ProjectModel from '../../models/ProjectModel';
import UsersProjectsModel from '../../models/UsersProjectsModel';

interface IParams {
    userId: number;
    projectId: number;
}

export default async function store(req: Request, res: Response){

    const {
        userId,
        projectId
    }: IParams = req.params as any;

    try {

        const user = await UserModel.findOne({ id: userId });
        
        if(!user) return res.status(400).json({ message: 'User not found' });
        
        const project = await ProjectModel.findOne({ id: projectId });
        
        if(!project) return res.status(400).json({ message: 'Project not found' });

        const userProject = await UsersProjectsModel.findOne({
            user,
            project 
        },{
            relations: ['user', 'project'],
            withDeleted: true
        });
        
        if(userProject){

            if(userProject.deletedAt !== null) {

                await userProject.recover();

                userProject.deletedAt = null;

                return res.json(userProject);

            } else {

                return res.status(400).json({ message: 'User already assign to this project' });
            }
        }
        
        const usersProjects = UsersProjectsModel.create({
            user,
            project
        });

        const newAssign = await usersProjects.save();
        
        delete newAssign.user.password;

        return res.json(newAssign);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error assign an project to an user' });
    }
}
