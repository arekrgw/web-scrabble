from User import *
from Board import *
from Game import *
from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit, send
import uuid



app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


can_connect = True
player_list=[]
board = Board()
game = Game()

@socketio.on('connect')
def joined():
    if game.getConnected_players()<4:
        player=User(request.sid, request.args.get('name'), request.args.get('id'))
        if(game.getGameStatus()==True):
            for i in player_list:
                if i.getID()==player.getID():
                    player=i
                    game.Connected_player()
            else:
                emit('con_request',{'Con':'No','id':None})
                return
        else:
            player_list.append(player)
            game.Connected_player()
        emit('con_request',{'Con':'Yes','id':player.getID()},room=player.getUserID())
        send_data()
        check_if_ready_to_start()
    else:
        emit('con_request',{'Con':'No','id':None})




def game_status():
    if(game.game_status==True):
        emit('game_status', {'data': 'start'}, broadcast=True)
    else:
        emit('game_status', {'data': 'end'}, broadcast=True)


def check_if_ready_to_start():
    if game.getConnected_players()==4:
        game.setGameStart()
        game_status()






def send_data():

    lobby_list=[]
    for i in player_list:
        lobby_list.append(i.getName())
    emit('lobby', {'current':len(player_list),'players': lobby_list, 'max': 4}, broadcast=True)





if __name__ == '__main__':
    socketio.run(app,port=5000,host='0.0.0.0')