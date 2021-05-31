import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../__app/constants';
import { routes } from '../__app/routes';

export class GameStore {
  socketHandler = null;
  playerName = '';
  parent = null;
  playersInLobby = null;
  MAX_RECONNECTION_ATTEMPTS = 3;
  currentReconnetionAttempts = 0;

  constructor(parent) {
    makeAutoObservable(this);
    this.parent = parent;
  }

  initConnection = (playerName) => {
    this.playerName = playerName;
    this.socketHandler = io(SERVER_URL, {
      query: { name: playerName },
      reconnectionAttempts: this.MAX_RECONNECTION_ATTEMPTS,
    });
    this.socketHandler.on('lobby', this.lobbyHandler);
    this.socketHandler.on('connect', this.afterConnectHandler);
    this.socketHandler.on('connect_error', this.afterDisconnectHandler);
  };

  afterConnectHandler = () => {
    if (this.currentReconnetionAttempts === 0)
      this.parent.routerStore.push(routes.lobby);

    this.currentReconnetionAttempts = 0;
  };

  lobbyHandler = (msg) => {
    console.log(msg);
    this.playersInLobby = msg;
  };

  afterDisconnectHandler = (msg) => {
    console.log(msg);
    this.currentReconnetionAttempts += 1;
    if (this.currentReconnetionAttempts === this.MAX_RECONNECTION_ATTEMPTS) {
      if (this.socketHandler) this.socketHandler.close();
      this.clearStore();
      this.parent.routerStore.push(routes.root);
      this.parent.toast({
        title: "Połączenie z serwerem zostało przerwane",
        description: "Nie udało się połączyć ponownie.",
        status: "error",
        duration: 8000,
        isClosable: true,
      })
    }
  };

  clearStore = () => {
    this.socketHandler = null;
    this.playersInLobby = null;
    this.playerName = '';
    this.currentReconnetionAttempts = 0;
  };
}
