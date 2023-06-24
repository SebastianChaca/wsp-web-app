import React from 'react';
import { AvatarBadge, Avatar as Avt } from '@chakra-ui/react';

interface Props {
  online?: boolean;
  name: string;
  hasBadge?: boolean;
  friendStatusApproved?: boolean;
}
const Avatar = ({ online, name, hasBadge, friendStatusApproved }: Props) => {
  const getStatusColor = (): string => {
    if (friendStatusApproved) {
      if (online) {
        return 'brand.online';
      }
      return 'brand.offline';
    }
    return 'brand.gray';
  };
  return (
    <Avt name={name} size="md" mx="10px">
      {hasBadge && <AvatarBadge boxSize="20px" bg={getStatusColor()} />}
    </Avt>
  );
};

export default Avatar;
