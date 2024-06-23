import { Input, FormControl, Box } from '@chakra-ui/react';
import { forwardRef, Ref, ChangeEventHandler, FormEventHandler } from 'react';

type InputProps = {
  message: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

const InputComponent = forwardRef(
  (
    { message, handleChange, handleSubmit }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <Box w="100%">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Input
              id="inputChat"
              ref={ref}
              variant="unstyled"
              bg="#E2E8F0"
              p="8px"
              value={message}
              onChange={handleChange}
              type="text"
            />
          </FormControl>
        </form>
      </Box>
    );
  }
);
InputComponent.displayName = 'chat input';
export default InputComponent;
