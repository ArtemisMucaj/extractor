var Autopick;

Autopick = (function() {
  function Autopick() {
    this.subscriber = zmq.socket('sub');
    this.client = zmq.socket('req');
    this.subscriber.connect('tcp://localhost:8688');
    this.subscriber.subscribe('');
    this.client.connect('tcp://localhost:8888');
    this.client.send('SYNC');
    this.message = '';
    this.getMessage();
  }

  Autopick.prototype.getMessage = function() {
    var that;
    that = this;
    return this.subscriber.on('message', function(reply) {
      return that.message = reply.toString();
    });
  };

  Autopick.prototype.close = function() {
    this.subscriber.close();
    return this.client.close();
  };

  return Autopick;

})();

module.exports = Autopick;
