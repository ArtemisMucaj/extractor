# https://www.digitalocean.com/community/tutorials/how-to-work-with-the-zeromq-messaging-library
class Talk
  constructor : (@onMessage) ->
    console.log("Instantiate talk")
    @requester = zmq.socket('req')
    # set up subscriber and client
    @requester.connect('tcp://localhost:8688')
    @requester.send('SYNC')
    # initialize message
    @message = ''
    @getMessage()

  getMessage : () ->
    that = @
    @requester.on 'message', (reply) ->
      that.message = reply.toString()
      if that.message != "SYNC"
        that.onMessage(that.message)

  send : (msg) ->
    @requester.send(msg.toString())

  close : () ->
    @requester.close()

module.exports = Talk
