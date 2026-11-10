import type { Request, Response, NextFunction } from "express";

const checkRequestBody = (req: Request, res: Response, next: NextFunction) => {
  if (req.body === undefined) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  next();
};

export default checkRequestBody;