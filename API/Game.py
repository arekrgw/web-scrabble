# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import random
from compare import cmp
from constants import ENDGAME


class Game:
    if not ENDGAME:
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
    else:
        game_letters = {
            "a": 1,
            "ą": 0,
            "b": 1,
            "c": 1,
            "ć": 0,
            "d": 1,
            "e": 1,
            "ę": 0,
            "f": 1,
            "g": 0,
            "h": 0,
            "i": 0,
            "j": 0,
            "k": 0,
            "l": 0,
            "ł": 0,
            "m": 0,
            "n": 0,
            "ń": 0,
            "o": 0,
            "ó": 0,
            "p": 0,
            "r": 0,
            "s": 0,
            "ś": 0,
            "t": 0,
            "u": 0,
            "w": 0,
            "y": 0,
            "z": 0,
            "ź": 0,
            "ż": 0,
        }

    def __init__(self):
        file = open("slownik.txt", "r", encoding='utf8')
        self.dictionary = file.readlines()
        self.game_status = False
        self.connected_player = 0

    def bs(self, element, low, high, arr):
        mid = int((low + high) / 2)
        word = arr[mid].strip()
        if low <= high:
            if element == word:
                return True

            elif cmp(element, word) > 0:
                return self.bs(element, mid + 1, high, arr)

            else:
                return self.bs(element, low, mid - 1, arr)

        else:
            return False

    def checkWord(self, element):
        return self.bs(element.strip().lower(), 0, len(self.dictionary) - 1, self.dictionary)

    def checkPos(self, pos, word, direction):
        l = len(word)
        y = pos[0]
        x = pos[1]
        if direction == 'vertical':
            if pos[0] + l > 15:
                return False
        else:
            if pos[1] + l > 15:
                return False
        return True

    def getConnected_players(self):
        return self.connected_player

    def Connected_player(self):
        self.connected_player = self.connected_player + 1

    def DisconnectPlayer(self):
        self.connected_player = self.connected_player - 1

    def setGameStart(self):
        self.game_status = True

    def setGameEnd(self):
        self.game_status = False

    def getGameStatus(self):
        return self.game_status

    def isLetterAvilable(self, key):
        if self.game_letters[key] == 0:
            return False
        return True

    def displayLettersAmount(self):
        # for debuging purposes
        for key, value in self.game_letters.items():
            print(key, " ", value)

    def decreaseLetter(self, key):
        self.game_letters[key] -= 1

    def increaseLetter(self, key):
        self.game_letters[key] += 1

    def generateRandomLetter(self):
        if not self.checkLetterPoolEmpty():
            weighted_list = []
            for k in self.game_letters:
                for x in range(self.game_letters[k]):
                    weighted_list.append(k)
            letter = random.choice(weighted_list)
            self.decreaseLetter(letter)
            return letter
        else:
            return None

    def checkLetterPoolEmpty(self):
        for k in self.game_letters:
            if self.game_letters[k] != 0:
                return False
        return True
