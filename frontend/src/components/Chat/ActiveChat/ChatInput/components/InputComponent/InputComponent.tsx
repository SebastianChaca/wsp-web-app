import { Input, GridItem } from '@chakra-ui/react';
import React, {
  forwardRef,
  Ref,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';

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
      <GridItem>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Escribe un mensaje aquí"
            ref={ref}
            variant="unstyled"
            bg="#E2E8F0"
            p="8px"
            value={message}
            onChange={handleChange}
          />
        </form>
      </GridItem>
    );
  }
);
InputComponent.displayName = 'chat input';
export default InputComponent;
