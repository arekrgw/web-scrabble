from User import *
from Board import *
from Game import *
from flask import Flask, request, session
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


can_connect = True
player_list=[]
board = Board()
game = Game()


@socketio.on('connect')
def joined():
    connectingUserid = request.values.get('id')
    player = None
    # find existing player
    for plr in player_list:
        if plr.getID() == connectingUserid:
            player = plr
            player.setUserID(request.sid)

    if not player and not game.getGameStatus():
        player = User(request.sid, request.args.get('name'))
        player_list.append(player)
        emit('conn', {'conn': True, 'skipToGame': False, 'id': player.getID()}, room=request.sid)
        game.Connected_player()
        send_data()
        check_if_ready_to_start()
        return

    elif player:
        # player already on the list - reconnect him
        emit('conn', {'conn': True, 'skipToGame': game.getGameStatus(), 'id': connectingUserid}, room=request.sid)
        send_data()
        return

    emit('conn', {'conn': False}, room=request.sid)

@socketio.on('disconnect')
def dc():
    if game.getGameStatus()==False:
        print("sid", request.sid)
        for plr in player_list:
            print("found")
            if plr.user_id == request.sid:
                player_list.remove(plr)
                game.DisconnectPlayer()
                break
        send_data()
    else:
        for plr in player_list:
            if plr.getUserID() == request.sid:
                plr.setDisconnected()
                break


def game_status():
    if(game.game_status==True):
        emit('game_status', {'status': 'start'}, broadcast=True)
    else:
        emit('game_status', {'status': 'end'}, broadcast=True)


def check_if_ready_to_start():
    if game.getConnected_players()==4:
        game.setGameStart()
        game_status()


def send_data():
    lobby_list=[]
    for i in player_list:
        lobby_list.append(i.getName())
    emit('lobby', {'current':len(player_list),'players': lobby_list, 'max': 4}, broadcast=True)


def game_loop():
    #wygeneruj litery
    while game.getGameStatus():
        for i in player_list:
            # borad update tura gracza i
            data=request.values.get('data',timeout=30,room=i.getUserID())
            flag=game.checkWord(data[0])
            if flag:
                flag=game.checkPos(data[2],data[0],data[1])
            if flag:
                # punkty
                # naniesienie na plansze
            #losowanie liter
            #jak za mało to koniec gry



if __name__ == '__main__':
    socketio.run(app,port=5000,host='0.0.0.0')