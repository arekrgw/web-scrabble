class User():
    def __init__(self,connection_id):
        self.user_id=connection_id
        self.score=0
        self.letters=[]
        self.player_ready=False
        
    def getID(self):
        return self.user_id

    def getScore(self):
        return self.score

    def getLetters(self):
        return self.letters

    def getReady(self):
        return self.player_ready

    def setReady(self):
        self.player_ready=True


