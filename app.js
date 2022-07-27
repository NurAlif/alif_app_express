import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from "cors";

import usersRouter from './routes/users.js';
import favoriteMoviesRouter from './routes/movies.js'

import { fileURLToPath } from 'url';

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { swg_options } from './config/swagger.js';
import ExpressPinoLogger from 'express-pino-logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

app.use(cors());

app.use((req, res, next) => {
  res.append('Set-Cookies', 'SessionId=dummysessionid123; Max-Age=1000');
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const specs = swaggerJsdoc(swg_options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

var pino = ExpressPinoLogger({
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      user: req.user,
    }),
  },
})

app.use(pino)

app.use('/movies', favoriteMoviesRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
});

export default app;
