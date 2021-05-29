import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client'
import { SERVER_URL } from '../__app/constats';

export class GameStore {
  socketHandler = null;
  sid = null;

  constructor() {
    makeAutoObservable(this);
  }

  initConnection = (playerName) => {
    this.socketHandler = io(SERVER_URL, { query: { name: playerName } });
    this.socketHandler.on('after connect', this.afterConnectHandler);
  }

  afterConnectHandler = (msg) => {
    console.log(msg)
    this.sid = msg.data;
  }

  clearStore = () => {

  }
}
