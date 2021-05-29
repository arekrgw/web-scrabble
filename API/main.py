from User import *
from Board import *
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

can_connect = True
player_list=[]
board = Board()

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def joined():
    if can_connect:
        player=User(request.sid)
        player_list.append(player)
        send_data()



@socketio.on('player_ready')
def event(data, methods=['GET', 'POST']):
    temp=str(data)
    l=len(temp)
    dat=temp[10:l-2]
    for i in player_list:
        if(str(i.getID())==dat):
            i.setReady()
    check_if_ready_to_start()

@socketio.on('game_ready_to_start')
def game_ready():
        emit('game_ready', {'data':'Można zaczynać'},broadcast=True)




def check_if_ready_to_start():
    if(len(player_list)==2 or len(player_list)==4):
        for i in player_list:
            if(i.getReady()==False):
                return
        game_ready()



def send_data():
    for i in player_list:
        emit('after connect', {'data': i.getID()}, room=i.getID())











if __name__ == '__main__':
    socketio.run(app)