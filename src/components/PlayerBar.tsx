import React from 'react';

interface PlayerBarProps {
  isPlaying: boolean;
  togglePlay: () => void;
  seconds: number;
  progressPercent: number;
  formatTime: (s: number) => string;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ 
  isPlaying, 
  togglePlay, 
  seconds, 
  progressPercent, 
  formatTime 
}) => {
  return (
    <div className="player-bar">
      {/* צד שמאל: פרופיל מפתח */}
      <div className="player-left">
        <div className="player-thumb">Y</div>
        <div className="player-meta">
          <div className="player-name">Now Coding: Yasmeen</div>
          <div className="player-status">● Full Stack Developer</div>
        </div>
      </div>

      {/* מרכז: פקדי נגינה ופס התקדמות */}
      <div className="player-center">
        <div className="player-controls">
          <button className="ctrl-btn" title="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#b3b3b3">
              <polygon points="19,5 10,12 19,19"></polygon>
              <rect x="5" y="5" width="3" height="14" rx="1"></rect>
            </svg>
          </button>
          
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                <rect x="14" y="4" width="4" height="16" rx="1"></rect>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                <polygon points="6,4 20,12 6,20"></polygon>
              </svg>
            )}
          </button>

          <button className="ctrl-btn" title="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#b3b3b3">
              <rect x="16" y="5" width="3" height="14" rx="1"></rect>
              <polygon points="5,5 14,12 5,19"></polygon>
            </svg>
          </button>
        </div>

        <div className="progress-bar-wrap">
          <span className="progress-time">{formatTime(seconds)}</span>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="progress-time">3:42</span>
        </div>
      </div>

      <div className="player-right">
        <div className="social-icons">
          <a className="contact-btn" href="https://github.com" title="GitHub" target="_blank" rel="noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
            </svg>
          </a>
          <a className="contact-btn" href="https://linkedin.com" title="LinkedIn" target="_blank" rel="noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
            </svg>
          </a>
          <a className="contact-btn" href="mailto:yasmeen@example.com" title="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>

        <div className="volume-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#b3b3b3">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"></path>
          </svg>
          <input type="range" className="vol-slider" defaultValue="70" min="0" max="100" />
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;