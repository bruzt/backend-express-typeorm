import { Request, Response } from 'express';
import ProjectModel from '../../models/ProjectModel';

export default async (req: Request, res: Response) => {

    try {

        const projects = await ProjectModel.find();

        return res.json(projects);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error searching projects' });
    }
}
