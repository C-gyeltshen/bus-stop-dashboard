"use client";
import React, { useRef, useEffect } from "react";

export default function PersistentAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Expose audio ref to window so splash screen can access it
    (window as any).persistentAudio = audioRef.current;
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/sys-audio.mp3"
      preload="auto"
      crossOrigin="anonymous"
    >
      <track kind="captions" label="English captions" srcLang="en" />
    </audio>
  );
}