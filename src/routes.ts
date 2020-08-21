import { Router } from 'express';

import userController from './controllers/userController';
import addressController from './controllers/addressController'
import phoneController from './controllers/phoneController';
import projectController from './controllers/projectController';
import usersProjectsController from './controllers/usersProjectsController';

import addressControllerValidator from './validators/addressControllerValidator';
import phoneControllerValidator from './validators/phoneControllerValidator';
import projectControllerValidator from './validators/projectControllerValidator';

const router = Router();

router.get('/', (req, res) => {

    return res.sendStatus(201);
});

router.get('/users', userController.list);
router.get('/users/:id', userController.show);
router.post('/users', userController.store);
router.put('/users/:id', userController.update);

router.get('/address', addressController.list);
router.post('/users/:userId/address', addressControllerValidator.store, addressController.store);

router.get('/phones', phoneController.list);
router.post('/users/:userId/phones', phoneControllerValidator.store, phoneController.store);

router.get('/projects', projectController.list);
router.get('/projects/:id', projectControllerValidator.show,projectController.show);
router.post('/projects', projectControllerValidator.store, projectController.store);

router.post('/users/:userId/projects/:projectId', usersProjectsController.store);

export default router;
