import { useState } from 'react';
import MainMenu from './components/MainMenu';
import TestCaseGenerator from './components/TestCaseGenerator';
import CoverageAnalysis from './components/CoverageAnalysis';

type Page = 'menu' | 'generate' | 'coverage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('menu');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('menu');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MainMenu onNavigate={handleNavigate} />;
      case 'generate':
        return <TestCaseGenerator onBack={handleBack} />;
      case 'coverage':
        return <CoverageAnalysis onBack={handleBack} />;
      default:
        return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
}

export default App; 