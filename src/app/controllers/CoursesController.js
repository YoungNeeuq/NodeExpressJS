const Course = require('../models/Course');
const { mongooseToObject } = require('../util/mongoose');
const { mongoosesToObject } = require('../util/mongoose');

class CoursesController {
    // GET /
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.json({
                    courses: mongoosesToObject(courses),
                });
            })
            .catch(error => next(error));
    }

    // [GET] /create
    create(req, res, next) {
        res.json({
            id: '1',
            name:'hau',
            description:'test',
            image:'hauimg'
        });
    }

    // [POST] /store
    store(req, res, next) {
        const newCourse = new Course(req.body);

        newCourse
            .save()
            .then(course => res.json({ course }))
            .catch(error => next(error));
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
        Course.updateOne({ _id: req.params.id }, req.body)
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