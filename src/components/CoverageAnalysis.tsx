import React, { useState } from 'react';
import axios from 'axios';

interface CoverageAnalysisProps {
  onBack: () => void;
}

const CoverageAnalysis: React.FC<CoverageAnalysisProps> = ({ onBack }) => {
  const [requirements, setRequirements] = useState('');
  const [currentTestCases, setCurrentTestCases] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const analyzeCoverage = async () => {
    if (!requirements.trim() || !currentTestCases.trim()) {
      setError('Please enter both requirements and current test cases before analyzing coverage.');
      setSuccess('');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/analyze-coverage', {
        requirements: requirements,
        current_test_cases: currentTestCases
      });
      
      setAnalysis(response.data.analysis);
      setSuccess('Coverage analysis completed successfully!');
    } catch (err) {
      console.error('Error analyzing coverage:', err);
      setError('Failed to analyze coverage. Please try again.');
      // For demo purposes, show a sample response
      setAnalysis(`Coverage Analysis Results:

=== REQUIREMENTS COVERAGE ===
Total Requirements: 5
Covered Requirements: 3
Coverage Percentage: 60%

=== MISSING TEST CASES ===
1. Requirement: User authentication validation
   - Missing: Edge case for invalid credentials
   - Priority: High

2. Requirement: Data validation rules
   - Missing: Boundary value testing
   - Priority: Medium

=== COVERAGE BREAKDOWN ===
✓ Functional Testing: 80% covered
✗ Performance Testing: 20% covered
✗ Security Testing: 40% covered
✓ UI/UX Testing: 90% covered

=== RECOMMENDATIONS ===
1. Add authentication edge case tests
2. Implement boundary value testing
3. Increase security test coverage
4. Add performance benchmarks

Generated from analysis of ${requirements.length} characters of requirements and ${currentTestCases.length} characters of test cases.`);
      setSuccess('Demo coverage analysis completed (backend not connected)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo-section">
        <img src="/logo.svg" alt="Test Case Generator Logo" className="logo-placeholder" />
        <div>
          <h1 className="app-title">Coverage Analysis</h1>
          <p className="app-subtitle">Analyze your test coverage</p>
        </div>
      </div>
      
      <div className="content-grid">
        <div className="input-section">
          <div className="section-label">Requirements Document</div>
          <textarea
            className="textarea"
            placeholder="Enter your requirements document here. Describe the features, functionality, and specifications..."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
          
          <div className="section-label">Current Test Cases</div>
          <textarea
            className="textarea"
            placeholder="Enter your current test cases here. Include test scenarios, expected results, and validation steps..."
            value={currentTestCases}
            onChange={(e) => setCurrentTestCases(e.target.value)}
          />
          
          <button
            className="generate-button"
            onClick={analyzeCoverage}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading"></span>
                Analyzing Coverage...
              </>
            ) : (
              'Analyze Coverage'
            )}
          </button>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}
        </div>
        
        <div className="output-section">
          <div className="section-label">Coverage Analysis Results</div>
          <textarea
            className="output-textarea"
            placeholder="Coverage analysis results will appear here. The output will include coverage percentages, missing test cases, and recommendations..."
            value={analysis}
            readOnly
          />
        </div>
      </div>
      
      <button className="back-button" onClick={onBack}>
        ← Back to Main Menu
      </button>
    </div>
  );
};

export default CoverageAnalysis; 