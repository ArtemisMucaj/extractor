import zmq
import sys

#  We wait for 1 subscriber
SUBSCRIBERS_EXPECTED = 1


def main():
    context = zmq.Context()
    # Socket to talk to clients
    publisher = context.socket(zmq.PUB)
    # set SNDHWM, so we don't drop messages for slow subscribers
    publisher.sndhwm = 1100000
    publisher.bind('tcp://*:8688')

    # Socket to receive signals
    syncservice = context.socket(zmq.REP)
    syncservice.bind('tcp://*:8888')

    # Get synchronization from subscribers
    subscribers = 0
    while subscribers < SUBSCRIBERS_EXPECTED:
        # wait for synchronization request
        msg = syncservice.recv()
        # send synchronization reply
        syncservice.send(b'')
        subscribers += 1
        sys.stdout.write("sub (%i/%i)" % (subscribers, SUBSCRIBERS_EXPECTED))

    for i in range(0, 1000):
        publisher.send(b"sisi ma geule")
    # print("Bitch please...")
    # Now broadcast 'END'
    publisher.send(b'END')

if __name__ == '__main__':
    main()
