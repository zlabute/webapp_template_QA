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

class TestCaseResponse(BaseModel):
    test_cases: str
    message: str

@app.get("/")
async def root():
    return {"message": "Test Case Generator API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "test-case-generator"}

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

def generate_test_cases_from_requirements(requirements: str) -> str:
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
    test_cases.append("=== GENERATED TEST CASES ===\n")
    
    # Test Case 1: Basic Functionality
    test_cases.append("1. Test Case: Basic Functionality")
    test_cases.append("   - Description: Verify core functionality works as expected")
    test_cases.append("   - Input: Standard valid input")
    test_cases.append("   - Expected Output: Correct processing and response")
    test_cases.append("   - Test Steps:")
    test_cases.append("     a. Enter valid input data")
    test_cases.append("     b. Submit the request")
    test_cases.append("     c. Verify correct output")
    test_cases.append("   - Status: PENDING")
    test_cases.append("")
    
    # Test Case 2: Input Validation
    test_cases.append("2. Test Case: Input Validation")
    test_cases.append("   - Description: Verify system handles invalid inputs properly")
    test_cases.append("   - Input: Invalid or malformed data")
    test_cases.append("   - Expected Output: Appropriate error messages")
    test_cases.append("   - Test Steps:")
    test_cases.append("     a. Enter invalid input data")
    test_cases.append("     b. Submit the request")
    test_cases.append("     c. Verify error handling")
    test_cases.append("   - Status: PENDING")
    test_cases.append("")
    
    # Test Case 3: Edge Cases
    test_cases.append("3. Test Case: Edge Cases")
    test_cases.append("   - Description: Test boundary conditions and edge cases")
    test_cases.append("   - Input: Boundary values, empty inputs, maximum values")
    test_cases.append("   - Expected Output: Proper handling of edge cases")
    test_cases.append("   - Test Steps:")
    test_cases.append("     a. Test with minimum values")
    test_cases.append("     b. Test with maximum values")
    test_cases.append("     c. Test with empty/null values")
    test_cases.append("   - Status: PENDING")
    test_cases.append("")
    
    # Test Case 4: Performance
    test_cases.append("4. Test Case: Performance")
    test_cases.append("   - Description: Verify system performance under load")
    test_cases.append("   - Input: Large datasets or high volume requests")
    test_cases.append("   - Expected Output: Response within acceptable time limits")
    test_cases.append("   - Test Steps:")
    test_cases.append("     a. Submit large dataset")
    test_cases.append("     b. Measure response time")
    test_cases.append("     c. Verify performance criteria")
    test_cases.append("   - Status: PENDING")
    test_cases.append("")
    
    # Add specific test cases based on requirements content
    if functionalities:
        test_cases.append("=== REQUIREMENT-SPECIFIC TEST CASES ===")
        for i, func in enumerate(functionalities[:3], 1):  # Limit to first 3
            test_cases.append(f"{i}. Test Case: {func[:50]}...")
            test_cases.append("   - Description: Test specific requirement functionality")
            test_cases.append("   - Input: Relevant test data")
            test_cases.append("   - Expected Output: Requirement fulfillment")
            test_cases.append("   - Status: PENDING")
            test_cases.append("")
    
    test_cases.append("=== TEST SUMMARY ===")
    test_cases.append(f"- Total Test Cases Generated: {len(test_cases) // 8}")
    test_cases.append(f"- Requirements Analyzed: {len(requirements)} characters")
    test_cases.append("- Generated by: Test Case Generator API v1.0")
    
    return '\n'.join(test_cases)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 