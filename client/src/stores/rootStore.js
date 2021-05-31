import { routerStore } from '../__app/history';
import { GameStore } from './gameStore';
import { createStandaloneToast } from "@chakra-ui/react"

export class RootStore {
  routerStore
  gameStore
  toast

  constructor() {
    this.toast = createStandaloneToast();
    this.gameStore = new GameStore(this);
    this.routerStore = routerStore
  }
}
