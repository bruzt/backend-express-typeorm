import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

import UserModel from './UserModel';
import ProjectModel from './ProjectModel';

@Entity('users_projects')
export default class UsersProjectsModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    ///////////////////////////////

    @ManyToOne(() => UserModel, user => user.usersProjects, { eager: true })
    user!: UserModel;

    @ManyToOne(() => ProjectModel, project => project.usersProjects, { eager: true })
    project!: ProjectModel;
}
