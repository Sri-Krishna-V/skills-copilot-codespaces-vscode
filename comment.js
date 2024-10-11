// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read comments from file
let comments = [];
fs.readFile('comments.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading comments');
  } else {
    comments = JSON.parse(data);
  }
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add a comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFile('comments.txt', JSON.stringify(comments), (err) => {
    if (err) {
      console.log('Error writing comments');
    }
  });
  res.json(comment);
});

// Start web server
const port = 3000;
app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

```
$ node comment.js
Web server listening on port 3000

$ curl -X POST -d "name=John&comment=Hello" http://localhost:3000/comments
{"name":"John","comment":"Hello"}


```

