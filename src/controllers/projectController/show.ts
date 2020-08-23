import { Request, Response } from 'express';

import ProjectModel from '../../models/ProjectModel';

export default async function show(req: Request, res: Response){

    const id = Number(req.params.id);

    try {

        const project = await ProjectModel.findOne({ id }, { 
            relations: ['usersProjects', 'usersProjects.user']
        });

        if(!project) return res.status(400).json({ message: 'Project not found' });

        if(project.usersProjects && project.usersProjects.length > 0){

            project.usersProjects.forEach( (userProject) => {
                delete userProject.user.password;
                //delete userProject.user.tempPassword;
            });
        }

        return res.json(project);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error searching for projects' });
    }
}
