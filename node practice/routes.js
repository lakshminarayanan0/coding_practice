const path = require('path');
const fs = require('fs');


function eventHandler(req,res){

  function serveHTML(filePath, res) {
    fs.readFile(filePath, 'utf8', (err, cont) => {
      if (!err) {
        res.write(cont);
        res.end('</body></html>');
      } else {
        res.statusCode = 404;
        res.write('<h1>404 Not Found</h1>');
        res.end('</body></html>');
      }
    });
  }

  function showPage(title,fileLocation,res){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<html><head><title>${title}</title></head><body>`);
    serveHTML(fileLocation, res);
  }

  if (req.method === "POST" && req.url === '/') {
    const body=[]
    req.on('data',chunk=>{
       body.push(chunk)
    })
    req.on('end',()=>{
      const parsedBody=Buffer.concat(body).toString()
      const message=parsedBody.split('=');
      const messageRead=message[1].replace(/\+/g,' ')
      console.log(messageRead);
       fs.writeFileSync('text.txt',messageRead)
    })
    res.writeHead(302, { "Location": "/form" });
    res.end();
  }
  else if (req.url === '/') {
    showPage("home page",path.join(__dirname, 'htmls', 'index.html'), res);
  } else if (req.url === '/gallery') {
    showPage("gallery page",path.join(__dirname, 'htmls', 'gallery.html'), res);

  } else if (req.url === '/about') {
    showPage("about page",path.join(__dirname, 'htmls', 'about.html'), res);

  }else if(req.url==='/form'){
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write('<html><head><title>form page</title></head><body>');
    res.write('<h1>Redirect form practice</h1> <br><form action="/" method="post"> <textarea name="name" type="text" rows="10" cols="50" ></textarea> <br> <input type="submit" value="submit"> </form>')
    res.end('</body></html>');
  }
   else {
    res.statusCode = 404;
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write('<html><head><title>Node practice</title></head><body>');
    res.write('<h1>404 Page Not Found</h1>');
    res.end('</body></html>');
  }
}

exports.eventHandler=eventHandler;