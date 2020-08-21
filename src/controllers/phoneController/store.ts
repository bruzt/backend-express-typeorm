import { Request, Response } from 'express';

import PhoneModel from '../../models/PhoneModel';
import UserModel from '../../models/UserModel';

export default async function store(req: Request, res: Response){

    const {
        phone,
    }: { phone: string; } = req.body;

    const userId: number = req.params.userId as any;

    try {

        const user = await UserModel.findOne({ id: userId });
    
        if(!user) return res.status(400).json({ message: 'User not found' });
        
        const addedPhone = PhoneModel.create({
            phone,
            user
        });

        const newPhone = await addedPhone.save();

        delete newPhone.user;
        
        return res.json(newPhone);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error trying add a phone' });
    }
}