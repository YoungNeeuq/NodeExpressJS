import express from 'express';
import coursesController from '../app/controllers/CoursesController';

const router = express.Router();

router.get('/', coursesController.index);
router.post('/', coursesController.store);
// router.get('/:id', coursesController.edit);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.destroy);
router.get('/:slug', coursesController.show);

export default router;
