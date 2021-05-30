class Game():
    def __init__(self):
        file = open("slownik.txt", "r", encoding='utf8')
        self.dictionary = file.readlines()

    def checkWord(self, toCheck):
        for i in self.dictionary:
            i = i.rstrip()
            if i == toCheck:
                return True
        return False
