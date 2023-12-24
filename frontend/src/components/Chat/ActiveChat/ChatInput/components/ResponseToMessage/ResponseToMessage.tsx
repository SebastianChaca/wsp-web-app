import { FC } from 'react';
import { Box, GridItem, SlideFade } from '@chakra-ui/react';
import { useAppSelector } from '../../../../../../redux/hooks';
import { ResponseTo } from '../../../../../Ui';

const ResponseToMessage: FC = () => {
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  if (activeChat?.responseTo?.nameTo && activeChat?.responseTo?.message) {
    return (
      <>
        <GridItem marginBottom="20px">
          <SlideFade
            in={!!activeChat?.responseTo?.message}
            offsetY="40px"
            unmountOnExit
          >
            <ResponseTo.Container>
              <Box>
                <ResponseTo.Decoration />
                <ResponseTo.Message
                  nameTo={activeChat.responseTo.nameTo}
                  message={activeChat.responseTo.message}
                />
              </Box>
            </ResponseTo.Container>
          </SlideFade>
        </GridItem>

        <GridItem
          justifyContent="center"
          alignItems="center"
          display="flex"
          marginBottom="20px"
        >
          <SlideFade in={!!activeChat?.responseTo?.message} offsetY="40px">
            <ResponseTo.CloseButton />
          </SlideFade>
        </GridItem>
      </>
    );
  }
  return null;
};

export default ResponseToMessage;
