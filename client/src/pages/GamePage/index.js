import { Grid, Container } from '@chakra-ui/react';
import BoardField from '../../components/BoardField';
import { useStore } from '../../stores';

const GamePage = () => {
  const {
    gameStore: { mergedTilesArray },
  } = useStore();

  console.log(mergedTilesArray);
  return (
    <Container centerContent maxH="100vh">
      <Grid>
        <Grid
          templateColumns="repeat(15, 1fr)"
          templateRows="repeat(15, 1fr)"
          gap="2px"
        >
          {mergedTilesArray.map((row, y) =>
            row.map((tile, x) => (
              <BoardField
                key={`${x}+${y}`}
                coords={{ x, y }}
                tile={tile}
                onClick={(coords) => console.log(coords)}
              />
            )),
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GamePage;
