import { makeAutoObservable } from 'mobx';
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
  playersLetters = ['k', 'l', 'k', 'l', 'k', 'l', 'w'];
  mergedTilesArray = fieldsData;
  focusedTile = null;

  constructor(parent) {
    makeAutoObservable(this);
    this.parent = parent;
  }

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
  };

  boardUpdate = (msg) => {
    console.log('board_update', msg);
  };

  letterUpdate = (msg) => {
    console.log('letter_update', msg);
    this.playersLetters = msg.current;
  };

  scoreboardHandler = (msg) => {
    console.log('scoreboard', msg);
  };

  afterConnectHandler = ({ conn, id, skipToGame }) => {
    console.log(id);
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
  };

  handleGameStatus = (msg) => {
    if (msg.status === 'start') {
      this.switchToGame();
    } else {
      // end game show scoreboard
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
    if (coords.x === this.focusedTile?.x && coords.y === this.focusedTile?.y) {
      this.focusedTile = null;
      return;
    }
    this.focusedTile = coords;
  };

  clearStore = () => {
    this.socketHandler = null;
    this.playersInLobby = null;
    this.playerName = '';
    this.playersScoreboard = [];
    this.playersLetters = [];
  };
}
