import { makeAutoObservable, runInAction } from 'mobx';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../__app/constants';
import { routes } from '../__app/routes';
import { LS_ID } from '../__app/constants';
import { matchPath } from 'react-router-dom';
import { fieldsData } from '../__app/constants';

export class GameStore {
  socketHandler = null;
  playerName = '';
  parent = null;
  playersInLobby = null;
  playersScoreboard = [];
  playersLetters = [];
  mergedTilesArray = fieldsData;
  focusedTile = null;
  currentPlayerTurn = [];
  timeForTurn = 0;
  intervalHandler = null;
  direction = 'horizontal';
  isErrorModalOpen = false;
  modalTimeoutHandler = null;
  errorModalContent = '';
  wordEnterValue = '';
  finalScoreboard = null;

  constructor(parent) {
    makeAutoObservable(this);
    this.parent = parent;
  }

  setDirection = (dir) => {
    this.direction = dir;
  };

  setWordEnterValue = (value) => {
    this.wordEnterValue = value;
  };

  initConnection = (playerName) => {
    this.playerName = playerName;
    const id = localStorage.getItem(LS_ID);
    this.socketHandler = io(SERVER_URL, {
      query: {
        name: playerName,
        ...(id ? { id } : {}),
      },
      reconnection: false,
    });
    this.socketHandler.on('conn', this.afterConnectHandler);
    this.socketHandler.on('lobby', this.lobbyHandler);
    this.socketHandler.on('game_status', this.handleGameStatus);
    this.socketHandler.on('disconnect', this.afterDisconnectHandler);
    this.socketHandler.on('board_update', this.boardUpdate);
    this.socketHandler.on('letter_update', this.letterUpdate);
    this.socketHandler.on('scoreboard', this.scoreboardHandler);
    this.socketHandler.on('wrong_word', this.errorHandler);
  };

  boardUpdate = (msg) => {
    console.log('board_update', msg);
    this.currentPlayerTurn = msg.turn;
    this.unFocusTile();
    this.setWordEnterValue('');
    this.playersScoreboard = msg.score;
    this.timeForTurn = msg.timeForTurn;
    this.refreshBoard(msg.board);
    this.runTimer();
  };

  manuallyCloseModal = () => {
    clearTimeout(this.modalTimeoutHandler);
    this.isErrorModalOpen = false;
  };

  errorHandler = (msg) => {
    console.log('wrong_word', msg);
    if (this.modalTimeoutHandler) clearTimeout(this.modalTimeoutHandler);
    this.errorModalContent = msg.data;
    this.isErrorModalOpen = true;

    this.modalTimeoutHandler = setTimeout(() => {
      runInAction(() => {
        this.isErrorModalOpen = false;
      });
    }, 2000);
  };

  refreshBoard = (board) => {
    board.forEach((row, y) => {
      row.forEach((field, x) => {
        if (field) {
          runInAction(() => {
            this.mergedTilesArray[y][x] = {
              ...this.mergedTilesArray[y][x],
              letter: field.toLowerCase(),
            };
          });
        }
      });
    });
  };

  letterUpdate = (msg) => {
    console.log('letter_update', msg);
    this.playersLetters = msg.current;
  };

  scoreboardHandler = (msg) => {
    console.log('scoreboard', msg);
    this.finalScoreboard = msg.score;
    this.socketHandler.close();
  };

  runTimer = async () => {
    clearInterval(this.intervalHandler);
    if (this.timeForTurn !== 0) {
      this.intervalHandler = setInterval(() => {
        runInAction(() => {
          if (this.timeForTurn) this.timeForTurn -= 1;
        });
      }, 1000);
    }
  };

  afterConnectHandler = ({ conn, id, skipToGame }) => {
    console.log('conn', this.socketHandler);
    if (conn) {
      localStorage.setItem(LS_ID, id);
      if (skipToGame) {
        this.switchToGame();
        return;
      }
      this.parent.routerStore.push(routes.lobby);
      return;
    }

    this.socketHandler?.close();
    this.parent.toast({
      title: 'Maksymalna liczba graczy',
      status: 'error',
      duration: 8000,
      isClosable: true,
    });
  };

  lobbyHandler = (msg) => {
    console.log(msg);
    this.playersInLobby = msg;
  };

  afterDisconnectHandler = () => {
    console.log('dc');
    if(!this.finalScoreboard?.length) {
      this.socketHandler?.close();
      this.clearStore();
      this.parent.routerStore.push(routes.root);
      this.parent.toast({
        title: 'Połączenie z serwerem zostało przerwane',
        description: 'Nie udało się połączyć ponownie. Spróbuj dołączyć ponownie',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  };

  handleGameStatus = (msg) => {
    if (msg.status === 'start') {
      this.switchToGame();
    } else {
      this.parent.routerStore.push(routes.end);
    }
  };

  switchToGame = () => {
    if (
      !matchPath(this.parent.routerStore.location.pathname, {
        path: routes.game,
        exact: true,
      })
    )
      this.parent.routerStore.push(routes.game);
  };

  handleTileClick = (coords) => {
    const [, nextPlayerId] = this.currentPlayerTurn;
    if (this.socketHandler?.id !== nextPlayerId) {
      this.unFocusTile();
      return;
    }

    if (coords.x === this.focusedTile?.x && coords.y === this.focusedTile?.y) {
      this.focusedTile = null;
      return;
    }
    this.focusedTile = coords;
  };

  unFocusTile = () => {
    this.focusedTile = null;
  };

  sendWord = () => {
    if (!this.focusedTile || !this.wordEnterValue) return;
    const reqBody = {
      word: this.wordEnterValue.trim().toLowerCase(),
      direction: this.direction,
      pos: [this.focusedTile.y, this.focusedTile.x],
    };

    this.socketHandler.emit('send_word', reqBody);
    console.log('send_word', reqBody);
  };

  clearStore = () => {
    this.socketHandler = null;
    this.playersInLobby = null;
    this.playerName = '';
    this.playersScoreboard = [];
    this.playersLetters = [];
    this.mergedTilesArray = fieldsData;
    this.focusedTile = null;
    this.currentPlayerTurn = [];
    this.timeForTurn = 0;
    this.finalScoreboard = null;
    clearInterval(this.intervalHandler);
  };
}
