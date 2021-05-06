let redis = require('redis');
let client = redis.createClient(); //creates a new client
// var client = redis.createClient(port, host);


//Connect
client.on('connect', function() {
    console.log('connected');
});

//Base
client.set('foo', 'bar', function(err, reply) {
    console.log(reply);
});

client.get('foo', function(err, reply) {
    console.log(reply);
});

client.del('foo', function(err, reply) {
    console.log(reply);
});
client.get('foo', function(err, reply) {
    console.log(reply);
});

//MSET
client.mset('a', 10, 'b', 20, 'c', 30);

client.mget(['a', 'b', 'c'], function (err, res) {
    for (var i = 0, len = res.length; i < len; i++) {
        console.log(res[i]);
    }
});

//Counter
client.set('counter', 100);
client.incr('counter');
client.incrby('counter', 9);
client.decrby('counter', 4);
client.decr('counter');
client.incrbyfloat('counter',1.5);
client.get('counter', function(err, reply) {
    console.log(reply);
});

//Exists?
client.set('greeting', 'Hello World!!');
if (client.exists('greeting',  function(err, reply) {
    if (reply == 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
}));

//Listas

client.del('sessions:ggvd');

client.lpush('sessions:ggvd', 'Sesion02');
client.rpush('sessions:ggvd', ['Sesion04', 'Sesion05']);
client.lpush('sessions:ggvd', 'La Sesion 01');
client.rpop('sessions:ggvd');
client.linsert('sessions:ggvd', 'BEFORE', 'Sesion04', 'Sesion03');
client.lset('sessions:ggvd', 0, 'Sesion01');

client.lrange('sessions:ggvd', 0, -1, function(err, reply) {
        console.log(reply);
});

	
client.del('sessions:ggvd');


//Conjuntos
console.log('Conjuntos');
client.del('students:ggvd');

client.sadd('students:ggvd', 'student1', 'student2', 'student3');
client.srem('students:ggvd', 'student3');

client.smembers('students:ggvd', function(err, reply) {
    console.log(reply);
});

client.scard('students:ggvd', function(err, reply){
        console.log(reply);
});

client.del('students:ggvd');
//Operaciones Cojuntos

client.del('students:ggvd');

client.sadd('students:ggvd', 'student1', 'student2', 'student3');
client.sadd('students:bd', 'student3', 'student4', 'student5');

client.sunion('students:bd', 'students:ggvd', function(err, reply) {
    console.log('  >> Unión:');
    console.log(reply);
});

client.sinter('students:bd', 'students:ggvd', function(err, reply) {
    console.log('  >> Intersección:');
    console.log(reply);
});

client.sdiff('students:bd', 'students:ggvd', function(err, reply) {
    console.log('  >> Diferencia:');
    console.log(reply);
});

client.del('students:ggvd');
// client.close();