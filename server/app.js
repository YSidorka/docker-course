const keys = require('./keys');
const { promisify } = require('util');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})

pgClient.on('connect', () => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch((err) => console.log(err));
});

pgClient.on('error', () => console.log('Lost PG connection'));


// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

redisClient.hgetall = promisify(redisClient.hgetall);

const redisPublisher = redisClient.duplicate();


// Express route handlers
app.get('/values/all', async (req, res) => {
  try {
    const values = await pgClient.query('SELECT * from values');
    return res.send(values.row);
  } catch (err) {
    return res.status(500).send({ message: 'GET /values/all', err: JSON.stringify(err) });
  }
});

app.get('/values/current', async (req, res) => {
  try {
    const values = await redisClient.hgetall('values')
    return res.send(values);
  } catch (err) {
    return res.status(500).send({ message: 'GET /values/all', err: JSON.stringify(err) });
  }
});

app.post('/values', async (req, res) => {
  try {
    const index = req.body.index;
    if (parseInt(index) > 40) {
      return res.status(422).send('Index too high');
    }

    redisClient.hset('values', index, null);
    redisPublisher.publish('insert', index);

    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    return res.send({ working:true, index: index });
  } catch (err) {
    return res.status(500).send({ message: `GET /values/:value, ${req.params.value}`, err: JSON.stringify(err) });
  }
});

app.get('/', async (req, res) => {
  try {
    return res.send({'Server settings': keys});
  } catch (err) {
    return res.status(500).send({ message: 'GET /', err: JSON.stringify(err) });
  }
});

let server = app.listen(keys.serverPort, () => {
  console.log(`Server started on port ${keys.serverPort}!`);
});
