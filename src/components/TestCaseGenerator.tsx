import React, { useState } from 'react';
import axios from 'axios';
import TestCaseList from './TestCaseList';
import ErrorBoundary from './ErrorBoundary';

interface TestStep {
  action: string;
  expectedOutput: string;
}

interface TestCase {
  id: string;
  name: string;
  description: string;
  testSteps: TestStep[];
}

interface TestCaseGeneratorProps {
  onBack: () => void;
}

const TestCaseGenerator: React.FC<TestCaseGeneratorProps> = ({ onBack }) => {
  const [requirements, setRequirements] = useState('');
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const generateTestCases = async () => {
    console.log('Generate test cases called');
    
    if (!requirements.trim()) {
      setError('Please enter requirements before generating test cases.');
      setSuccess('');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    // For now, just use demo test cases to test the UI
    console.log('Using demo test cases...');
    const demoTestCases: TestCase[] = [
      {
        id: '1',
        name: 'Basic Functionality Test',
        description: 'Verify core functionality works as expected with standard valid input',
        testSteps: [
          {
            action: 'Enter valid input data in the requirements field',
            expectedOutput: 'Input is accepted without validation errors'
          },
          {
            action: 'Click "Generate Test Cases" button',
            expectedOutput: 'Button shows loading state and processes request'
          },
          {
            action: 'Wait for response from backend',
            expectedOutput: 'Test cases are generated and displayed in the output area'
          }
        ]
      },
      {
        id: '2',
        name: 'Input Validation Test',
        description: 'Verify system handles invalid inputs properly with appropriate error messages',
        testSteps: [
          {
            action: 'Enter empty requirements field',
            expectedOutput: 'Error message displayed: "Please enter requirements before generating test cases"'
          },
          {
            action: 'Enter very long requirements text (>10000 characters)',
            expectedOutput: 'System handles large input without performance issues'
          },
          {
            action: 'Enter special characters and symbols',
            expectedOutput: 'Input is processed correctly without breaking the system'
          }
        ]
      }
    ];
    
    // Simulate API delay
    setTimeout(() => {
      setTestCases(demoTestCases);
      setSuccess('Demo test cases generated successfully!');
      setIsLoading(false);
    }, 1000);
  };

  console.log('TestCaseGenerator rendering with testCases:', testCases);
  
  return (
    <div className="container">
      <div className="logo-section">
        <img src="/logo.svg" alt="Test Case Generator Logo" className="logo-placeholder" />
        <div>
          <h1 className="app-title">Test Case Generator</h1>
          <p className="app-subtitle">Generate comprehensive test cases</p>
        </div>
      </div>
      
      <div className="content-grid">
        <div className="input-section">
          <div className="section-label">Requirements Document</div>
          <textarea
            className="textarea"
            placeholder="Enter your requirements document here. Describe the features, functionality, and specifications you want to test..."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
          
          <button
            className="generate-button"
            onClick={generateTestCases}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading"></span>
                Generating Test Cases...
              </>
            ) : (
              'Generate Test Cases'
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
          <div className="section-label">Generated Test Cases</div>
          <div style={{ 
            padding: '1rem', 
            background: '#f5f5f5', 
            borderRadius: '8px',
            minHeight: '200px',
            border: '2px solid #004483'
          }}>
            <p><strong>Debug Info:</strong></p>
            <p>Test cases count: {testCases.length}</p>
            <p>Loading state: {isLoading ? 'Yes' : 'No'}</p>
            <p>Error: {error || 'None'}</p>
            <p>Success: {success || 'None'}</p>
            <hr style={{ margin: '1rem 0' }} />
            <ErrorBoundary>
              <TestCaseList testCases={testCases} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      
      <button className="back-button" onClick={onBack}>
        ← Back to Main Menu
      </button>
    </div>
  );
};

export default TestCaseGenerator; 