import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [requirements, setRequirements] = useState('');
  const [testCases, setTestCases] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const generateTestCases = async () => {
    if (!requirements.trim()) {
      setError('Please enter requirements before generating test cases.');
      setSuccess('');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/generate-test-cases', {
        requirements: requirements
      });
      
      setTestCases(response.data.test_cases);
      setSuccess('Test cases generated successfully!');
    } catch (err) {
      console.error('Error generating test cases:', err);
      setError('Failed to generate test cases. Please try again.');
      // For demo purposes, show a sample response
      setTestCases(`Sample Test Cases Generated:

1. Test Case: Basic Functionality
   - Description: Verify core functionality works as expected
   - Input: Standard valid input
   - Expected Output: Correct processing and response
   - Test Steps:
     a. Enter valid input data
     b. Submit the request
     c. Verify correct output
   - Status: PASS

2. Test Case: Input Validation
   - Description: Verify system handles invalid inputs properly
   - Input: Invalid or malformed data
   - Expected Output: Appropriate error messages
   - Test Steps:
     a. Enter invalid input data
     b. Submit the request
     c. Verify error handling
   - Status: PASS

3. Test Case: Edge Cases
   - Description: Test boundary conditions and edge cases
   - Input: Boundary values, empty inputs, maximum values
   - Expected Output: Proper handling of edge cases
   - Test Steps:
     a. Test with minimum values
     b. Test with maximum values
     c. Test with empty/null values
   - Status: PASS

Generated from requirements: ${requirements.substring(0, 100)}...`);
      setSuccess('Demo test cases generated (backend not connected)');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="logo-section">
        <img src="/logo.svg" alt="Test Case Generator Logo" className="logo-placeholder" />
        <div>
          <h1 className="app-title">Test Case Generator</h1>
          <p className="app-subtitle">How can I help you?</p>
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
          <textarea
            className="output-textarea"
            placeholder="Generated test cases will appear here. The output will include test scenarios, expected results, and validation steps..."
            value={testCases}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App; 