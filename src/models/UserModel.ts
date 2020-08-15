import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, OneToMany, 
    BeforeInsert, 
    BeforeUpdate, 
    AfterLoad, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToOne,
    DeleteDateColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';

import AddressModel from './AddressModel';
import PhoneModel from './PhoneModel';
import UsersProjectsModel from './UsersProjectsModel';

@Entity('users')
export default class UserModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;    

    @Column()
    email!: string;

    @Column({ select: false })
    password!: string;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
    
    private tempPassword?: string;

    ////////////////////////////////////
    
    @AfterLoad()
    private loadPassword(){
        this.tempPassword = this.password;
    }
    
    @BeforeInsert()
    @BeforeUpdate()
    private async hashPassword(){
        if(this.tempPassword !== this.password){
            this.password = await bcrypt.hash(this.password, 8);
        }
    }
    
    checkPassword(password: string){
        return bcrypt.compare(password, this.password);
    }    

    ///////////////////////////////////////

    @OneToOne(() => AddressModel, address => address.user)
    address?: AddressModel;

    @OneToMany(() => PhoneModel, phone => phone.user)
    phones?: PhoneModel[];
    
    @OneToMany(() => UsersProjectsModel, usersProjects => usersProjects.user)
    usersProjects!: UsersProjectsModel[];
}
