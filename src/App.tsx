import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import { projects, mySkills } from './data';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  stack: string;
  stackbadge?: string; 
  year: string;
  icon: string;
  desc: string;
  desc_full?: string;
  github?: string;
  images?: string[];
}

function App() {
  const [section, setSection] = useState('projects');
  const [openTrack, setOpenTrack] = useState<string | number | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullGalleryProject, setFullGalleryProject] = useState<Project | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(84);
  const totalSeconds = 222;

  const togglePlay = () => {
    if (seconds >= totalSeconds) {
      setSeconds(0);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying && seconds < totalSeconds) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (seconds >= totalSeconds) {
        setIsPlaying(false);
      }
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, seconds]);

  const progressPercent = (seconds / totalSeconds) * 100;

  const toggleProjectExpansion = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
      setCurrentImageIndex(0);
    }
  };

  const toggleTrack = (id: string | number) => {
    setOpenTrack(openTrack === id ? null : id);
  };

  return (
    <div id="app" className="light-theme">
      <div className="main-layout">
        <Sidebar section={section} setSection={(sec) => { setSection(sec); setFullGalleryProject(null); }} />

        <div className="content-area">
          {fullGalleryProject ? (
            <div className="full-gallery-view">
              <button className="back-btn" onClick={() => setFullGalleryProject(null)}>
                ‹ Back to Projects
              </button>
              
              <div className="gallery-hero">
                <div className="gallery-main-image">
                  <img src={fullGalleryProject.images?.[currentImageIndex]} alt="Large view" />
                </div>
                
                <div className="gallery-sidebar-info">
                  <div className="hero-type">Now Playing</div>
                  <h2>{fullGalleryProject.title}</h2>
                  <div className="gallery-thumbnails">
                    {fullGalleryProject.images?.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        className={currentImageIndex === idx ? 'active-thumb' : ''} 
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    ))}
                  </div>
                  <div className="gallery-text">
                    <label>ABOUT THE TRACK</label>
                    <p>{fullGalleryProject.desc_full || fullGalleryProject.desc}</p>
                    <label>STACK</label>
                    <p>{fullGalleryProject.stack}</p>
                    {fullGalleryProject.github && (
                      <a href={fullGalleryProject.github} target="_blank" rel="noreferrer" className="expanded-link-btn">
                        View Code on GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {section === 'about' && (
                <div id="section-about">
                  <div className="hero-banner">
                    <div className="hero-avatar">Y</div>
                    <div className="hero-info">
                      <div className="hero-type">Developer Profile</div>
                      <div className="hero-name">Yasmeen</div>
                      <div className="hero-role">Full Stack Developer</div>
                      <div className="hero-stats">
                        <span>{mySkills.length} skills</span> • <span>{projects.length} projects</span> • <span style={{ color: '#FF2D55' }}> Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="section">
                    <div className="section-title">About</div>
                    <div className="bio-card">
                      My journey into development started with a spark of curiosity. I began exploring the basics on my own, and the deeper I went, the more I fell in love with the logic and the craft of building things from scratch.
                    </div>
                  </div>
                </div>
              )}

              {section === 'skills' && (
                <div id="section-skills">
                  <div className="hero-banner">
                    <div className="hero-info">
                      <div className="hero-type">Main Playlist</div>
                      <div className="hero-name">Skills Library</div>
                      <div className="hero-role">Click a skill to see my expertise</div>
                    </div>
                  </div>
                  <div className="section">
                    <div className="skills-grid">
                      {mySkills.map((skill) => (
                        <div key={skill.id} style={{ display: 'contents' }}>
                          <button className={`skill-pill ${openTrack === skill.id ? 'active' : ''}`} onClick={() => toggleTrack(skill.id)}>
                            <span className="skill-dot"></span> {skill.name}
                          </button>
                          {openTrack === skill.id && (
                            <div className="bio-card expanded-skill">
                              <strong style={{ color: '#FF2D55', display: 'block', marginBottom: '5px' }}>{skill.name} Expertise:</strong>
                              {skill.desc}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section === 'projects' && (
                <div id="section-projects">
                  <div className="hero-banner">
                    <div className="hero-info">
                      <div className="hero-type">Discography</div>
                      <div className="hero-name">Top Projects</div>
                      <div className="hero-role">Showcasing end-to-end solutions</div>
                    </div>
                  </div>
                  <div className="section">
                    <table className="tracks-table">
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>#</th>
                          <th>Track</th>
                          <th>Stack</th>
                          <th style={{ width: '100px' }}>Released</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(projects as Project[]).map((proj, index) => (
                          <optgroup key={proj.id} style={{ display: 'contents' }}>
                            <tr className={`track-row ${expandedProjectId === proj.id ? 'expanded-header' : ''}`} onClick={() => toggleProjectExpansion(proj.id)}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="track-info">
                                  <div className="track-thumb">{proj.icon}</div>
                                  <div>
                                    <div className="track-title">{proj.title}</div>
                                    <div className="track-subtitle">{proj.subtitle}</div>
                                  </div>
                                </div>
                              </td>
                              <td><span className="track-badge">{proj.stackbadge || proj.stack}</span></td>
                              <td>{proj.year}</td>
                            </tr>
                            {expandedProjectId === proj.id && (
                              <tr className="expanded-row">
                                <td colSpan={4}>
                                  <div className="expanded-content">
                                    <div className="expanded-column image-col">
                                      <div className="expanded-label">SCREENSHOTS</div>
                                      <div className="gallery-container">
                                        {proj.images && proj.images.length > 0 ? (
                                          <>
                                            <img 
                                              src={proj.images[currentImageIndex]} 
                                              alt="Screenshot" 
                                              className="expanded-screenshot" 
                                              onClick={() => setFullGalleryProject(proj)}
                                              style={{ cursor: 'pointer' }}
                                            />
                                            {proj.images.length > 1 && (
                                              <div className="gallery-controls">
                                                <button className="gal-btn" onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((p) => (p === 0 ? proj.images!.length - 1 : p - 1)); }}>‹</button>
                                                <button className="gal-btn" onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((p) => (p === proj.images!.length - 1 ? 0 : p + 1)); }}>›</button>
                                              </div>
                                            )}
                                          </>
                                        ) : (
                                          <div className="no-image">No images available</div>
                                        )}
                                      </div>
                                    </div>
                                    <div className="expanded-column text-col">
                                      <div className="expanded-label">WHY I BUILT IT</div>
                                      <p>{proj.desc_full || proj.desc}</p>
                                      <div className="expanded-label">STACK</div>
                                      <p>{proj.stack}</p>
                                    </div>
                                    <div className="expanded-column text-col">
                                      {proj.github && (
                                        <a href={proj.github} target="_blank" rel="noreferrer" className="expanded-link-btn">View Code on GitHub</a>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </optgroup>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <PlayerBar 
        isPlaying={isPlaying} 
        togglePlay={togglePlay} 
        seconds={seconds} 
        progressPercent={progressPercent} 
        formatTime={formatTime} 
      />
    </div>
  );
}

export default App;