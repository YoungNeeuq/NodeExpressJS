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
            message: 'Rendering JSON for create route',
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
        Course.updateOne({ _id: req.params.id }, {
            id: "65b148a54f818b83dd52a4ef",
        name: "Lộ trình học Back-end",
        description: "Lập trình viên Back-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Back-end nhé.",
        image: "https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png",
        createdAt: "2024-01-24T17:28:05.576Z",
        updatedAt: "2024-01-24T17:28:05.576Z",
        slug: "lo-trinh-hoc-back-end",
        })
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
