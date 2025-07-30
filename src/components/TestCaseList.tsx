import React from 'react';
import TestCaseCard from './TestCaseCard';

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

interface TestCaseListProps {
  testCases: TestCase[];
}

const TestCaseList: React.FC<TestCaseListProps> = ({ testCases }) => {
  console.log('TestCaseList rendering with testCases:', testCases);
  
  if (!testCases || testCases.length === 0) {
    console.log('No test cases, showing empty state');
    return (
      <div className="test-cases-container">
        <div className="no-test-cases">
          <p>No test cases generated yet. Enter requirements and click "Generate Test Cases" to get started.</p>
        </div>
      </div>
    );
  }

  console.log('Rendering test cases list with', testCases.length, 'items');
  return (
    <div className="test-cases-container">
      <div className="test-cases-header">
        <h3>Generated Test Cases ({testCases.length})</h3>
      </div>
      <div className="test-cases-list">
        {testCases.map((testCase) => (
          <TestCaseCard key={testCase.id} testCase={testCase} />
        ))}
      </div>
    </div>
  );
};

export default TestCaseList; 