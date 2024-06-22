import { ChangeEventHandler, FormEventHandler, forwardRef } from 'react';
import { Box, Input } from '@chakra-ui/react';

type InputProps = {
  message: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};
const ShowImageModalInput = forwardRef<HTMLInputElement, InputProps>(
  ({ message, handleChange, handleSubmit }: InputProps, ref) => {
    return (
      <Box w="80%" marginTop="20px">
        <form onSubmit={handleSubmit}>
          <Input
            ref={ref}
            borderColor="black"
            border="1px"
            bg="white"
            autoFocus
            value={message}
            onChange={handleChange}
          />
        </form>
      </Box>
    );
  }
);

export default ShowImageModalInput;

ShowImageModalInput.displayName = 'ShowImageModalInput';
