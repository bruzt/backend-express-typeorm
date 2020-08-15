import { Request, Response } from 'express';

import ProjectModel from '../../models/ProjectModel';

export default async function store(req: Request, res: Response){

    const {
        title,
        description
    } = req.body;

    try {

        const project = ProjectModel.create({
            title,
            description
        });

        const newProject = await project.save();

        return res.json(newProject);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error adding an project' });
    }
}
