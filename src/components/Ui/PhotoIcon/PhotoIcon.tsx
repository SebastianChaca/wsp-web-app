import { Box } from '@chakra-ui/react';

import { MdPhotoCamera } from 'react-icons/md';

const PhotoIcon = () => {
  return (
    <Box marginLeft="4px" color="black">
      <MdPhotoCamera size="20px" />
    </Box>
  );
};

export default PhotoIcon;
