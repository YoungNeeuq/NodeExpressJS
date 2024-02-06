import express, { Request, Response, NextFunction } from 'express';
import coursesRouter from './courses';

function router(app: express.Application): void {
    app.get('/', (req: Request, res: Response) => {
        res.render('home');
    });

    app.use('/courses', coursesRouter);

    app.get('/search', (req: Request, res: Response) => {
        res.render('search');
      });

    app.post('/search', function (req: Request, res: Response) {
        const formData = req.body;
        console.log(formData);
        res.send(formData);
      });
}

export default router;
