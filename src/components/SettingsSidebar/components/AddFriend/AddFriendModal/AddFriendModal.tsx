import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import * as Yup from 'yup';

import ModalForm from './components/ModalForm';
import { useAppDispatch } from '../../../../../redux/hooks';
import { addFriendRequest } from '../../../../../services/friends/addFriends';
import {
  addFierndToList,
  setFriendId,
} from '../../../../../redux/friends/friendsSlice';

interface Props {
  isOpen: boolean;
  onClose(): void;
}
interface initial {
  email: string | null;
}
const AddFriendModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsloading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required(),
  });
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const initialValue: initial = {
    email: '',
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="700px" p="20px" h="275px">
        <ModalHeader>Add a Friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValue}
            onSubmit={async (values) => {
              if (ref.current) {
                ref.current.blur();
              }
              try {
                setIsloading(true);
                setError(null);
                if (values.email) {
                  // TODO: usar la funcion thunk y sacar esta ?
                  const friend = await addFriendRequest({
                    email: values.email,
                  });

                  // pongo al amigo agregado  primero en la lista de amigos
                  dispatch(addFierndToList(friend));

                  if (friend.user.id) {
                    dispatch(setFriendId(friend.user.id));
                  }

                  onClose();
                  // TODO: cuando seteo el active chat no me hace focus en el input
                }
              } catch (errorMsg) {
                setError(JSON.stringify(errorMsg));
              } finally {
                setIsloading(false);
              }
            }}
            validationSchema={validationSchema}
          >
            {({ values }) => (
              <ModalForm isValid={values.email} isLoading={isLoading} />
            )}
          </Formik>
          {error && error}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
