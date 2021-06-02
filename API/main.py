from User import *
from Board import *
from Game import *
from flask import Flask, request, session
from flask_socketio import SocketIO, emit, send
#remember to
#pip install flask-login
from flask_login import LoginManager, UserMixin, login_user, current_user
import uuid



login_manager = LoginManager()
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


can_connect = True
player_list=[]
board = Board()
game = Game()

@login_manager.user_loader
def load_user(user_id):
    user = User(request.sid, request.args.get('name'))
    return user


@socketio.on('connect')
def joined():
    '''
    connectinguserid brał id usera z poprzedniego logowania teraz
    pamieta id ale nie pamięta nazwy
    ale imo to feature nie bug bo mozesz na jednym id zmienic nazwe jak chcesz ale
    :return:
    '''
    connectingUser = load_user(request.values.get('id'))

    player = None
    # find existing player
    for plr in player_list:
        if plr.id == connectingUser.id:
            player = plr
            player.sid = request.sid

    if not player and not game.getGameStatus():
        player = connectingUser
        player_list.append(player)
        emit('conn', {'conn': True, 'skipToGame': False, 'id': player.getID()}, room=request.sid)
        game.Connected_player()
        send_data()
        check_if_ready_to_start()
        return

    elif player:
        # player already on the list - reconnect him
        emit('conn', {'conn': True, 'skipToGame': game.getGameStatus(), 'id': connectingUser}, room=request.sid)
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
    login_manager.init_app(app)
    socketio.run(app,port=5000,host='0.0.0.0')