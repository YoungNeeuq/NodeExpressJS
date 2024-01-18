const Course = require('../models/Course');

class NewsController {
  // GET NEWS
  async index(req, res) {
    try {
      const courses = await Course.find({});
      res.json(courses);
    } catch (error) {
      res.status(400).json({ error: 'ERROR' });
    }
  }

  // GET Slug
  show(req, res) {
    res.send('news detail');
  }
}

module.exports = new NewsController();