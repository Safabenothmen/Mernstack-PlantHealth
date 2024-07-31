from flask import Flask, request, jsonify
from flask_cors import CORS

from gevent.pywsgi import WSGIServer

import numpy as np
import pickle
import cv2
from os import listdir
import os  # Ajout de cette ligne

from sklearn.preprocessing import LabelBinarizer

from keras.models import Sequential
from tensorflow.keras.layers import BatchNormalization

from keras.layers.convolutional import Conv2D
from keras.layers.convolutional import MaxPooling2D
from keras.layers.core import Activation, Flatten, Dropout, Dense
from keras import backend as K
from keras.preprocessing.image import ImageDataGenerator
from keras.optimizers import Adam
from keras.preprocessing import image
from tensorflow.keras.preprocessing.image import img_to_array
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from keras.models import model_from_json
from keras.models import load_model
from werkzeug.utils import secure_filename



app = Flask(__name__)
CORS(app)
#model = load_model('model80.h5')
default_image_size = tuple((256, 256))
image_size = 0
directory_root = './plantdisease/'
width = 256
height = 256
depth = 3
image_list, label_list = [], []


def convert_image_to_array(image_dir):
    try:
        image = cv2.imread(image_dir)
        if image is not None :
            image = cv2.resize(image, default_image_size)   
            return img_to_array(image)
        else :
            return np.array([])
    except Exception as e:
        print(f"Error : {e}")
        return None


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'})

            image = request.files['image']
        print("[INFO] Loading images ...")
        root_dir = listdir(directory_root)
        for directory in root_dir :
            # remove .DS_Store from list
            if directory == ".DS_Store" :
                root_dir.remove(directory)

        for plant_folder in root_dir :
            plant_disease_folder_list = listdir(f"{directory_root}/{plant_folder}")
            
            for disease_folder in plant_disease_folder_list :
                # remove .DS_Store from list
                if disease_folder == ".DS_Store" :
                    plant_disease_folder_list.remove(disease_folder)

            for plant_disease_folder in plant_disease_folder_list:
                print(f"[INFO] Processing {plant_disease_folder} ...")
                plant_disease_image_list = listdir(f"{directory_root}/{plant_folder}/{plant_disease_folder}/")
                    
                for single_plant_disease_image in plant_disease_image_list :
                    if single_plant_disease_image == ".DS_Store" :
                        plant_disease_image_list.remove(single_plant_disease_image)

                for image in plant_disease_image_list[:200]:
                    image_directory = f"{directory_root}/{plant_folder}/{plant_disease_folder}/{image}"
                    if image_directory.endswith(".jpg") == True or image_directory.endswith(".JPG") == True:
                        image_list.append(convert_image_to_array(image_directory))
                        label_list.append(plant_disease_folder)
        print("[INFO] Image loading completed")  
    except Exception as e:
        print(f"Error : {e}")

    label_binarizer = LabelBinarizer()
    image_labels = label_binarizer.fit_transform(label_list)
    pickle.dump(label_binarizer,open('label_transform.pkl', 'wb'))
    n_classes = len(label_binarizer.classes_)
    print(label_binarizer.classes_)

    np_image_list = np.array(image_list, dtype=np.float16) / 225.0

    aug = ImageDataGenerator(
        rotation_range=25, width_shift_range=0.1,
        height_shift_range=0.1, shear_range=0.2, 
        zoom_range=0.2,horizontal_flip=True, 
        fill_mode="nearest")

    # load json and create model
    file = open('model.json', 'r')
    model_json = file.read()
    file.close()
    loaded_model = model_from_json(model_json)
    # load weights
    loaded_model.load_weights('model80.h5')

     # Obtenir le fichier image envoyé depuis React
    image = request.files['image']
    
    # Générer un nom de fichier sécurisé en utilisant secure_filename()
    filename = secure_filename(image.filename)
    
    # Déterminer le chemin complet du fichier en utilisant le répertoire d'upload et le nom de fichier
    file_path = os.path.join('./upload', filename)
    
    # Sauvegarder le fichier image dans le répertoire d'upload avec le chemin complet
    image.save(file_path)

    print("prediction")
    image_dir = "./upload/" + filename
    im = convert_image_to_array(image_dir)
    np_image_li = np.array(im, dtype=np.float16) / 225.0
    npp_image = np.expand_dims(np_image_li, axis=0)
    result = loaded_model.predict(npp_image)   #model.predict(npp_image)

    print("result", result)
    itemindex = np.where(result==np.max(result))
    print("probability:" + str(np.max(result)) + "\n" + label_binarizer.classes_[itemindex[1][0]])
    return "probability:" + str(np.max(result)) + "\n" + label_binarizer.classes_[itemindex[1][0]]
   
    


@app.route('/api/data')
def get_data():
    data = {'message': 'Données récupérées depuis le serveur Flask'}
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True, port=8000)

