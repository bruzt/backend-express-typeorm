import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        
        const user = await UserModel.findOne(id, {
            relations: ['address', 'phones', 'usersProjects']
        });

        if(!user) return res.status(400).json({ message: 'User not found' });

        user.usersProjects.forEach( (userProject) => delete userProject.user);
    
        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error searching for users'});
    }
}