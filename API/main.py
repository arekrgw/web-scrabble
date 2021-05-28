from User import *
from Board import *
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

can_connect = True
player_list=[]


@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def joined():
    if can_connect:
        player=User(request.sid)
        player_list.append(player)
        send_data()


def send_data():
    for i in player_list:
        emit('after connect', {'data': i.getID()}, room=i.getID())










if __name__ == '__main__':
    tablica = Board()
    socketio.run(app)