import uuid

class User():
    def __init__(self,connection_id, name):
        self.user_id=connection_id
        self.id=uuid.uuid4().hex
        self.name=name
        self.score=0
        self.letters=[]
        self.player_connected=True

    def getUserID(self):
        return self.user_id

    def setUserID(self,sid):
        self.user_id=sid

    def getID(self):
        return self.id

    def getScore(self):
        return self.score

    def getLetters(self):
        return self.letters

    def getReady(self):
        return self.player_ready

    def getName(self):
        return self.name

    def setConnected(self):
        self.player_connected=True
    def setDisconnected(self):
        self.player_connected=False

