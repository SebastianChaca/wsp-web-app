import { Spinner } from '../../../../../Ui';
import { useAppSelector } from '../../../../../../redux/hooks';

const PaginationSpinner = () => {
  const { loadingPagination } = useAppSelector((state) => state.messagesSlice);
  if (loadingPagination) {
    return <Spinner size="lg" />;
  }
  return null;
};

export default PaginationSpinner;
