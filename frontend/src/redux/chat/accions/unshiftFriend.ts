import { friend } from '../../../types/friend/friend';

export const unshiftFriend = (friends: friend[], id: string): friend[] => {
  const foundFriend = friends.find((f) => f.user.uid === id);

  if (foundFriend) {
    const index = friends.indexOf(foundFriend);
    if (index !== -1) {
      friends.splice(index, 1);
    }
    friends.unshift(foundFriend);
    return friends;
  }
  return friends;
};
