import { Router } from 'express';

import userController from './controllers/userController';
import addressController from './controllers/addressController'
import phoneController from './controllers/phoneController';
import projectController from './controllers/projectController';
import usersProjectsController from './controllers/usersProjectsController';

import addressControllerValidator from './validators/addressControllerValidator';
import phoneControllerValidator from './validators/phoneControllerValidator';
import projectControllerValidator from './validators/projectControllerValidator';
import userControllerValidator from './validators/userControllerValidator';
import usersProjectsControllerValidator from './validators/usersProjectsControllerValidator';

const router = Router();

router.get('/', (req, res) => {

    return res.sendStatus(201);
});

router.get('/users', userController.list);
router.get('/users/:id', userControllerValidator.show, userController.show);
router.post('/users', userControllerValidator.store, userController.store);
router.put('/users/:id', userControllerValidator.update, userController.update);

router.get('/address', addressController.list);
router.post('/users/:userId/address', addressControllerValidator.store, addressController.store);

router.get('/phones', phoneController.list);
router.post('/users/:userId/phones', phoneControllerValidator.store, phoneController.store);

router.get('/projects', projectController.list);
router.get('/projects/:id', projectControllerValidator.show,projectController.show);
router.post('/projects', projectControllerValidator.store, projectController.store);

router.post('/users/:userId/projects/:projectId', usersProjectsControllerValidator.store, usersProjectsController.store);

export default router;
