import { Spinner } from '../../../../../Ui';
import { useAppSelector } from '../../../../../../redux/hooks';

const PaginationSpinner = () => {
  const { pagination } = useAppSelector((state) => state.messagesSlice);
  if (pagination.loadingPagination) {
    return <Spinner size="lg" />;
  }
  return null;
};

export default PaginationSpinner;
