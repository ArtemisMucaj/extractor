var Talk;

Talk = (function() {
  function Talk(onMessage) {
    this.onMessage = onMessage;
    console.log("Instantiate talk");
    this.requester = zmq.socket('req');
    this.requester.connect('tcp://localhost:8888');
    this.requester.send('SYNC');
    this.message = '';
    this.getMessage();
  }

  Talk.prototype.getMessage = function() {
    var that;
    that = this;
    return this.requester.on('message', function(reply) {
      that.message = reply.toString();
      if (that.message !== "SYNC") {
        return that.onMessage(that.message);
      }
    });
  };

  Talk.prototype.send = function(msg) {
    return this.requester.send(msg.toString());
  };

  Talk.prototype.close = function() {
    return this.requester.close();
  };

  return Talk;

})();

module.exports = Talk;
