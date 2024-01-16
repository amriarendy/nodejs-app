const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // res.send('Hello World');
    // res.json({
    //     nama: 'Amria Rendy',
    //     github: 'https://github.com/amriarendy',
    //     linkedin: 'https://id.linkedin.com/in/amriarendy',
    //     instagram: 'https://instagram.com/amriarendy90',
    // })
    res.sendFile('./index.html', {root:__dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('./about.html', {root:__dirname});
});

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html', {root:__dirname});
});

// app.get('/product/:id/category/:idCat', (req, res) => {
//     res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.params.idCat}`);
// });
// http://localhost:3000/product/1/category/1

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
});
// http://localhost:3000/product/1?category=shose

app.use('/', (req, res) => {
    // res.status(404);
    // res.send('<h1>404 Page Not Found</h1>');
    res.sendFile('./404.html', {root:__dirname});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});