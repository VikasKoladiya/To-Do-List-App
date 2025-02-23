import express from 'express';
import { createClientsController, deleteClientController, getClientsController, searchClientsController, updateClientController } from '../controllers/clientController.js';


const router = express.Router();

router.get('/clients',getClientsController);
router.post('/clients',createClientsController);
router.put('/clients/:id',updateClientController);
router.delete('/clients/:id',deleteClientController);
router.get('/clients/search',searchClientsController);

export default router;