const coursesRouter = require('./courses');
function router(app){
    app.get('/', (req, res) => {
        res.render('home')
      })
    app.use('/courses',coursesRouter);

    app.get('/search', (req, res) => {
        res.render('search')
      })

    app.post('/search', (req, res) => {
        const formData = req.body;
        console.log(formData)
        res.send(formData);
      });
}
module.exports = router;