import { useState } from 'react';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        <div className="modal-header">
          <span className="modal-icon">{project.icon}</span>
          <div>
            <h2>{project.title}</h2>
            <div className="track-subtitle">{project.subtitle}</div>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-desc">{project.desc}</p>
          {project.images && project.images.length > 0 && (
            <div className="modal-carousel-wrapper">
              <button className="carousel-btn prev" onClick={prevImage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
              </button>
              <img src={project.images[currentImageIndex]} alt="Screenshot" className="project-screenshot carousel-img" />
              <button className="carousel-btn next" onClick={nextImage}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
              </button>
              <div className="carousel-indicators">
                {project.images.map((_: any, i: number) => (
                  <span key={i} className={`indicator-dot ${i === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(i)}></span>
                ))}
              </div>
            </div>
          )}
          <a href={project.github} target="_blank" rel="noreferrer" className="github-link-btn">View Code on GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;