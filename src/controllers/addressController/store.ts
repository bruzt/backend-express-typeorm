import { Request, Response } from 'express';

import AddressModel from '../../models/AddressModel';

export default async function store(req: Request, res: Response){

    const {
        street,
        number,
        neighborhood,
        city,
        uf,
        zipcode,
    } = req.body;

    const userId = req.params.userId as any;

    try {

        const address = AddressModel.create({
            street,
            number,
            neighborhood,
            city,
            uf,
            zipcode,
            user: userId
        });

        const newAddress = await address.save();

        return res.json(newAddress);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error adding an address' });
    }
}