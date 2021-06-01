import React from 'react';
import {Box} from '@chakra-ui/react';

const BoardTile = ({value}) => {
    return ( 
        <Box w="50px" h="50px" bg="pink" border="1px">
            <p>{value}</p>
        </Box>
    );
}
 
export default BoardTile;