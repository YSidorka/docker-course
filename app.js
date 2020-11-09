let express = require('express');

let app = express();

let port = 3000;

app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    // memory
    const used = process.memoryUsage();
    let result = {};
    for (let key in used) result[key] = Math.round((used[key] / 1024 / 1024) * 100) / 100 + ' MB';

    return res.send(result);
  } catch (err) {
    console.error(JSON.stringify(err));
    return res.status(500).send({ message: 'Something goes wrong', err: JSON.stringify(err) });
  }
});

let server = app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
