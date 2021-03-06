import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  AlertDialogBody,
  Button,
  AlertDialogFooter,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import BoardField from '../../components/BoardField';
import { useStore } from '../../stores';
import { useWindowHeight } from '@react-hook/window-size';
import BottomSheet from '../../components/BottomSheet';
import RightPanel from '../../components/RightPanel';
import LeftPanel from '../../components/LeftPanel';
import { observer } from 'mobx-react-lite';

const GamePage = () => {
  const {
    gameStore: {
      mergedTilesArray,
      handleTileClick,
      isErrorModalOpen,
      errorModalContent,
      manuallyCloseModal,
    },
  } = useStore();
  const height = useWindowHeight();
  const boxSize = `calc((100vh - ${height * 0.2}px - 48px) / 15)`;
  return (
    <>
      <AlertDialog
        isOpen={isErrorModalOpen}
        isCentered
        onClose={manuallyCloseModal}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Błąd ruchu</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{errorModalContent}</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={manuallyCloseModal}>OK</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Grid
        templateColumns="15% min-content 1fr"
        templateRows="auto 1fr"
        w="100%"
        h="100vh"
      >
        <GridItem
          colStart="2"
          colSpan="1"
          rowStart="1"
          rowSpan="1"
          display="flex"
          justifyContent="center"
          p="10px"
        >
          <Grid
            templateColumns={`repeat(15, ${boxSize})`}
            templateRows={`repeat(15, ${boxSize})`}
            gap="2px"
          >
            {mergedTilesArray.map((row, y) =>
              row.map((tile, x) => (
                <BoardField
                  key={`${x}+${y}`}
                  coords={{ x, y }}
                  tile={tile}
                  responsiveBox={boxSize}
                  onClick={handleTileClick}
                />
              )),
            )}
          </Grid>
        </GridItem>

        <GridItem colStart="1" colSpan="1" rowStart="1" rowSpan="1">
          <LeftPanel />
        </GridItem>
        <GridItem colStart="3" colSpan="1" rowStart="1" rowSpan="1">
          <RightPanel />
        </GridItem>
        <GridItem rowStart="2" rowSpan="1" colStart="1" colSpan="3">
          <BottomSheet />
        </GridItem>
      </Grid>
    </>
  );
};

export default observer(GamePage);
