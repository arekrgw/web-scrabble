import random

class  Letters_cout():

    def __init__(self):
        self.game_letters_amount = {
            "a": 10,
            "e": 7,
            "i": 2,
            "o": 3,
            "u": 3,
            "l": 3,
            "n": 2,
            "s": 1,
            "t": 4,
            "r": 3,
            "d": 5,
            "g": 2,
            "b": 4,
            "c": 2,
            "m": 3,
            "p": 2,
            "f": 4,
            "h": 3,
            "v": 1,
            "w": 2,
            "y": 4,
            "k": 3,
            "j": 3,
            "x": 1,
            "q": 1,
            "z": 3,
        }


    def is_letter_avilable(self,key):
        if(self.game_letters_amount[key] == 0):
            return True
        return False

    def display_amount(self):
        '''for debuging purposes'''
        for key, value in self.game_letters_amount.items():
            print(key , " " , value)

    def decrease_letter(self,key):
        self.game_letters_amount[key] = self.game_letters_amount[key] - 1

class Game():

    game_letters = {
        "a": 1,
        "e": 1,
        "i": 1,
        "o": 1,
        "u": 1,
        "l": 1,
        "n": 1,
        "s": 1,
        "t": 1,
        "r": 1,
        "d": 2,
        "g": 2,
        "b": 3,
        "c": 3,
        "m": 3,
        "p": 3,
        "f": 4,
        "h": 4,
        "v": 4,
        "w": 4,
        "y": 4,
        "k": 5,
        "j": 8,
        "x": 8,
        "q": 10,
        "z": 10,
    }


    def __init__(self):
        file = open("slownik.txt", "r", encoding='utf8')
        self.dictionary = file.readlines()
        self.game_status=False
        self.connected_player=0

    def random_letter(self):
        letter = random.choice(list(self.game_letters))
        return letter


    def checkWord(self, toCheck):
        for i in self.dictionary:
            i = i.rstrip()
            if i == toCheck:
                return True
        return False

    def checkPos(self,pos, word, direction):
        l=len(word)
        y=pos[0]
        x=pos[1]
        if direction=='vertical':
            if pos[0]+l>15:
                return False
        else:
            if pos[1]+l>15:
                return False
        return True



    def getConnected_players(self):
        return self.connected_player

    def Connected_player(self):
        self.connected_player=self.connected_player+1

    def DisconnectPlayer(self):
        self.connected_player=self.connected_player-1

    def setGameStart(self):
        self.game_status=True

    def getGameStatus(self):
        return self.game_status

