import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async function show(req: Request, res: Response){

    const id = Number(req.params.id);

    try {
        
        const user = await UserModel.findOne({ id }, {
            relations: ['address', 'phones', 'usersProjects', 'usersProjects.project']
        });

        if(!user) return res.status(400).json({ message: 'User not found' });

        delete user.password;
        delete user.tempPassword;
    
        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error searching for users'});
    }
}