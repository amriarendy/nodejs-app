const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 3000;

// menggunakan ejs
app.set('view engine', 'ejs');
// menggunakan express-ejs-layouts dan masukan attribute layout: 'dir/file'
app.use(expressLayouts);
// Built-in middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Konfigurasi flash
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
})
);
app.use(flash());

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
    const contacts = loadContact();
    res.render('contact', {
        layout: 'layouts/main',
        title: 'Halaman Contact',
        contacts,
        msg: req.flash('msg'),
    });
});

app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main',
        title: 'Halaman Tambah Contact',
    });
});

app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if(duplikat) {
            throw new Error('Nama kontak telah digunakan');
        }
        return true;
    }),
    body('email').isEmail(),
    check('nohp', 'No Handphone Harus +62').isMobilePhone('id-ID'),
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()});
            res.render('add-contact', {
                layout: 'layouts/main',
                title: 'Halaman Tambah Contact',
                errors: errors.array(),
            })
        } else {
            addContact(req.body);
            // Kirimkan flash message
            req.flash('msg', 'Data kontak berhasil ditambahkan');
            res.redirect('/contact');
        }
});

app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    if (!contact) {
        res.status(404);
        res.render('404', {
            layout: 'layouts/main',
            title: '404 Page Not Found'
        });
    } else {
        deleteContact(req.params.nama);
        // Kirimkan flash message
        req.flash('msg', 'Data kontak berhasil dihapus');
        res.redirect('/contact');
    }
});

app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('edit-contact', {
        layout: 'layouts/main',
        title: 'Halaman Edit Contact',
        contact,
    });
});

app.post('/contact/update', [
    body('nama').custom((value, { req }) => {
        const duplikat = cekDuplikat(value);
        if( value !== req.body.oldNama && duplikat ) {
            throw new Error('Nama kontak telah digunakan');
        }
        return true;
    }),
    body('email').isEmail(),
    check('nohp', 'No Handphone Harus +62').isMobilePhone('id-ID'),
    ], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({errors: errors.array()});
            res.render('edit-contact', {
                layout: 'layouts/main',
                title: 'Halaman Edit Contact',
                errors: errors.array(),
                contact:req.body,
            })
        } else {
            updateContact(req.body);
            // Kirimkan flash message
            req.flash('msg', 'Data kontak berhasil ditambahkan');
            res.redirect('/contact');
        }
});

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        layout: 'layouts/main',
        title: 'Halaman Detail Contact',
        contact,
    });
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