const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/CoursesController');
router.get('/',coursesController.index)
router.post('/', coursesController.store);
// router.get('/:id', coursesController.edit);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.destroy);
router.get('/:slug', coursesController.show);

module.exports = router;