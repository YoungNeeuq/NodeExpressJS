const path = require('path')
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const methodOverride = require('method-override');
const port = 3000
const router = require('./routers')
const db = require('./config/db')

//Connect DB
db.connect()


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
//template engine
app.engine('handlebars', handlebars.engine());
app.set('view engine','handlebars')

app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'))


router(app)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});