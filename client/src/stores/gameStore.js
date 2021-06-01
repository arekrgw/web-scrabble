import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';
import { SERVER_URL } from '../__app/constants';
import { routes } from '../__app/routes';
import { LS_ID } from '../__app/constants';

export class GameStore {
  socketHandler = null;
  playerName = '';
  parent = null;
  playersInLobby = null;

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
    this.socketHandler.on('lobby', this.lobbyHandler);
    this.socketHandler.on('conn', this.afterConnectHandler);
    this.socketHandler.on('disconnect', this.afterDisconnectHandler);
  };

  afterConnectHandler = ({ conn, id, skipToGame }) => {
    if (conn) {
      localStorage.setItem(LS_ID, id);
      if (skipToGame) {
        // something
        console.log('go to game');
        return
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

  afterDisconnectHandler = (msg) => {
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

  clearStore = () => {
    this.socketHandler = null;
    this.playersInLobby = null;
    this.playerName = '';
  };
}
