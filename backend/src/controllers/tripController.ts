import { NextFunction, Request, Response } from "express";
import { tripService } from "../services";

export const getTripById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trip = await tripService.getTripById(req.params.id);
        res.json(trip);
    } catch (err) {
        next(err);
    }
};

export const getAllTrips = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trips = await tripService.getAllTrips();
        res.json(trips);
    } catch (err) {
        next(err);
    }
};

export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await tripService.createTrip(req.body);
        res.status(201).send("Trip created");
    } catch (err) {
        next(err);
    }
};