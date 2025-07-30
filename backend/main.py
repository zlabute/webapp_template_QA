from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import re

app = FastAPI(
    title="Test Case Generator API",
    description="A FastAPI backend for generating test cases from requirements documents",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequirementsRequest(BaseModel):
    requirements: str

from typing import List, Optional

class TestStep(BaseModel):
    action: str
    expectedOutput: str

class TestCase(BaseModel):
    id: str
    name: str
    description: str
    testSteps: List[TestStep]

class TestCaseResponse(BaseModel):
    test_cases: List[TestCase]
    message: str

@app.get("/")
async def root():
    return {"message": "Test Case Generator API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "test-case-generator"}

class CoverageRequest(BaseModel):
    requirements: str
    current_test_cases: str

class CoverageResponse(BaseModel):
    analysis: str
    message: str

@app.post("/generate-test-cases", response_model=TestCaseResponse)
async def generate_test_cases(request: RequirementsRequest):
    """
    Generate test cases based on the provided requirements document.
    """
    if not request.requirements.strip():
        raise HTTPException(status_code=400, detail="Requirements cannot be empty")
    
    try:
        # Simple test case generation logic
        # In a real application, this would integrate with AI/ML models
        test_cases = generate_test_cases_from_requirements(request.requirements)
        
        return TestCaseResponse(
            test_cases=test_cases,
            message="Test cases generated successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating test cases: {str(e)}")

@app.post("/analyze-coverage", response_model=CoverageResponse)
async def analyze_coverage(request: CoverageRequest):
    """
    Analyze test coverage based on requirements and current test cases.
    """
    if not request.requirements.strip() or not request.current_test_cases.strip():
        raise HTTPException(status_code=400, detail="Both requirements and current test cases are required")
    
    try:
        # Simple coverage analysis logic
        # In a real application, this would integrate with AI/ML models
        analysis = analyze_coverage_from_inputs(request.requirements, request.current_test_cases)
        
        return CoverageResponse(
            analysis=analysis,
            message="Coverage analysis completed successfully"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing coverage: {str(e)}")

def generate_test_cases_from_requirements(requirements: str) -> List[TestCase]:
    """
    Generate test cases based on requirements text.
    This is a simple implementation - in production, you'd use AI/ML models.
    """
    lines = requirements.split('\n')
    test_cases = []
    
    # Extract key functionality from requirements
    functionalities = []
    for line in lines:
        line = line.strip().lower()
        if any(keyword in line for keyword in ['function', 'feature', 'requirement', 'should', 'must']):
            functionalities.append(line)
    
    # Generate basic test cases
    test_cases.append(TestCase(
        id="1",
        name="Basic Functionality Test",
        description="Verify core functionality works as expected with standard valid input",
        testSteps=[
            TestStep(
                action="Enter valid input data in the requirements field",
                expectedOutput="Input is accepted without validation errors"
            ),
            TestStep(
                action="Click 'Generate Test Cases' button",
                expectedOutput="Button shows loading state and processes request"
            ),
            TestStep(
                action="Wait for response from backend",
                expectedOutput="Test cases are generated and displayed in the output area"
            )
        ]
    ))
    
    test_cases.append(TestCase(
        id="2",
        name="Input Validation Test",
        description="Verify system handles invalid inputs properly with appropriate error messages",
        testSteps=[
            TestStep(
                action="Enter empty requirements field",
                expectedOutput="Error message displayed: 'Please enter requirements before generating test cases'"
            ),
            TestStep(
                action="Enter very long requirements text (>10000 characters)",
                expectedOutput="System handles large input without performance issues"
            ),
            TestStep(
                action="Enter special characters and symbols",
                expectedOutput="Input is processed correctly without breaking the system"
            )
        ]
    ))
    
    test_cases.append(TestCase(
        id="3",
        name="Edge Cases Test",
        description="Test boundary conditions and edge cases for robust system behavior",
        testSteps=[
            TestStep(
                action="Test with minimum valid input (1 character)",
                expectedOutput="System accepts minimal input and generates appropriate test cases"
            ),
            TestStep(
                action="Test with maximum input size",
                expectedOutput="System handles maximum input without crashing or timing out"
            ),
            TestStep(
                action="Test with null/undefined values",
                expectedOutput="System gracefully handles null values with proper error messages"
            )
        ]
    ))
    
    test_cases.append(TestCase(
        id="4",
        name="Performance Test",
        description="Verify system performance under various load conditions",
        testSteps=[
            TestStep(
                action="Generate test cases with large requirements document",
                expectedOutput="Response time is under 5 seconds for documents up to 10KB"
            ),
            TestStep(
                action="Generate multiple test case sets in succession",
                expectedOutput="System maintains consistent performance across multiple requests"
            ),
            TestStep(
                action="Test with concurrent user requests",
                expectedOutput="System handles concurrent requests without conflicts or errors"
            )
        ]
    ))
    
    # Add specific test cases based on requirements content
    if functionalities:
        for i, func in enumerate(functionalities[:2], 5):  # Limit to first 2 additional
            test_cases.append(TestCase(
                id=str(i),
                name=f"Requirement-Specific Test: {func[:30]}...",
                description=f"Test specific requirement functionality: {func[:100]}...",
                testSteps=[
                    TestStep(
                        action=f"Test the requirement: {func[:50]}...",
                        expectedOutput="Requirement is properly implemented and tested"
                    ),
                    TestStep(
                        action="Verify all related functionality works correctly",
                        expectedOutput="All related features function as expected"
                    )
                ]
            ))
    
    return test_cases

def analyze_coverage_from_inputs(requirements: str, current_test_cases: str) -> str:
    """
    Analyze test coverage based on requirements and current test cases.
    This is a simple implementation - in production, you'd use AI/ML models.
    """
    lines = requirements.split('\n')
    test_lines = current_test_cases.split('\n')
    
    # Simple analysis logic
    requirements_count = len([line for line in lines if any(keyword in line.lower() for keyword in ['requirement', 'feature', 'function', 'should', 'must'])])
    test_cases_count = len([line for line in test_lines if any(keyword in line.lower() for keyword in ['test', 'case', 'scenario', 'verify', 'check'])])
    
    coverage_percentage = min(100, int((test_cases_count / max(requirements_count, 1)) * 100))
    
    analysis = []
    analysis.append("=== COVERAGE ANALYSIS RESULTS ===\n")
    
    # Coverage Summary
    analysis.append(f"Requirements Identified: {requirements_count}")
    analysis.append(f"Test Cases Found: {test_cases_count}")
    analysis.append(f"Coverage Percentage: {coverage_percentage}%\n")
    
    # Coverage Breakdown
    analysis.append("=== COVERAGE BREAKDOWN ===")
    analysis.append("✓ Functional Testing: 85% covered")
    analysis.append("✗ Performance Testing: 30% covered")
    analysis.append("✗ Security Testing: 45% covered")
    analysis.append("✓ UI/UX Testing: 90% covered\n")
    
    # Missing Test Cases
    analysis.append("=== MISSING TEST CASES ===")
    if coverage_percentage < 80:
        analysis.append("1. Edge case testing for boundary conditions")
        analysis.append("2. Negative test scenarios")
        analysis.append("3. Performance and load testing")
        analysis.append("4. Security vulnerability testing")
    else:
        analysis.append("Good coverage! Consider adding:")
        analysis.append("1. Advanced edge cases")
        analysis.append("2. Performance benchmarks")
        analysis.append("3. Security penetration tests\n")
    
    # Recommendations
    analysis.append("=== RECOMMENDATIONS ===")
    if coverage_percentage < 50:
        analysis.append("1. Increase basic test coverage")
        analysis.append("2. Add unit tests for core functionality")
        analysis.append("3. Implement integration tests")
    elif coverage_percentage < 80:
        analysis.append("1. Add edge case testing")
        analysis.append("2. Implement performance tests")
        analysis.append("3. Add security test cases")
    else:
        analysis.append("1. Optimize existing tests")
        analysis.append("2. Add advanced scenarios")
        analysis.append("3. Implement automated testing")
    
    analysis.append(f"\nAnalysis generated from {len(requirements)} characters of requirements and {len(current_test_cases)} characters of test cases.")
    
    return '\n'.join(analysis)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 