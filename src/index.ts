import path from 'path';
import express from 'express';
import handlebars from 'express-handlebars';
import methodOverride from 'method-override';
import router from './routers';
import dotenv from 'dotenv';
import { createJWT } from './middleware/JWTAction';
// import connectDB from '../connectMongo'; // Assuming this line is commented out as it is in the original code

connectDB();


createJWT();

const app: express.Application = express();
dotenv.config();

const PORT: string | number = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// template engine
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));
console.log(path.join(__dirname, 'resources/views'));

app.use(methodOverride('_method'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

router(app);
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
