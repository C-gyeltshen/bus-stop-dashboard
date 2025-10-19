"use client";
import React, { useRef, useEffect } from "react";

// Extend globalThis to include persistentAudio
declare global {
  // eslint-disable-next-line no-var
  var persistentAudio: HTMLAudioElement | undefined;
}

export default function PersistentAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Expose audio ref to window so splash screen can access it
    globalThis.persistentAudio = audioRef.current || undefined;
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
