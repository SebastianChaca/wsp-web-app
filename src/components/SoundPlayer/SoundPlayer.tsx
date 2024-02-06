/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';

interface SoundPlayerProps {
  soundFile: string;
  playSound: boolean;
  setPlaySound: (value: boolean) => void;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({
  soundFile,
  playSound,
  setPlaySound,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (playSound) {
      // Play the sound here
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
      setPlaySound(false);
    }
  }, [playSound, setPlaySound]);

  return (
    <div>
      <audio ref={audioRef} src={soundFile} />
    </div>
  );
};

export default SoundPlayer;
