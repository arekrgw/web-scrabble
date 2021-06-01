import { SimpleGrid ,Grid, Box, GridItem, Input, FormControl, FormLabel, Button, Container } from '@chakra-ui/react';
import { useState } from 'react';
import BoardTile from '../../components/BoardTile';
import {fieldsData} from './filedsData'

const GamePage = () => {
  
  return (
    <Container centerContent>
    <Grid marginTop="200px"
    h="750px"
    w="750px"
    >
      <Grid templateColumns="repeat(15, 0fr)" templateRows="repeat(15,0fr)" bg="grey" gap={0}>
      {fieldsData.map(field => (
        console.log(field),
        <BoardTile key={field} value={field}/>
      ))}
      </Grid>
    </Grid>
    </Container>

  );
};

export default GamePage;
