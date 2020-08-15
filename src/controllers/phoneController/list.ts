import { Request, Response } from 'express';

import PhoneModel from '../../models/PhoneModel';

export default async function list(req: Request, res: Response){

    try {
        
        const phones = await PhoneModel.find();
    
        return res.json(phones);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error listing phones'});
    }
}