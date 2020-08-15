import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

export default async (req: Request, res: Response) => {

    const {
        name,
        email,
        password
    } = req.body;

    try {

        let user = await UserModel.findOne({ email });
        
        if(user) return res.status(400).json({ message: 'E-mail already in use' });
        
        user = UserModel.create({
            name,
            email,
            password
        });

        const newUser = await user.save();

        delete newUser.password;
        
        return res.json(newUser);

    } catch (error) {      
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error trying add an user' });
    }
}