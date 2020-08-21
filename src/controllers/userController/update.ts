import { Request, Response } from 'express';

import UserModel from '../../models/UserModel';

interface IUpdateUser {
    name?: string;
    email?: string;
    password?: string;
}

export default async function update(req: Request, res: Response){

    const id = Number(req.params.id);

    const {
        name,
        email,
        password
    }: IUpdateUser = req.body;

    try {
        
        const user = await UserModel.findOne({ id });

        if(!user) return res.json({ message: 'User not found' });

        if(name) user.name = name;
        if(email) user.email = email;
        if(password) user.password = password;

        await user.save();

        delete user.password;
        delete user.tempPassword;
        
        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error listing users'});
    }
}