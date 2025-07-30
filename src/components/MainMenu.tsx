import React from 'react';

type Page = 'menu' | 'generate' | 'coverage';

interface MainMenuProps {
  onNavigate: (page: Page) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  return (
    <div className="container">
      <div className="logo-section">
        <img src="/logo.svg" alt="Test Case Generator Logo" className="logo-placeholder" />
        <div>
          <h1 className="app-title">Test Case Generator</h1>
          <p className="app-subtitle">How can I help you?</p>
        </div>
      </div>
      
      <div className="navigation-buttons">
        <button 
          className="nav-button"
          onClick={() => onNavigate('generate')}
        >
          Generate Test Cases
        </button>
        
        <button 
          className="nav-button"
          onClick={() => onNavigate('coverage')}
        >
          Coverage Analysis
        </button>
      </div>
    </div>
  );
};

export default MainMenu; 