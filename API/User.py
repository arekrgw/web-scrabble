class User():
    def __init__(self,connection_id):
        self.user_id=connection_id
        self.score=0
        self.letters=[]
        
    def getID(self):
        return self.user_id

    def getScore(self):
        return self.score

    def getLetters(self):
        return self.letters


