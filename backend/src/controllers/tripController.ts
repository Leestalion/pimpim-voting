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
        const createdTrip = await tripService.createTrip(req.body);
        res.status(201).json(createdTrip);
    } catch (err) {
        next(err);
    }
};

export const editTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await tripService.editTrip(req.body);
        res.status(200).send("Trip updated");
    } catch (err) {
        next(err);
    }
};

export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trip = req.body.trip;
        const securityCode = req.body.securityCode;

        await tripService.checkSecurityCode(trip.id, securityCode);

        await tripService.deleteTrip(req.body.trip);

        res.status(200).send("Trip deleted");
    } catch (err) {
        next(err);
    }
};