import {
  Grid,
  Input,
  FormControl,
  FormLabel,
  Button,
  Container,
} from '@chakra-ui/react';
import { useState } from 'react';
import BoardField from '../../components/BoardField';
import { Text } from '@chakra-ui/react';
import { fieldsData } from './filedsData';

const GamePage = () => {
  return (
    <Container centerContent>
      <Text fontSize="6xl" fontFamily="fantasy">
        No to zaczynamy !!!
      </Text>
      <Grid marginTop="100px" marginBottom="200px">
        <Grid
          templateColumns="repeat(15, 1fr)"
          templateRows="repeat(15,0fr)"
          bg="grey"
          gap={0}
        >
          {fieldsData.map((row, idx) =>
            row.map((item, idx2) => (
              <BoardField
                key={`${idx}+${idx2}`}
                type={'normalField'}
                text={item}
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
