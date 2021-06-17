import { StoreProvider } from './stores';
import { Router, Switch, Route } from 'react-router-dom';
import { routes } from './__app/routes';
import { ChakraProvider } from '@chakra-ui/react'
import { history } from './__app/history';
import { theme } from './__app/theme';
import GlobalStyles from './__app/globalStyles';

import MainPage from './pages/RootPage';
import GamePage from './pages/GamePage';
import Lobby from './pages/Lobby';
import EndPage from './pages/EndPage';

const App = () => {
  return (
    <StoreProvider>
      <ChakraProvider theme={theme}>
        <GlobalStyles />
        <Router history={history}>
          <Switch>
            <Route exact path={routes.root} component={MainPage} />
            <Route exact path={routes.game} component={GamePage} />
            <Route exact path={routes.lobby} component={Lobby} />
            <Route exact path={routes.end} component={EndPage} />
          </Switch>
        </Router>
      </ChakraProvider>
    </StoreProvider>
  );
};

export default App;
