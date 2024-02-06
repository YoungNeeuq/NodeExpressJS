import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CourseModel from '../models/Course';
import { mongooseToObject, mongoosesToObject } from '../util/mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

class CoursesController {
    constructor() {
        CourseModel.paginate = mongoosePaginate.paginate;
    }

    async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { page = 1, limit = 5 } = req.query;

            const result = await CourseModel.paginate({}, { page, limit });
            res.json({
                courses: mongoosesToObject(result.docs),
                pageInfo: {
                    totalItems: result.totalDocs,
                    totalPages: result.totalPages,
                    currentPage: result.page
                },
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    create(req: Request, res: Response, next: NextFunction): void {
        res.json({
            message: 'Rendering JSON for create route',
        });
    }

    async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            isNonNumericAndNotEmpty(req.body.name, 'Name');
            isNonNumericAndNotEmpty(req.body.description, 'Description');
            isNonNumericAndNotEmpty(req.body.image, 'Image');

            const newCourse = new CourseModel(req.body);
            //@ts-ignore
            const course = await newCourse.save();
            res.json({ course });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async show(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const course = await CourseModel.findOne({ slug: req.params.slug });
            res.json({
                course: mongooseToObject(course),
            });
        } catch (error) {
            next(error);
        }
    }

    async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const course = await CourseModel.findById(req.params.id);
            res.json({
                course: mongooseToObject(course),
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            isNonNumericAndNotEmpty(req.body.name, 'Name');
            isNonNumericAndNotEmpty(req.body.description, 'Description');
            isNonNumericAndNotEmpty(req.body.image, 'Image');

            await CourseModel.updateOne({ _id: req.params.id }, req.body);
            res.json({ message: 'Course updated successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await CourseModel.deleteOne({ _id: req.params.id });
            res.json({ message: 'Course deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

function isNonNumericAndNotEmpty(value: string, field: string): boolean {
    if (field === 'Name') {
        if (value === '' || /\d/.test(value)) {
            throw new Error(`${field} cannot be empty and cannot contain numeric characters`);
        }
    } else {
        if (value === '') {
            throw new Error(`${field} cannot be empty`);
        }
    }

    return true;
}

export default new CoursesController();
