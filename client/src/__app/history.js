import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

export const routerStore = new RouterStore();
const browserHistory = createBrowserHistory();

export const history = syncHistoryWithStore(browserHistory, routerStore);
