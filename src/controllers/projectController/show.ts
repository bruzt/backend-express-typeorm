import { Request, Response } from 'express';

import ProjectModel from '../../models/ProjectModel';

export default async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const project = await ProjectModel.findOne(id, { 
            relations: ['usersProjects']
        });

        if(!project) return res.status(400).json({ message: 'Project not found' });

        project.usersProjects.forEach( (userProject) => delete userProject.project);

        return res.json(project);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error searching for projects' });
    }
}
