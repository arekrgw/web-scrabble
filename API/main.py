import time

from User import *
from Board import *
from Game import *
from flask import Flask, request, session
from flask_socketio import SocketIO, emit, send
from flaskthreads import AppContextThread
from flask import copy_current_request_context
from constants import MAX_PLAYERS, TURN_TIME

import eventlet
eventlet.monkey_patch()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

can_connect = True
player_list = []
board = Board()
game = Game()
turn = None


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

        letters_update()
        board_update(turn)

        return

    emit('conn', {'conn': False}, room=request.sid)


@socketio.on('disconnect')
def dc():
    if game.getGameStatus() == False:
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
    if (game.game_status == True):
        emit('game_status', {'status': 'start'}, broadcast=True)
    else:
        emit('game_status', {'status': 'end'}, broadcast=True)


def check_if_ready_to_start():
    if game.getConnected_players()==MAX_PLAYERS:
        game.setGameStart()
        game_status()
        eventlet.spawn(game_loop)



def send_data():
    lobby_list = []
    for i in player_list:
        lobby_list.append(i.getName())
    emit('lobby', {'current':len(player_list),'players': lobby_list, 'max': MAX_PLAYERS}, broadcast=True)


def board_update(next_player):
    players_info = []
    for i in player_list:
        players_info.append((i.getName(), i.getScore()))
    print(players_info)
    socketio.emit('board_update', {'board': board.getBoardArray(), 'score': players_info, 'turn': next_player.getName(), 'timeForTurn': TURN_TIME})


@socketio.on('send_word')
def recive(word,direction,pos):
    if request.sid==turn.getUserID():
        flag = game.checkWord(word)
        if flag:
            flag = game.checkPos(pos, word, direction)
        if flag:
            score = board.countPoints(word,pos,direction)
            turn.setScore(score)
            board.saveWord(word,pos,direction)
            # losowanie liter
            # jak za mało to koniec gry



def game_loop():
    # wygeneruj litery
    for player in player_list:
        player.letters = generate_letters(7, player)
        emit('letter_update', {'current': player.letters}, room=player.getUserID())

    while game.getGameStatus():
        for i in player_list:
            # borad update tura gracza i

            data = request.values.get('data', timeout=30, room=i.getUserID())
            flag = game.checkWord(data[0])
            if flag:
                flag = game.checkPos(data[2], data[0], data[1])
            # if flag:
            # punkty
            # naniesienie na plansze
            # losowanie liter
            # jak za mało to koniec gry

    letters()
    while game.getGameStatus():
        for i in player_list:
            turn = i
            board_update(i)
            letters_update()
            score = board.countPoints('word',pos,'vertical') #test
            board.saveWord('word',pos,'vertical') #test
            i.setScore(score) #test
            eventlet.sleep(TURN_TIME)
    # send score board


def letters():
    for player in player_list:
        player.letters = generate_letters(7, player)
        socketio.emit('letter_update', {'current': player.letters}, room=player.getUserID())

def letters_update():
    for player in player_list:
        socketio.emit('letter_update', {'current': player.letters}, room=player.getUserID())




def generate_letters(num, player):
    letters = player.letters
    for i in range(0, num):
        letters.append(game.random_letter())
    return letters


@socketio.on('send_word')
def subtract_letters(word):
    return




if __name__ == '__main__':
    socketio.run(app, port=5000, host='0.0.0.0')
