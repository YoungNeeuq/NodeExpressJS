const Course = require('../models/Course');
const { mongooseToObject } = require('../util/mongoose');
const { mongoosesToObject } = require('../util/mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { body, validationResult } = require('express-validator');
class CoursesController {
    constructor() {
        Course.paginate = mongoosePaginate.paginate;
    }

    // GET /
    async index(req, res, next) {
        try {
            const { page = 1, limit = 5 } = req.query;

            const result = await Course.paginate({}, { page, limit });
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
    // [GET] /create
    create(req, res, next) {
        res.json({
            message: 'Rendering JSON for create route',
        });
    }

    // [POST] /
    storeValidationRules() {
        return [
            body('name').notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
            body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string'),
            body('image').notEmpty().withMessage('Image is required').isString().withMessage('Image must be a string'),
        ];
    }
    store(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Sai roi nha" });
        } else {

        const newCourse = new Course(req.body);

        newCourse
            .save()
            .then(course => res.json({ course }))
            .catch(error => next(error));
        }
    }

    // [GET] /:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.json({
                    course: mongooseToObject(course),
                });
            })
            .catch(error => next(error));
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course =>
                res.json({
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id },req.body)
            .then(() => res.json({ message: 'Course updated successfully' }))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: 'Course deleted successfully' }))
            .catch(next);
    }
}
module.exports = new CoursesController();
