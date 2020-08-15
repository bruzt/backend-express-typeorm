import { Request, Response } from 'express';

import PhoneModel from '../../models/PhoneModel';

export default async (req: Request, res: Response) => {

    const {
        phone,
    } = req.body;

    const userId = req.params.userId as any;

    try {
        
        const addedPhone = PhoneModel.create({
            phone,
            user: userId
        });

        const newPhone = await addedPhone.save();
        
        return res.json(newPhone);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error trying add a phone' });
    }
}