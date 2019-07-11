const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url == '/' ? 'index.html' : req.url); 
    let ext = path.extname(filePath); 
    let contentType = ""; 
    switch (ext) {
        case '.html': 
            contentType = 'text/html';
            break; 
        case '.css': 
            contentType = 'text/css';
            break; 
        case '.js': 
            contentType = 'text/javascript';
            break; 
        case '.png': 
            contentType = 'image/png';
            break; 
        case '.jpg':
            contentType = 'image/jpg';
            break; 
        case '.jpeg':
            contentType = 'image/jpg';
            break; 

    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code == 'ENOENT') {
                fs.readFile(path.join(__dirname, '404.html'), 'utf8', (err, data) => {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(data, 'utf8'); 
                });
            } 
        } else {
            res.writeHead(200, {'Content-Type': contentType}); 
            if (path.extname(filePath) == '.jpg' || path.extname(filePath) == '.png') {
                res.end(data);
            } else {
                res.end(data, 'utf8');
            }
            
        }
    });
});

server.listen(5000, err => {
    console.log('Listening on port 5000')
    if (err) {
        throw err; 
    }
});