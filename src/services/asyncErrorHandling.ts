import { NextFunction, Request, Response } from "express";

const asyncErrorHandling = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      return res.status(500).json({
        message: err.message,
        fullError: err,
      });
    });
  };
};

export default asyncErrorHandling;
