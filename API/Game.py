class Game():
    def __init__(self):
        file = open("slownik.txt", "r", encoding='utf8')
        self.dictionary = file.readlines()
        self.game_status=False
        self.connected_player=0

    def checkWord(self, toCheck):
        for i in self.dictionary:
            i = i.rstrip()
            if i == toCheck:
                return True
        return False

    def getConnected_players(self):
        return self.connected_player

    def Connected_player(self):
        self.connected_player=self.connected_player+1

    def setGameStart(self):
        self.game_status=True;

    def getGameStatus(self):
        return self.game_status

