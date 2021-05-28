import { makeAutoObservable } from 'mobx';

export class GameStore {
  test = 'ala ma kota';

  constructor() {
    makeAutoObservable(this);
  }
}
