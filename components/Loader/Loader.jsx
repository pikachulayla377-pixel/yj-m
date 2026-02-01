import React from "react";

export default function BlueBuffCoreLoader() {
  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-[var(--background)]
      "
    >
      <div className="relative w-48 h-48">
        {/* Subtle gradient ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, var(--accent), #22d3ee, var(--accent))',
            animation: 'rotateGradient 3s linear infinite',
            opacity: 0.6
          }}
        >
          <div
            className="absolute inset-1 rounded-full"
            style={{
              background: 'var(--background)'
            }}
          />
        </div>

        {/* Breathing circle */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: 'breathe 2s ease-in-out infinite'
          }}
        >
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--accent), #22d3ee)',
              boxShadow: '0 8px 32px rgba(34, 211, 238, 0.3)'
            }}
          >
            <span
              className="text-4xl font-bold tracking-tight"
              style={{
                color: 'var(--foreground)',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              yJ
            </span>
          </div>
        </div>

        {/* Minimal orbit dots */}
        {[0, 120, 240].map((angle, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              animation: `orbit ${3 + i * 0.2}s linear infinite`,
              animationDelay: `${i * -1}s`
            }}
          >
            <div
              className="absolute w-2 h-2 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateX(72px) translateY(-50%)`,
                background: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)',
                opacity: 0.8
              }}
            />
          </div>
        ))}
      </div>

      {/* Clean loading text */}
      <div className="absolute bottom-32 text-center">
        <p
          className="text-sm tracking-wider text-[var(--muted)] font-medium"
          style={{
            animation: 'fadeInOut 2s ease-in-out infinite'
          }}
        >
          Loading
        </p>
      </div>

      <style>{`
        @keyframes rotateGradient {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
