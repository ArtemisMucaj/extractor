// ZeroMQ Subscriber trial
var zmq = require('zmq')

var subscriber = zmq.socket('sub')
var client = zmq.socket('req')

subscriber.on('message', function(reply) {
  console.log('Received message: ', reply.toString());
})

subscriber.connect('tcp://localhost:8688')
subscriber.subscribe('')

client.connect('tcp://localhost:8888')
client.send('SYNC')

process.on('SIGINT', function() {
  subscriber.close()
  client.close()
})

// Spawn a python3 process : zmq publisher
var spawn = require('child_process').spawn,
    publisher = spawn('python3',
	[global.__dirname+"/python/publisher.py"]);

// Print python script output responses
publisher.stdout.on('data', function(data){
  console.log('stdout : ' + data);
});
publisher.stderr.on('data', function(data){
  console.log('stderr : ' + data);
});
publisher.on('close', function(code){
  console.log("python publisher script finished its execution");
});
// end of
