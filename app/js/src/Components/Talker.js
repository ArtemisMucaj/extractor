var Talker;

Talker = (function() {
  function Talker(onMessage) {
    this.onMessage = onMessage;
    this.subscriber = zmq.socket('sub');
    this.client = zmq.socket('req');
    this.subscriber.connect('tcp://localhost:8688');
    this.subscriber.subscribe('');
    this.client.connect('tcp://localhost:8888');
    this.client.send('SYNC');
    this.message = '';
    this.getMessage();
  }

  Talker.prototype.getMessage = function() {
    var that;
    that = this;
    return this.subscriber.on('message', function(reply) {
      that.message = reply.toString();
      return that.onMessage(that.message);
    });
  };

  Talker.prototype.close = function() {
    this.subscriber.close();
    return this.client.close();
  };

  return Talker;

})();

module.exports = Talker;
