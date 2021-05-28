import { useStore } from '../../stores';
import { routes } from '../../__app/routes';
import { StyledH1 } from './style';
import { stores } from '../../stores';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

setTimeout(() => {
  runInAction(() => {
    stores.gameStore.test = 'kot ma ale';
  });
}, 5000);

const MainPage = () => {
  const { routerStore, gameStore } = useStore();
  return (
    <>
      <StyledH1>Main page {gameStore.test}</StyledH1>
      <button onClick={() => routerStore.push(routes.game)}>Go to game</button>
    </>
  );
};

export default observer(MainPage);
