from User import *
from Board import *
from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit
from flask_cors import CORS, cross_origin

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
        send_data()




@socketio.on('game_ready_to_start')
def game_ready():
        emit('game_ready', {'data':'Można zaczynać'},broadcast=True)




def check_if_ready_to_start():
    if(len(player_list)==4):
        game_ready()



def send_data():
    lobby_list=[]
    for i in player_list:
        lobby_list.append(i.getName())
    emit('lobby', {'current':len(player_list),'players': lobby_list, 'max': 4}, broadcast=True)




if __name__ == '__main__':
    socketio.run(app,port=5000,host='0.0.0.0')