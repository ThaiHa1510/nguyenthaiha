import { Request, Response } from 'express';
import Resource from '../models/resource.model';
import { RESOURCE_MESSAGES } from '../utils/constants';
import { authenticate } from '../middlewares/auth.middleware';
/**
 * Creates a new resource from the given request body.
 * If the resource is successfully created, a 201 status code is returned with the created resource object.
 * If the resource is not created successfully, a 400 status code is returned with a create failed message.
 * 
 * @param req - Express request object containing the resource data in the request body.
 * @param res - Express response object used to send the HTTP response.
 */
export const createResource = async (req: Request, res: Response) => {
  authenticate(req, res, async () => {
    const resource = new Resource(req.body);
    try {
      await resource.save();
      res.status(201).json(resource);
    } catch (err) {
      res.status(400).json({ message: RESOURCE_MESSAGES.CREATE_FAILED });
    }
  });
};

export const getResources = async (req: Request, res: Response) => {
  const resources = await Resource.find().exec();
  res.json(resources);
};

/**
 * Retrieves a resource by its ID.
 * If the resource is found, it responds with the resource object.
 * If the resource is not found, a 404 error is returned with a not found message.
 * 
 * @param req - Express request object containing the resource ID in the URL parameters.
 * @param res - Express response object used to send the HTTP response.
 */

export const getResource = async (req: Request, res: Response) => {
  authenticate(req, res, async () => {
    const id = req.params.id;
    const resource = await Resource.findById(id).exec();
    if (!resource) {
      res.status(404).json({ message: RESOURCE_MESSAGES.NOT_FOUND });
    } else {
      res.json(resource);
    }
  });
};

/**
 * Updates a resource by ID and returns the updated resource.
 * If the resource is not found, a 404 error is returned.
 * @param req Express request object
 * @param res Express response object
 * @returns The updated resource or a 404 error
 */
export const updateResource = async (req: Request, res: Response) => {
  authenticate(req, res, async () => {
    const id = req.params.id;
    const resource = await Resource.findByIdAndUpdate(id, req.body, { new: true }).exec();
    if (!resource) {
      res.status(404).json({ message: RESOURCE_MESSAGES.NOT_FOUND });
    } else {
      res.json(resource);
    }
  });
};

/**
 * Deletes a resource by its ID.
 * If the resource is found and successfully deleted, responds with a 204 status code and a deletion message.
 * If the resource is not found, it silently completes with a 204 status code.
 * 
 * @param req - Express request object containing the resource ID in the URL parameters.
 * @param res - Express response object used to send the HTTP response.
 */

export const deleteResource = async (req: Request, res: Response) => {
  authenticate(req, res, async () => {
    const id = req.params.id;
    await Resource.findByIdAndDelete(id).exec();
    res.status(204).json({ message: RESOURCE_MESSAGES.DELETED });
  });
};