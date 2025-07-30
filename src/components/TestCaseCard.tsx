import React, { useState } from 'react';

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

interface TestCaseCardProps {
  testCase: TestCase;
}

const TestCaseCard: React.FC<TestCaseCardProps> = ({ testCase }) => {
  console.log('TestCaseCard rendering for:', testCase.name);
  const [isExpanded, setIsExpanded] = useState(false);





  return (
    <div className="test-case-card">
      <div 
        className="test-case-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="test-case-info">
          <h3 className="test-case-name">{testCase.name}</h3>
          <p className="test-case-description">{testCase.description}</p>

        </div>
        <div className="expand-arrow">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="none"
            style={{ 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          >
            <path 
              d="M5 7.5L10 12.5L15 7.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="test-case-details">
          <div className="test-steps-header">
            <h4>Test Steps</h4>
          </div>
          <div className="test-steps-list">
            {testCase.testSteps.map((step, index) => (
              <div key={index} className="test-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <div className="step-action">
                    <strong>Action:</strong> {step.action}
                  </div>
                  <div className="step-expected">
                    <strong>Expected Output:</strong> {step.expectedOutput}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCaseCard; 