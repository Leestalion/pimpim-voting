import { NextFunction, Request, Response } from "express";
import { tripService } from "../services";
import { tripValidator } from "../validators";
import { ValidationError } from "../errors";

export const getTripById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await tripService.getTripById(req.params.id);
    res.json(trip);
  } catch (err) {
    next(err);
  }
};

export const getAllTrips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const trips = await tripService.getAllTrips();
    res.json(trips);
  } catch (err) {
    next(err);
  }
};

export const createTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tripData = req.body;
    const { error, value } = tripValidator.validateCreateTrip(tripData);

    if (error) {
      return next(new ValidationError(error.message));
    }
    const createdTrip = await tripService.createTrip(value);
    res.status(201).json(createdTrip);
  } catch (err) {
		console.log("haha");
    next(err);
  }
};

export const editTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
		const tripData = req.body;
    const { error, value } = tripValidator.validateEditTrip(tripData);
    if (error) {
      return next(new ValidationError(error.message));
    }
    await tripService.editTrip(value);
    res.status(200).send("Trip updated");
  } catch (err) {
    next(err);
  }
};

export const deleteTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const getCurrentDayByTripId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentDay = await tripService.calculateCurrentDay(req.params.tripId);
    res.json(currentDay);
  } catch (err) {
    next(err);
  }
};
