import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if(err.name === "ValidationError") {
    res.status(err.statusCode || 400).send({ error: err.message });
  } else {
    res.status(err.statusCode || 500).send({ error: "Erreur Interne du Serveur" });
    console.error(err);
  }
};