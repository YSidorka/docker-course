// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
// 20 - 6765
// 30 - 832040
// 40 - 102334155   1.407 seconds
// 41 - 165580141   2.322 seconds
// 43 - 433494437   6.128 seconds
// 45 - 1134903170  15.373 seconds / 0.003 seconds
// 50 - 12586269025 209.076 seconds / 0.004 seconds

// 100 - 354224848179262000000 ... / 0.004 seconds
// 1000 - 4.346655768693743e+208 ... / 0.004 seconds
// 1300 - 2.159968028316171e+271 ... / 0.004 seconds
// 1476 - 1.3069892237633987e+308 ... / 0.004 seconds

const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();
let fibResults = [1, 1]

function fib(index) {
  if (!index || index <= 0) return 0;
  if (index < 2) return 1;
  //if (index <= fibResults.length) return fibResults[index - 1];

  let result = fib(index - 1) + fib(index - 2);
  if (index === fibResults.length + 1) fibResults.push(result);
  return result;
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)))
})
sub.subscribe('insert');

console.log(fib(14));
