import { useStore } from '../../stores';
import { useState } from 'react';
import { routes } from '../../__app/routes';
import { StyledH1 } from './style';
import { observer } from 'mobx-react-lite';

const MainPage = () => {
  const [playerName, setPlayerName] = useState('');
  const { routerStore, gameStore } = useStore();

  return (
    <>
      <StyledH1>Scrabble!</StyledH1>
      {gameStore.sid && <p>{gameStore.sid}</p>}
      <input type="text" value={playerName} onChange={(ev) => setPlayerName(ev.target.value)} />
      <button disabled={!playerName.length} onClick={() => gameStore.initConnection(playerName)}>Dołącz do pokoju</button>
    </>
  );
};

export default observer(MainPage);
