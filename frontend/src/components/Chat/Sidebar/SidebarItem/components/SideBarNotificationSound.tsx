import React, { FC, useRef, useEffect, useState } from 'react';
import { friend as friendInterface } from '../../../../../types/friend/friend';
import SoundPlayer from '../../../../SoundPlayer/SoundPlayer';
import Sound from '../../../../../sounds/notificationMsg.mp3';

interface SideBarNotificationSoundProps {
  friend: friendInterface;
}

const SideBarNotificationSound: FC<SideBarNotificationSoundProps> = ({
  friend,
}) => {
  const prevNotificationsRef = useRef(friend.notifications);
  const [playSound, setPlaySound] = useState(false);
  useEffect(() => {
    if (prevNotificationsRef.current !== friend.notifications) {
      setPlaySound(true);
    }

    prevNotificationsRef.current = friend.notifications;
  }, [friend.notifications]);
  return (
    <SoundPlayer
      soundFile={Sound}
      playSound={playSound}
      setPlaySound={setPlaySound}
    />
  );
};

export default SideBarNotificationSound;
