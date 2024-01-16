// Untuk app1.js tanpa express

const http = require('http');
const fs = require('fs');
const port = 3000;
const renderHtml = (path, res) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Error: file not found')
        }else{
            res.write(data);
        }
        // respone berakhir
        res.end();
    });
};

http
    .createServer((req, res) => {
        // deklarasi variable url dari request dan get fungsi url
        const url = req.url;
        // maka variable url akan menampilkan parameter url di terminal
        // if( url === '/about' ) {
        //     // respone di view ke bentuk html write
        //     // res.write('Hello World!');
        //     fs.readFile('./about.html', (err, data) => {
        //         if (err) {
        //             res.writeHead(404);
        //             res.write('Error: file not found')
        //         }else{
        //             res.write(data);
        //         }
        //         // respone berakhir
        //         res.end();
        //     });
        // } else if ( url === '/contact' ) {
        //     res.write('<h1>Halaman Contact</h1>');
        //     res.end;
        // } else if ( url === '/menu' ) {
        //     renderHtml('./menu.html', res);
        // } else {
        //     // respone di view ke bentuk html write
        //     // res.write('Hello World!');
        //     fs.readFile('./index.html', (err, data) => {
        //         if (err) {
        //             res.writeHead(404);
        //             res.write('Error: file not found')
        //         }else{
        //             res.write(data);
        //         }
        //         // respone berakhir
        //         res.end();
        //     });
        // }
        // // respon akan memberikan pesan di header dengan status code 200 (success)
        // res.writeHead(200, {
        //     'Content-Type': 'text/html',
        // });

        // Batas, untuk dibawah gunain switch case
        switch (url) {
            case '/about':
                renderHtml('./about.html', res);
                break;
            case '/contact':
                res.write('<h1>Halaman Contact</h1>');
                res.end;
                break;
            case '/menu':
                renderHtml('./menu.html', res);
                break;
            default:
                renderHtml('./index.html', res);
                break;
        }
    })
    .listen(3000, () => {
        // ketika dijalankan maka di konsol akan menuliskan pesan Server is listening on port ####
        console.log(`Server is listening on port ${port}`);
});