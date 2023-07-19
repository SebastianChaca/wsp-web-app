import { FC } from 'react';
import { Box, GridItem } from '@chakra-ui/react';
import { useAppSelector } from '../../../../../../redux/hooks';
import { ResponseTo } from '../../../../../Ui';

const ResponseToMessage: FC = () => {
  const activeChat = useAppSelector((state) => state.activeChatSlice);
  if (activeChat?.responseTo) {
    return (
      <>
        <GridItem marginBottom="20px">
          <ResponseTo.Container>
            <Box>
              <ResponseTo.Decoration />
              <ResponseTo.Message message={activeChat.responseTo} />
            </Box>
          </ResponseTo.Container>
        </GridItem>

        <GridItem
          justifyContent="center"
          alignItems="center"
          display="flex"
          marginBottom="20px"
        >
          <ResponseTo.CloseButton />
        </GridItem>
      </>
    );
  }
  return null;
};

export default ResponseToMessage;
