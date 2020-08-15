import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async (req: Request, res: Response) => {

    try {
        
        const users = await UserModel.find();
    
        return res.json(users);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error listing users'});
    }
}