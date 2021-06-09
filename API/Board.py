class Board():
    def __init__(self):
        self.board=[[" " for i in range(15)] for j in range(15)]

        self.TRIPLE_WORD_SCORE = ((0, 0), (7, 0), (14, 0), (0, 7), (14, 7), (0, 14), (7, 14), (14, 14))
        self.DOUBLE_WORD_SCORE = (
        (1, 1), (2, 2), (3, 3), (4, 4), (1, 13), (2, 12), (3, 11), (4, 10), (13, 1), (12, 2), (11, 3), (10, 4),
        (13, 13), (12, 12), (11, 11), (10, 10))
        self.TRIPLE_LETTER_SCORE = (
        (1, 5), (1, 9), (5, 1), (5, 5), (5, 9), (5, 13), (9, 1), (9, 5), (9, 9), (9, 13), (13, 5), (13, 9))
        self.DOUBLE_LETTER_SCORE = (
        (0, 3), (0, 11), (2, 6), (2, 8), (3, 0), (3, 7), (3, 14), (6, 2), (6, 6), (6, 8), (6, 12), (7, 3), (7, 11),
        (8, 2), (8, 6), (8, 8), (8, 12), (11, 0), (11, 7), (11, 14), (12, 6), (12, 8), (14, 3), (14, 11))
        #self.add_premium_squares()

        self.game_letters = {
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

    def add_premium_squares(self):
        TRIPLE_WORD_SCORE = ((0, 0), (7, 0), (14, 0), (0, 7), (14, 7), (0, 14), (7, 14), (14, 14))
        DOUBLE_WORD_SCORE = (
        (1, 1), (2, 2), (3, 3), (4, 4), (1, 13), (2, 12), (3, 11), (4, 10), (13, 1), (12, 2), (11, 3), (10, 4),
        (13, 13), (12, 12), (11, 11), (10, 10))
        TRIPLE_LETTER_SCORE = (
        (1, 5), (1, 9), (5, 1), (5, 5), (5, 9), (5, 13), (9, 1), (9, 5), (9, 9), (9, 13), (13, 5), (13, 9))
        DOUBLE_LETTER_SCORE = (
        (0, 3), (0, 11), (2, 6), (2, 8), (3, 0), (3, 7), (3, 14), (6, 2), (6, 6), (6, 8), (6, 12), (7, 3), (7, 11),
        (8, 2), (8, 6), (8, 8), (8, 12), (11, 0), (11, 7), (11, 14), (12, 6), (12, 8), (14, 3), (14, 11))

        for coordinate in TRIPLE_WORD_SCORE:
            self.board[coordinate[0]][coordinate[1]] = "TWS"
        for coordinate in TRIPLE_LETTER_SCORE:
            self.board[coordinate[0]][coordinate[1]] = "TLS"
        for coordinate in DOUBLE_WORD_SCORE:
            self.board[coordinate[0]][coordinate[1]] = "DWS"
        for coordinate in DOUBLE_LETTER_SCORE:
            self.board[coordinate[0]][coordinate[1]] = "DLS"

    def getBoard(self):
        res=[ y for x in self.board for y in x]
        ','.join(map(str, res))
        return res

    def getBoardArray(self):
        return self.board

    def saveWord(self,word,pos,direction):
        if direction=='vertical':
            i=pos[0]
            for a in word:
                self.board[i][pos[1]]=a
                i=i+1
        else:
            i=pos[1]
            for a in word:
                self.board[pos[0]][i]=a
                i=i+1

    def countPoints(self,word,pos,direction):
        score=0
        if direction=='vertical':
            i=pos[0]
            for a in word:
                temp=self.game_letters[str(a)]
                p=(i,pos[1])
                if p in self.TRIPLE_LETTER_SCORE:
                    temp=temp*3
                if p in self.DOUBLE_LETTER_SCORE:
                    temp=temp*2
                i=i+1
                score=score+temp
        else:
            i=pos[1]
            for a in word:
                temp=self.game_letters[str(a)]
                p=(pos[0],i)
                if p in self.TRIPLE_LETTER_SCORE:
                    temp=temp*3
                if p in self.DOUBLE_LETTER_SCORE:
                    temp=temp*2
                i=i+1
                score=score+temp
        #nie wiem jak dziala mnoznik za cale slowa
        return score
