import { ChangeEventHandler, FormEventHandler, forwardRef } from 'react';
import { Box, Input, IconButton, Flex } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';

type InputProps = {
  message: string;
  handleSubmit: FormEventHandler<HTMLFormElement | HTMLButtonElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isLoading: boolean;
};
const ShowImageModalInput = forwardRef<HTMLInputElement, InputProps>(
  ({ message, handleChange, handleSubmit, isLoading }: InputProps, ref) => {
    return (
      <Box w="70%" marginTop="20px">
        <form onSubmit={handleSubmit}>
          <Flex>
            <Input
              ref={ref}
              borderColor="black"
              border="1px"
              bg="white"
              autoFocus
              value={message}
              onChange={handleChange}
              marginRight="10px"
            />
            <IconButton
              icon={<IoMdSend />}
              aria-label="Submit"
              isLoading={isLoading}
              onClick={handleSubmit}
            />
          </Flex>
        </form>
      </Box>
    );
  }
);

export default ShowImageModalInput;

ShowImageModalInput.displayName = 'ShowImageModalInput';
