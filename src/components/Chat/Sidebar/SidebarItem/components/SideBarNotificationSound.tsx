import { FC, useRef, useEffect, useState } from 'react';

import SoundPlayer from '../../../../SoundPlayer/SoundPlayer';
import Sound from '../../../../../sounds/notificationMsg.mp3';
import { useSideBarContext } from './SideBarProvider';

const SideBarNotificationSound: FC = () => {
  const { friend } = useSideBarContext();
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
