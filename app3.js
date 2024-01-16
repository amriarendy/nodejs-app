const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// menggunakan ejs
app.set('view engine', 'ejs');
// menggunakan express-ejs-layouts dan masukan attribute layout: 'dir/file'
app.use(expressLayouts);

//Third-party Route
app.use(morgan('dev'));

// Built-in middleware
app.use(express.static('public'));

// Application level middleware
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

app.use((req, res, next) => {
    console.log('Ini Middleware Ke-2');
    next();
});

app.use((req, res, next) => {
    console.log('Ini Middleware Ke-3');
    next();
});

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Amria Rendy',
            email: 'madarauchiha@ejs.co',
        },
        {
            nama: 'John',
            email: 'joni@ejs.co',
        },
        {
            nama: 'Tomcat',
            email: 'tomcat@ejs.co',
        }
    ]
    res.render('index', { 
        layout: 'layouts/main',
        name: 'amriarendy', 
        title: 'Halaman Home', 
        mahasiswa});
});

app.get('/about', (req, res) => {
    res.render('about', { 
        layout: 'layouts/main',
        title: 'Halaman About',
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main',
        title: 'Halaman Contact'
    });
});

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
});

app.use('/', (req, res) => {
    res.render('404', {
        layout: 'layouts/main',
        title: '404 Page Not Found'
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});