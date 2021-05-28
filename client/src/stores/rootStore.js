import { routerStore } from '../__app/history';
import { GameStore } from './gameStore';

export class RootStore {
  routerStore
  gameStore

  constructor() {
    this.gameStore = new GameStore(this);
    this.routerStore = routerStore
  }
}
