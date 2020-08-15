import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const {
        name,
        email,
        password
    } = req.body;

    try {
        
        const user = await UserModel.findOne({ id });

        if(!user) return res.json({ message: 'User not found' });

        if(name) user.name = name;
        if(email) user.email = email;
        if(password) user.password = password;

        await user.save();
    
        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error listing users'});
    }
}