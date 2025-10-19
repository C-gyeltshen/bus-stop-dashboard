"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Volume2, ChevronRight } from "lucide-react";

// Extend globalThis to include persistentAudio
declare global {
  // eslint-disable-next-line no-var
  var persistentAudio: HTMLAudioElement | undefined;
}

export default function SplashScreen() {
  const [isEntering, setIsEntering] = useState(false);
  const router = useRouter();

  const handleEnter = async () => {
    if (!isEntering) {
      setIsEntering(true);

      try {
        // Access the persistent audio element from layout
        const audio = globalThis.persistentAudio;
        if (audio) {
          audio.currentTime = 0; // Reset to start
          await audio.play();
          console.log("Audio playing");
        } else {
          console.log("Audio element not found");
        }
      } catch (error) {
        console.error("Audio play error:", error);
      }

      // Use Next.js router for client-side navigation to keep audio playing
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0e172b",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          bottom: "-50px",
          right: "-50px",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .splash-container {
          position: relative;
          z-index: 10;
          text-align: center;
          animation: fadeInScale 0.8s ease-out;
        }

        .splash-title {
          font-size: 3.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.5px;
        }

        .splash-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 3rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .enter-button {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          background: #0e172b;
          color: white;
          border: 2px solid white;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .enter-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        .enter-button:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .enter-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .enter-button.loading {
          animation: pulse 1s ease-in-out infinite;
        }
      `}</style>

      <div className="splash-container">
        <h1 className="splash-title">Khorlam Pelri</h1>
        <p className="splash-subtitle">Welcome to the journey</p>

        <button
          onClick={handleEnter}
          disabled={isEntering}
          className={`enter-button ${isEntering ? "loading" : ""}`}
        >
          <Volume2 size={20} />
          Enter
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
