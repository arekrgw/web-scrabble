# -*- coding: utf-8 -*-
from __future__ import unicode_literals

class Board():
    def __init__(self):
        self.board=[["" for i in range(15)] for j in range(15)]

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
        self.board_empty = True
        self.game_letters = {
        "a": 1,
        "ą": 5,
        "b": 3,
        "c": 2,
        "ć": 6,
        "d": 2,
        "e": 1,
        "ę": 5,
        "f": 5,
        "g": 3,
        "h": 3,
        "i": 1,
        "j": 3,
        "k": 2,
        "l": 2,
        "ł": 3,
        "m": 2,
        "n": 1,
        "ń": 7,
        "o": 1,
        "ó": 5,
        "p": 2,
        "r": 1,
        "s": 1,
        "ś": 5,
        "t": 2,
        "u": 3,
        "w": 1,
        "y": 2,
        "z": 1,
        "ź": 9,
        "ż": 5,
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
        x3=0
        x2=0
        if direction=='vertical':
            i=pos[0]
            for a in word:
                temp=self.game_letters[str(a)]
                p=(i,pos[1])
                if p in self.TRIPLE_LETTER_SCORE:
                    temp=temp*3
                if p in self.DOUBLE_LETTER_SCORE:
                    temp=temp*2
                if p in self.DOUBLE_WORD_SCORE:
                    x2=1
                if p in self.TRIPLE_WORD_SCORE:
                    x3=1
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
                if p in self.DOUBLE_WORD_SCORE:
                    x2=1
                if p in self.TRIPLE_WORD_SCORE:
                    x3=1
                i=i+1
                score=score+temp
        #nie wiem jak dziala mnoznik za cale slowa
        if x2==1:
            score=score*2
        if x3==1:
            score=score*3
        return score

    def checkWordOnBoard(self,pos,direction,word):
        l = len(word)
        if direction=='vertical':
            if pos[0]!=0:
                if self.board[pos[0]-1][pos[1]]!='':
                    return False
        else:
            if pos[1]!=0:
                if self.board[pos[0]][pos[1]-1]!='':
                    return False
        if direction == 'vertical':
            if pos[0] != 14:
                if self.board[pos[0] + l][pos[1]] != '' or pos[0] + l > 14:
                    return False
        else:
            if pos[1] != 14:
                if self.board[pos[0]][pos[1] + l] != '' or pos[1] + l > 14:
                    return False
        return True

    def checkIntegrity(self,word,pos,direction, game):
        temp=''
        if direction=='vertical':
            i = pos[0]
            for a in word:
                temp = ''
                if self.board[i][pos[1]-1]!='' and pos[1]-1>=0:
                    temp=self.getExistingWord((i,pos[1]),'left')
                temp+=self.board[i][pos[1]]
                if self.board[i][pos[1]+1]!='' and pos[1]+1<=14:
                    temp += self.getExistingWord((i, pos[1]), 'right')
                if len(temp)>1:
                    flag = game.checkWord(temp)
                    if not flag:
                        print(temp)
                        return False
                i=i+1
        else:
            i = pos[1]
            for a in word:
                temp = ''
                if self.board[pos[0]-1][i]!='' and pos[0]-1>=0:
                    temp=self.getExistingWord((pos[0],i),'up')
                    temp+=self.board[i][pos[1]]
                if self.board[pos[0]+1][i]!='' and pos[0]+1<=14:
                    temp += self.getExistingWord((pos[0],i), 'down')
                if len(temp) > 1:
                    flag = game.checkWord(temp)
                    if not flag:
                        print(temp)
                        return False
                i=i+1
        return True
    def getExistingWord(self,pos,direction):
        i = 0
        s = ''
        if direction=='left':
            while self.board[pos[0]][pos[1]-i-1]!='' and pos[1]-i-1>=0:
                i=i+1
            while i>0:
                s=s+self.board[pos[0]][pos[1]-i]
                i=i-1
            return s
        elif direction=='right':
            while self.board[pos[0]][pos[1]+i+1]!='' and pos[1]+i+1<=14:
                i=i+1
            j=1
            while j<=i:
                s=s+self.board[pos[0]][pos[1]+j]
                j=j+1
            return s
        elif direction=='up':
            while self.board[pos[0]-1-i][pos[1]]!='' and pos[0]-i-1>=0:
                i=i+1
            while i>0:
                s=s+self.board[pos[0]-i][pos[1]]
                i=i-1
            return s
        else:
            while self.board[pos[0]+1+i][pos[1]]!='' and pos[0]+i+1<=14:
                i=i+1
            j = 1
            while j <= i:
                s = s + self.board[pos[0]+j][pos[1]]
                j = j + 1
            return s

    def getNewLetters(self,pos,word,direction):
        l=len(word)
        already_on_board=0
        list = []
        i=0
        if direction=='vertical':
            i=pos[0]
            for a in word:
                if self.board[i][pos[1]]==a:
                    already_on_board=already_on_board+1
                elif self.board[i][pos[1]]!='':
                    return None
                else:
                    list.append(a)
                i=i+1
            if l==already_on_board:
                return None
            if already_on_board==0 and self.board_empty==False:
                return None
        else:
            i=pos[1]
            for a in word:
                if self.board[pos[0]][i]==a:
                    already_on_board=already_on_board+1
                elif self.board[pos[0]][i]!='':
                    return None
                else:
                    list.append(a)
                i=i+1
            if l==already_on_board:
                return None
            if already_on_board==0  and self.board_empty==False:
                return None
        return list
    
    def firstWord(self, pos, word, direction):
        if self.board_empty==False:
            return True
        if direction=='vertical':
            if pos[1]!=7:
                return False
            if pos[0]>7:
                return False
            if pos[0]+len(word)<7:
                 return False
        else:
            if pos[0]!=7:
                return False
            if pos[1]>7:
                return False
            if pos[1]+len(word)<7:
                 return False
        self.board_empty=False
        return True