import { Request, Response } from 'express';

import AddressModel from '../../models/AddressModel';
import UserModel from '../../models/UserModel';

interface IStoreAddress {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    zipcode: string;
}

export default async function store(req: Request, res: Response){

    const {
        street,
        number,
        neighborhood,
        city,
        uf,
        zipcode,
    }: IStoreAddress = req.body;

    const userId: number = req.params.userId as any;

    try {

        const user = await UserModel.findOne({ id: userId }, {
            relations: ['address']
        });
    
        if(!user) return res.status(400).json({ message: 'User not found' });
        if(user.address && Object.keys(user.address).length > 0){
    
            const oldAddress = await AddressModel.findOne({ id: user.address.id });
    
            if(oldAddress) await oldAddress.remove();
        }

        const address = AddressModel.create({
            street,
            number,
            neighborhood,
            city,
            uf,
            zipcode,
            user
        });

        const newAddress = await address.save();

        delete newAddress.user;

        return res.json(newAddress);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unexpected error adding an address' });
    }
}