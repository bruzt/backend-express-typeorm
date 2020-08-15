import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

import UserModel from './UserModel';
import ProjectModel from './ProjectModel';

@Entity('users_projects')
export default class UsersProjectsModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    ///////////////////////////////

    @ManyToOne(() => UserModel, user => user.usersProjects, { eager: true })
    user!: UserModel;

    @ManyToOne(() => ProjectModel, project => project.usersProjects, { eager: true })
    project!: ProjectModel;
}
