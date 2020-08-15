import { Request, Response } from 'express';

import AddressModel from '../../models/AddressModel';

export default async function list(req: Request, res: Response){

    try {

        const addresses = await AddressModel.find();

        return res.json(addresses);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpeceted error searching addresses' });
    }
}