class Board():
    def __init__(self):
        self.board = [[" " for i in range(16)] for j in range(16)]
        self.board_check=[[" " for i in range(15)] for j in range(15)]
        for i in range(1,16):
            self.board[0][i]=i
        i=1
        for A in range(ord('A'),ord('O')+1):
            self.board[i][0]=chr(A)
            i=i+1

        self.add_premium_squares()


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
            self.board_check[coordinate[0]][coordinate[1]] = "TWS"
        for coordinate in TRIPLE_LETTER_SCORE:
            self.board_check[coordinate[0]][coordinate[1]] = "TLS"
        for coordinate in DOUBLE_WORD_SCORE:
            self.board_check[coordinate[0]][coordinate[1]] = "DWS"
        for coordinate in DOUBLE_LETTER_SCORE:
            self.board_check[coordinate[0]][coordinate[1]] = "DLS"

    def getBoard(self):
        res=[ y for x in self.board for y in x]
        ','.join(map(str, res))

