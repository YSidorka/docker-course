let express = require('express');
let redis = require('redis');

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

let port = 3000;
client.get('visits', (err, visits) => {
  if (!visits || parseInt(visits) < 0) client.set('visits', 0);
})

app.get('/', async (req, res) => {
  try {
    client.get('visits', (err, visits) => {
      client.set('visits', parseInt(visits) + 1);
      return res.send('Number of visits is ' + visits);
    })
  } catch (err) {
    return res.status(500).send({ message: 'GET /', err: JSON.stringify(err) });
  }
});

let server = app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
