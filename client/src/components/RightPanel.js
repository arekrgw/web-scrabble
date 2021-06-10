import { Text, Flex, Tag, Box } from '@chakra-ui/react';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';

const RightPanel = () => {
  const {
    gameStore: { playersScoreboard },
  } = useStore();

  return (
    <Flex
      p="10px"
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between"
      h="100%"
    >
      <Box>
        <Text fontSize="3xl" fontWeight="bold">
          Tablica wyników
        </Text>

        {playersScoreboard
          .slice()
          .sort((a, b) => a[1] - b[1])
          .map((plr, idx) => (
            <Flex justifyContent="center" key={plr[0]}>
              <Text fontSize="2xl" fontWeight="bold">
                {idx + 1}.&nbsp;
              </Text>
              <Text fontSize="2xl">
                {plr[0]} {plr[1]} pkt.
              </Text>
            </Flex>
          ))}
      </Box>
      <Flex flexWrap="wrap" justifyContent="center">
        <Tag background="#F5C134" mr="5px" p="2" mb="5px">
          Podwójna premia słowna
        </Tag>
        <Tag background="#ff4d4d" mr="5px" p="2" mb="5px">
          Potrójna premia słowna
        </Tag>
        <Tag background="#347AF5" mr="5px" p="2" mb="5px">
          Potrójna premia literowa
        </Tag>
        <Tag background="#6DA3F5" p="2" mb="5px">
          Podwójna premia literowa
        </Tag>
      </Flex>
    </Flex>
  );
};

export default observer(RightPanel);
