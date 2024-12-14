import { NextFunction, Request, Response } from "express";
import { tripService, userService } from "../services";

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const getAllUsersInTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsersInTrip(req.params.id);
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const addUserInTrip = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user;
        const securityCode: string = req.body.securityCode;

        tripService.checkSecurityCode(user.tripId, securityCode);

        await userService.addUserInTrip(user);
        res.status(201).send("User added to trip");
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        await userService.updateUser(user);
        res.status(200).send("User updated");
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user;
        const securityCode = req.body.securityCode;

        tripService.checkSecurityCode(user.tripId, securityCode);

        await userService.deleteUser(user);
        res.status(200).send("User deleted");
    } catch (err) {
        next(err);
    }
}