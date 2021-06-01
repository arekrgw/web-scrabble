from User import *
from Board import *
from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit



app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


can_connect = True
player_list=[]
board = Board()

@socketio.on('connect')
def joined():
    if can_connect:
        player=User(request.sid, request.args.get('name'))
        player_list.append(player)
        accept()
        check_if_ready_to_start()
    else:
        reject()







def check_if_ready_to_start():
    if(len(player_list)==4):
        can_connect=False


def accept():
    emit('connection', {'data': 'Success'})
    send_data()
def reject():
    emit('connection', {'data': 'Rejected'})

def send_data():
    lobby_list=[]
    for i in player_list:
        lobby_list.append(i.getName())
    emit('lobby', {'current':len(player_list),'players': lobby_list, 'max': 4}, broadcast=True)





if __name__ == '__main__':
    socketio.run(app,port=5000,host='0.0.0.0')