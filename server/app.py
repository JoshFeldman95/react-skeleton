import pyrebase
from GA_Database import *
import json
import os
from flask import *
from time import sleep
from flask_socketio import SocketIO
from flask_socketio import join_room, leave_room
import functools
import flask
from flask import *
from authlib.client import OAuth2Session
import google.oauth2.credentials
import googleapiclient.discovery
import google_auth



def get_config_data(filename):
	f = open(filename)
	return json.load(f)


def get_auth_emails(filename):
	f = open("server/authorized_emails.txt")
	lines = f.readlines()
	return set(lines)


template_dir = os.path.abspath('../client/dist')
static_dir = os.path.abspath('../client/src')
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.register_blueprint(google_auth.app)
socketio = SocketIO(app, async_mode="threading")

config = get_config_data("server/cred/config.txt")
db = DB()
db.authenticate(config_data=config)
student_info_streamer = DB.StudentInfoStream(db, socketio)

auth_emails = get_auth_emails("server/authorized_emails.txt")


@app.route("/")
def home():
    if google_auth.is_logged_in():
        user_info = google_auth.get_user_info()
        if user_info["email"] in auth_emails:
        	return render_template("index.html")
        else:
        	return "You are not an authorized user. Please contact admin to add you to user list"

    return render_template("login.html")

@app.route("/create", methods=["POST"])
def create_endpoint():
	data_from_client = json.loads(request.data)
	subject_id = data_from_client["subject_id"]

	data = data_from_client["data"]
	path = data_from_client["path"]

	message, return_val = db.create_nodes(subject_id, path, data)
	if return_val == 1:
		return Response(message, 200)
	elif return_val == -1:
		return Response(message, 400)


@app.route("/update", methods=["POST"])
def update_endpoint():
	data_from_client = json.loads(request.data)
	subject_id = data_from_client["subject_id"]

	data = data_from_client["data"]
	path = data_from_client["path"]

	message, return_val = db.update_nodes(subject_id, path, data)

	if return_val == 1:
		return Response(message, 200)
	elif return_val == -1:
		return Response(message, 400)


@app.route("/update_replace", methods=["POST"])
def update_replace_endpoint():
	data_from_client = json.loads(request.data)
	subject_id = data_from_client["subject_id"]

	data = data_from_client["data"]
	path = data_from_client["path"]

	message, return_val = db.update_replace_nodes(subject_id, path, data)

	if return_val == 1:
		return Response(message, 200)
	elif return_val == -1:
		return Response(message, 400)


@app.route("/get_nodes", methods=["GET"])
def get_nodes_endpoint():
	subject_id = request.args["subject_id"]
	path = request.args["path"]

	data, return_val = db.get_nodes(subject_id, path)

	if return_val == 1:
		return jsonify(data)
	elif return_val == -1:
		return Response(data, 400)


@app.route("/delete_nodes", methods=["POST"])
def delete_nodes_endpoint():
	data_from_client = json.loads(request.data)
	subject_id = data_from_client["subject_id"]
	path = data_from_client["path"]

	message, return_val = db.delete_nodes(subject_id, path)

	if return_val == 1:
		return Response(message, 200)
	elif return_val == -1:
		return Response(message, 400)


@socketio.on('join')
def on_join(data):
    room = data['room']
    print("JOINING A ROOM")
    print(room)
    join_room(room)


@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)

print ("starting")
socketio.start_background_task(target=student_info_streamer.stream_student_info)

if __name__ == '__main__':
	socketio.run(app, debug=True)
