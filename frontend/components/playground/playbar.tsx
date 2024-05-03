"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
    MdOutlinePlayCircleFilled,
    MdOutlinePauseCircleFilled,
    MdOutlineRepeat,
    MdDownload,
  } from 'react-icons/md';
  import ReactHowler from 'react-howler';
  import { Howl } from 'howler';

const formatTime = (seconds: number): string => {
    const roundSeconds = Math.round(seconds);
    const minutes = Math.floor(roundSeconds / 60);
    const remainingSeconds = roundSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
interface PlayBarProps {
    src: string;
  }
const PlayBar: React.FC<PlayBarProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [howl, setHowl] = useState<Howl | null>(null);
  const [seek, setSeek] = useState(0.0);

  useEffect(() => {
    let timerId: number | undefined;

    if (isPlaying && howl) {
      const f = () => {
        setSeek(audioRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
    const newHowl = new Howl({
        src: [src],
        html5: true, // Enable HTML5 audio
        onload: () => setDuration(newHowl.duration()), // Set duration when loaded
      });
  
      setHowl(newHowl);
  }, [isPlaying]);
  //console.log('newHowl', duration)

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onLoad = () => {
    if (audioRef.current) {
      const songDuration = audioRef.current.duration();
      setDuration(songDuration);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black rounded-xl">
        <ReactHowler
        playing={isPlaying}
        src={src}
        ref={audioRef}
        onLoad={onLoad}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex items-center justify-between w-full space-x-4 px-2">
      <MdDownload className="text-gray-600 hover:text-white cursor-pointer" size={24} />
      {isPlaying ? (
          <MdOutlinePauseCircleFilled className="text-white cursor-pointer" size={40} onClick={togglePlayPause} />
        ) : (
          <MdOutlinePlayCircleFilled className="text-white cursor-pointer" size={40} onClick={togglePlayPause} />
        )}
      <MdOutlineRepeat className="text-gray-600 hover:text-white cursor-pointer" size={24} />
      </div>
      <div className="w-full flex items-center space-x-2">
        <span className="text-xs text-gray-600">{formatTime(seek)}</span>
        <input
          type="range"
          step="0.1"
          min="0"
          max={duration.toFixed(2)}
          value={seek}
          onChange={(e) => setSeek(parseFloat(e.target.value))}
          className="w-full"
        />
        <span className="text-xs text-gray-600">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default PlayBar;