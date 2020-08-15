import { Request, Response } from 'express';

import ProjectModel from '../../models/ProjectModel';
import UserModel from '../../models/UserModel';

interface ISerializedProject 
    extends Omit<ProjectModel, 'save'|'hasId'|'remove'|'softRemove'|'recover'|'reload'>  
{
    users: UserModel[]
}

export default async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const project = await ProjectModel.findOne(id, { 
            relations: ['usersProjects']
        });

        if(!project) return res.status(400).json({ message: 'Project not found' });

        const users =  project.usersProjects.map( (userProject) => userProject.user);

        const serializedProject: ISerializedProject = { ...project, users: [] };
        
        delete serializedProject.usersProjects;
        
        serializedProject.users = users;

        return res.json(serializedProject);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error searching projects' });
    }
}
