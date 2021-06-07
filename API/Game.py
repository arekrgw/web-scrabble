import random
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
        if direction=='vertical':
            if pos[0]+len>15:
                return False
        else:
            if pos[1]+len>15:
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

