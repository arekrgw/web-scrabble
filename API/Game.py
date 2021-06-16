# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import random

class Game():
    game_letters = {
        "a": 9,
        "ą": 1,
        "b": 2,
        "c": 3,
        "ć": 1,
        "d": 3,
        "e": 7,
        "ę": 1,
        "f": 1,
        "g": 2,
        "h": 2,
        "i": 8,
        "j": 2,
        "k": 3,
        "l": 3,
        "ł": 2,
        "m": 3,
        "n": 5,
        "ń": 1,
        "o": 6,
        "ó": 1,
        "p": 3,
        "r": 4,
        "s": 4,
        "ś": 1,
        "t": 3,
        "u": 2,
        "w": 4,
        "y": 4,
        "z": 5,
        "ź": 1,
        "ż": 1,
    }

    def __init__(self):
        file = open("slownik.txt", "r", encoding='utf8')
        self.dictionary = file.readlines()
        self.game_status=False
        self.connected_player=0

    def checkWord(self, toCheck):
        for i in self.dictionary:
            i = i.strip()
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

    def isLetterAvilable(self, key):
        if self.game_letters[key] == 0:
            return False
        return True

    def displayLettersAmount(self):
        #for debuging purposes
        for key, value in self.game_letters.items():
            print(key, " ", value)

    def decreaseLetter(self, key):
        self.game_letters[key] -= 1

    def increaseLetter(self, key):
        self.game_letters[key] += 1

    def generateRandomLetter(self):
        weighted_list = []
        for k in self.game_letters:
            for x in range(self.game_letters[k]):
                weighted_list.append(k)
        letter = random.choice(weighted_list)
        self.decreaseLetter(letter)
        return letter

