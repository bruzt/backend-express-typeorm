import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';
import ProjectModel from '../../models/ProjectModel';

interface ISerializedUsers 
    extends Omit<UserModel, 'save'|'hasId'|'remove'|'softRemove'|'recover'|'reload'|'checkPassword'>  
{
    projects: ProjectModel[]
}

export default async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        
        const user = await UserModel.findOne(id, {
            relations: ['address', 'phones', 'usersProjects']
        });

        if(!user) return res.status(400).json({ message: 'User not found' });

        const projects = user.usersProjects.map( (userProject) => userProject.project);

        const serializedUsers: ISerializedUsers = { ...user, projects: [] };

        delete serializedUsers.usersProjects;
        
        serializedUsers.projects = projects;
    
        return res.json(serializedUsers);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error listing users'});
    }
}