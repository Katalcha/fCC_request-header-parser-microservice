require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', (_, res) => {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req, res) => {
  try {
    res.json({
      ipaddress: req.ip,
      language: req.get('accept-language'),
      software: req.get('user-agent')
    });
  } catch (err) {
    res.json(err);
  }
});

// listen for requests 
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
