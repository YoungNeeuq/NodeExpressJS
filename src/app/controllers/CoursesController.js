const Course = require('../models/Course');
const {mongooseToObject} = require('../util/mongoose');
const {mongoosesToObject} = require('../util/mongoose');
class CoursesController {
    //GET /
    index(req,res,next){
        Course.find({})
        .then(courses =>{
          res.render('courses', {
            courses: mongoosesToObject(courses),
        });
        })
      }
      
    // [GET] /create
      create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /store
    store(req, res, next) {
        // insert a course into document in DB
        const newCourse = new Course(req.body);

        newCourse
            .save()
            .then((course) => res.redirect('/courses'))
            .catch((error) => next(error));
    }

    // [GET] /:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then((course) => {
                res.render('courses/course', {
                    course: mongooseToObject(course),
                });
            })
            .catch((error) => next(error));
    }
    //  [GET] /courses/:id/edit
     edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/courses'))
            .catch(next);
    }
    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new CoursesController();