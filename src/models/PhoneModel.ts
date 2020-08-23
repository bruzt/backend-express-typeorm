import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import UserModel from './UserModel';

@Entity('phones')
export default class PhoneModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    phone!: string;    

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    ////////////////////////////////

    @ManyToOne(() => UserModel, user => user.phones)
    @JoinColumn()
    user!: UserModel;    
}