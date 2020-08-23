import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
} from 'typeorm';

import UserModel from './UserModel';
import ProjectModel from './ProjectModel';

@Entity('users_projects')
export default class UsersProjectsModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    status?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date | null;

    ///////////////////////////////

    @ManyToOne(() => UserModel, user => user.usersProjects)
    user!: UserModel;

    @ManyToOne(() => ProjectModel, project => project.usersProjects)
    project!: ProjectModel;
}
