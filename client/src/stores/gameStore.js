import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../__app/constants';
import { routes } from '../__app/routes';

export class GameStore {
  socketHandler = null;
  playerName = '';
  sid = null;
  parent = null;

  constructor(parent) {
    makeAutoObservable(this);
    this.parent = parent;
  }

  initConnection = (playerName) => {
    this.playerName = playerName;
    this.socketHandler = io(SERVER_URL, { query: { name: playerName } });
    this.socketHandler.on('lobby', this.lobbyHandler);
    this.socketHandler.on('connect', this.afterConnectHandler);
  };

  afterConnectHandler = () => {
    this.sid = this.socketHandler.id;
    this.parent.routerStore.push(routes.lobby);
  };

  lobbyHandler = (msg) => {
    console.log(msg);
  };

  clearStore = () => {};
}
