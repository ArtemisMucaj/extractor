# https://www.digitalocean.com/community/tutorials/how-to-work-with-the-zeromq-messaging-library
class Talker
  constructor : (@onMessage) ->
    @subscriber = zmq.socket('sub')
    @client = zmq.socket('req')
    # set up subscriber and client
    @subscriber.connect('tcp://localhost:8688')
    @subscriber.subscribe('')
    @client.connect('tcp://localhost:8888')
    @client.send('SYNC')
    # initialize message
    @message = ''
    @getMessage()

  getMessage : () ->
    that = @
    @subscriber.on 'message', (reply) ->
      that.message = reply.toString()
      that.onMessage(that.message)

  close : () ->
    @subscriber.close()
    @client.close()

module.exports = Talker
