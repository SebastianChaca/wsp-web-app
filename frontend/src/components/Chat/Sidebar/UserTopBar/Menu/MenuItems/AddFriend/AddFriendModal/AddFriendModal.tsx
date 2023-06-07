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
import { useAppDispatch } from '../../../../../../../../redux/hooks';
import { addFriendd } from '../../../../../../../../services/friends/addFriends';
import {
  addFierndToList,
  setActiveChat,
} from '../../../../../../../../redux/chat/chatSlice';
import ModalForm from './components/ModalForm';

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
    email: Yup.string().email('Invalid email').required('Required').nullable(),
  });
  useEffect(() => {
    if (ref.current) {
      ref.current.focus({ preventScroll: true });
    }
  }, []);
  const initialValue: initial = {
    email: null,
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={ref}>
      <ModalOverlay />
      <ModalContent w="700px" p="20px">
        <ModalHeader>Add a Friend</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            validateOnMount={false}
            initialValues={initialValue}
            onSubmit={async (values) => {
              try {
                setIsloading(true);
                setError(null);
                if (values.email) {
                  const friend = await addFriendd({ email: values.email });
                  const { name, email, uid, online, lastActive } = friend.user;
                  // pongo al amigo agregado  primero en la lista de amigos
                  dispatch(addFierndToList(friend));
                  onClose();
                  // TODO: cuando seteo el active chat no me hace focus en el input
                  dispatch(
                    setActiveChat({
                      uid,
                      name,
                      online,
                      email,
                      isTyping: false, // TODO: revisar porque no es opcional
                      lastActive,
                      status: friend.status,
                    })
                  );
                }
              } catch (errorMsg) {
                setError(JSON.stringify(errorMsg));
              } finally {
                setIsloading(false);
              }
            }}
            validationSchema={validationSchema}
          >
            {({ isValid }) => (
              <ModalForm isValid={isValid} isLoading={isLoading} ref={ref} />
            )}
          </Formik>
          {error && error}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddFriendModal;
