const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/src-sw.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/service-worker.js'), (err) => { // make sure the path is correct
      if (err) {
        console.error('Error serving src-sw.js:', err);
        res.status(500).send('Error serving src-sw.js');
      }
    });
  });
  

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
