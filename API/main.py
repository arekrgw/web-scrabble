from User import *
from Board import *
from Game import *
from flask import Flask, request, session
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
    connectingUserId = request.args.get('id')
    player = None
    # find existing player
    for plr in player_list:
        if plr.id == connectingUserId:
            player = plr
            player.sid = request.sid

    if not player and game.getConnected_players() < 2 and not game.getGameStatus():
        # new player to connect to lobby
        player = User(request.sid, request.args.get('name'))
        player_list.append(player)
        emit('conn', {'conn': True, 'skipToGame': False, 'id': player.getID()}, room=request.sid)
        game.Connected_player()
        send_data()
        check_if_ready_to_start()
        return

    elif player:
        # player already on the list - reconnect him
        emit('conn', {'conn': True, 'skipToGame': game.getGameStatus(), 'id': connectingUserId}, room=request.sid)
        send_data()
        return

    emit('conn', {'conn': False}, room=request.sid)

@socketio.on('disconnect')
def dc():
    print("sid", request.sid)
    for plr in player_list:
        print("found")
        if plr.user_id == request.sid:
            player_list.remove(plr)
            game.DisconnectPlayer()
            break
    send_data()


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