import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne, 
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import UserModel from './UserModel';

@Entity('address')
export default class PhoneModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    street!: string;    

    @Column()
    number?: string; 
    
    @Column()
    neighborhood!: string;    

    @Column()
    city!: string;    

    @Column()
    uf!: string;    

    @Column()
    zipcode!: string;    

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    ////////////////////////////////////

    @OneToOne(() => UserModel, user => user.address)
    @JoinColumn()
    user!: UserModel;
}