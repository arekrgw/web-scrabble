import { StoreProvider } from './stores';
import { Router, Switch, Route } from 'react-router-dom';
import { routes } from './__app/routes';
import { ThemeProvider } from '@emotion/react';
import { history } from './__app/history';

import MainPage from './pages/RootPage';
import GamePage from './pages/GamePage';
import { theme } from './__app/theme';
import GlobalStyles from './__app/globalStyles';

const App = () => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router history={history}>
          <Switch>
            <Route exact path={routes.root} component={MainPage} />
            <Route exact path={routes.game} component={GamePage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
