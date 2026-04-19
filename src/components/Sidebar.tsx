interface SidebarProps {
  section: string;
  setSection: (s: string) => void;
}

const Sidebar = ({ section, setSection }: SidebarProps) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">◈ <span>devtunes</span></div>
      <div className="nav-section-label">Menu</div>
      <div className={`nav-item ${section === 'about' ? 'active' : ''}`} onClick={() => setSection('about')}>
        <span className="nav-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
        </span> Home
      </div>
      <div className={`nav-item ${section === 'skills' ? 'active' : ''}`} onClick={() => setSection('skills')}>
        <span className="nav-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </span> Discover Skills
      </div>
      <div className={`nav-item ${section === 'projects' ? 'active' : ''}`} onClick={() => setSection('projects')}>
        <span className="nav-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path></svg>
        </span> Projects Library
      </div>
      <div className="sidebar-playlist-label">Playlists</div>
      <div className="playlist-item">♯ Frontend Jams</div>
      <div className="playlist-item">♯ Backend Sessions</div>
    </nav>
  );
};

export default Sidebar;