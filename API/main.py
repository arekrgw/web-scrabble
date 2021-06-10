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
letters_cout = Letters_cout()
turn = None
end_turn = False

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
def recive(msg):
    global end_turn
    print(msg) # msg to {'word': 'asdas', 'direction': 'horizontal', 'pos': [7, 7]}
    if request.sid==turn.getUserID():
        flag = game.checkWord(msg['word'])
        if flag:
            flag = game.checkPos(msg['pos'], msg['word'], msg['direction'])
        if flag:
            flag = board.checkWordOnBoard(msg['pos'],msg['direction'])
        print('pos passed')
        if flag:
            used_letters=board.getNewLetters(msg['pos'], msg['word'], msg['direction'])
            if used_letters==None:
                flag=False
            print(used_letters)
            # used letters to litery do odjęcia
        if flag:
            end_turn=True
            print('tutaj')
            
            score = board.countPoints(msg['word'],msg['pos'],msg['direction']) 
            board.saveWord(msg['word'],msg['pos'],msg['direction']) 
            turn.setScore(score) 
            # losowanie liter
            # jak za mało to koniec gry
        else:
            emit('wrong_word',{'data':'Something went wrong'}, room=request.sid)



def game_loop():

    #letters()
    global turn
    global end_turn
    prepared_letters()
    while game.getGameStatus():
        for i in player_list:
            turn = i

            board_update(i)
            letters_update()
            for i in range (0,TURN_TIME):
                eventlet.sleep(1)
                if end_turn==True:
                    end_turn=False
                    break
    # send score board


def letters():
    for player in player_list:
        player.letters = generate_letters(7, player)
        socketio.emit('letter_update', {'current': player.letters}, room=player.getUserID())

def letters_update():
    for player in player_list:
        socketio.emit('letter_update', {'current': player.letters}, room=player.getUserID())






def prepared_letters():
    for i in player_list:
        i.letters=['j','a','k','t','o','a','a']



def generate_letters(num,player):
    letters = player.letters
    for i in range(0, num):
        letter = game.random_letter()
        if letters_cout.is_letter_avilable(letter):
            letters.append(game.random_letter())
    return letters






if __name__ == '__main__':
    socketio.run(app, port=5000, host='0.0.0.0')
