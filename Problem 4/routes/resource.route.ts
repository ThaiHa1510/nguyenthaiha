import express, { Router } from 'express';
import { createResource, getResources, getResource, updateResource, deleteResource } from '../controllers/resource.controller';

const router: Router = express.Router();

router.post('/', createResource);
router.get('/', getResources);
router.get('/:id', getResource);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

export default router;