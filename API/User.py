import uuid

class User():
    def __init__(self,connection_id, name,id):
        self.user_id=connection_id
        if id==None:
            self.id=uuid.uuid4().hex
        else:
            self.id=id
        self.name=name
        self.score=0
        self.letters=[]
        self.player_connected=False

    def getUserID(self):
        return self.user_id

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

