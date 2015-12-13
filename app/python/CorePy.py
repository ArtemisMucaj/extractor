import cv2
import sys
import numpy as np

from Kppv import Kppv
from Mlp import Mlp

from ImageFactory import ImageFactory


class CorePy(object):
    def __init__(self, path, predictorType):
        super(CorePy, self).__init__()
        self.image = ImageFactory()
        self.path = path
        if predictorType == "kppv":
            self.predictor = Kppv()
        elif predictorType == "mlp":
            self.predictor = Mlp()
        else:
            self.predictor = None
        self.max_distance = 0

    def setImage(self, path_to_image):
        self.image.initialize(path_to_image)

    def predict_current(self):
        predicted_classes, result = np.zeros((len(self.image.feature_list), 2)), 0
        for x in range(0,len(self.image.feature_list)):
            predicted_classes[x], distance = self.predictor.predict(self.image.feature_list[x])
            result += predicted_classes[x]
            if distance >= 0:
                self.max_distance = max(self.max_distance, distance)
        self.image.class_list = predicted_classes
        pass

    def train_predictor(self):
        self.predictor.train(self.image.feature_list, self.image.class_list)


def run(path,Core):
    # set new image - this will compute the features
    Core.setImage(path)
    # find area of interest
    Core.predict_current()
    # Core.image.draw()
    # cv2.namedWindow('image')
    # cv2.setMouseCallback('image', Core.selectRegionOfInterest)
    # cv2.imshow('image', Core.image.display)
    # cv2.waitKey(0)
    # cv2.setMouseCallback('image', Core.dummyCallBack)
    # Core.training_predictor()
    pass


# {
# 	"data": [{
# 	  "positions":[{"x":"0", "y":"0"},{"x":"0", "y":"0"}],
# 	  "class":{"0":"0", "1":"1"}
# 	},
# 	{  "positions":[{"x":"0", "y":"0"},{"x":"0", "y":"0"}],
# 	  "class":{"0":"0", "1":"1"}
# 	}]
# }
def tojson(data):
    length = len(data[0])
    json_string = '{"data":['
    for x in range(0,length):
        pos, classe = data[0][x], data[1][x]
        # sys.stdout.write(str(pos)+ " / ")
        # sys.stdout.write("x top : "+str(pos[0][0])+", y  top: "+str(pos[0][1])+", x bot : "+str(pos[1][0])+", y  bot : "+str(pos[1][1])+"\n")
        json_string += '{"pos":[{"x":"'+str(pos[0][0])+'", "y":"'+str(pos[0][1])+'"},{"x":"'+str(pos[1][0])+'","y":"'+str(pos[1][1])+'"}],'+'"class":["'+str(classe[0])+'","'+str(classe[1])+'"]}'
        if x != length - 1:
            json_string += ','
        pass
    json_string += ']}'
    return json_string


def main():
    Core = CorePy("","kppv")
    sys.stdout.write("CorePy initialized ...\n")
    send_to_electron = Talker(1)
    run(sys.argv[1], Core)

    data = tojson([Core.image.content_list, Core.image.class_list])

    send_to_electron.send(str(data))

    # message = send_to_electron.syncservice.recv()
    # sys.stdout.write(str(message)+"\n")

    send_to_electron.close()

    # list_path_training = auto_pick_train.get_training_image("png/20/HPC-T4-2013-GearsAndSprockets-GB/")
    # Training
    # for x in range(0,len(list_path_training)):
    #    functionTestTraining("png/500/HPC-T4-2013-GearsAndSprockets-GB/"+list_path_training[x],Core,F,C)
    #    pass
    pass

if __name__ == '__main__':
    # publish data using zeroMQ
    from Talker import Talker
    main()
