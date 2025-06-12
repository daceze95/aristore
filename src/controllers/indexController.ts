import {Request, Response} from 'express';

export const indexController = (req:Request, res:Response) => {
    // req.log.trace("", "testing out")
    res.status(200).send('<h1><center>Welcome to Aristore</center></h1>');
}