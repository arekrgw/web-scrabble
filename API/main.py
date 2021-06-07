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
turn = None
word = None
pos = None
direction = None


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


@socketio.on('send_word')
def recive(word_recived,direction_recived,pos_recived):
    if request.sid==turn:
        word=word_recived
        direction=direction_recived
        pos=pos_recived




def game_loop():
    #wygeneruj litery
    for player in player_list:
        player.letters = generate_letters(7,player)
        emit('letter_update',{'current':player.letters},room=player.getUserID())

    while game.getGameStatus():
        for i in player_list:
            turn = i.getUserID()
            # board update tura gracza i
            time.sleep(10)
            if(word==None):
                continue
            flag=game.checkWord(word)
            if flag:
                flag=game.checkPos(pos,word,direction)
            # if flag:
                # punkty
                # naniesienie na plansze
            #losowanie liter
            #jak za mało to koniec gry
            word=None
            direction=None
            pos=None



def generate_letters(num,player):
    letters = player.letters
    for i in range(0,num):
        letters.append(game.random_letter())
    return letters
    # emit('letter_update',)


if __name__ == '__main__':
    socketio.run(app,port=5000,host='0.0.0.0')