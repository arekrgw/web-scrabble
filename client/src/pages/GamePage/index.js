import {
  Grid,
  Container,
} from '@chakra-ui/react';
import BoardField from '../../components/BoardField';
import { fieldsData } from './fieldsData';

const GamePage = () => {
  return (
    <Container centerContent maxH="100vh">
      <Grid>
        <Grid templateColumns="repeat(15, 1fr)" templateRows="repeat(15, 1fr)" gap="2px">
          {fieldsData.map((row, idx) =>
            row.map((item, idx2) => (
              <BoardField
                key={`${idx}+${idx2}`}
                type={'normalField'}
                text={item}
                sx={{ cursor: 'pointer' }}
                premium={
                  item === 'POTRÓJNA PREMIA SŁOWNA'
                    ? 'TWS'
                    : item === 'PODWÓJNA PREMIA SŁOWNA'
                    ? 'DWS'
                    : item === 'PODWÓJNA PREMIA LITEROWA'
                    ? 'DLS'
                    : item === 'POTRÓJNA PREMIA LITEROWA'
                    ? 'TLS'
                    : null
                }
              />
            )),
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GamePage;
