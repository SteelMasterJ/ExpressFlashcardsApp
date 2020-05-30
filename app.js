const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use('/static', express.static('public'));
app.use('/static', express.static('img'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes/index');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);;

// app.use((req, res, next) => {
//     console.log('Hello');
//     const err = new Error('Oh boy');
//     err.status = 500;
//     next(err);
// });

// app.use((req, res, next) => {
//     console.log('world!');
//     next();
// });

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err)
});

app.listen(3000, () => {
    console.log('the application is running on localhost:3000')
});