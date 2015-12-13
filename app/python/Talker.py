import zmq
import sys


# Publish data using ZMQ
class Talker(object):
    def __init__(self, expected_subscribers):
        self.expected_subscribers, self.subscribers = expected_subscribers, 0
        self.context = zmq.Context()
        self.pub, self.syncservice = self.context.socket(zmq.PUB), self.context.socket(zmq.REP)
        # setup pub and syncservice
        self.setup()
        self.wait_for_sync()

    def setup(self):
        # Setup publisher
        self.pub.sndhwm = 1100000
        self.pub.bind('tcp://*:8688')
        # Setup syncservice
        self.syncservice.bind('tcp://*:8888')

    def wait_for_sync(self):
        sys.stdout.write("Waiting for sync ...\n")
        while self.subscribers < self.expected_subscribers:
            # wait for sync request
            message = self.syncservice.recv()
            # send sync reply
            self.syncservice.send(b'')
            self.subscribers += 1
            sys.stdout.write("sub (%i/%i)" % (self.subscribers, self.expected_subscribers))

    def close(self):
        self.pub.close(), self.syncservice.close()
        self.context.term()

    def send(self, message):
        self.pub.send_string(str(message))
