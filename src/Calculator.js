import React, { useState } from "react";
import axios from "axios";

function Calculator() {
  // State for the first operand, second operand, selected operator, result, and error message
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operator, setOperator] = useState("add");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [calculating, setCalculating] = useState(false);

  // Base URL from environment variable (e.g., http://localhost:8080/api)
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to get operator symbol for display
  const getOperatorSymbol = (op) => {
    const symbols = {
      add: "+",
      sub: "-",
      mul: "×",
      div: "÷",
      exp: "^",
      mod: "%",
      max: "max",
      min: "min",
      avg: "avg",
      absdiff: "|a-b|"
    };
    return symbols[op] || op;
  };

  // Function to perform the calculation by calling the Spring Boot API
  const handleCalculate = async () => {
    if (!a || !b) {
      setError("Please enter both numbers");
      return;
    }

    setCalculating(true);
    setError(null);
    
    try {
      const response = await axios.get(`${apiUrl}/calculate`, {
        params: { operation: operator, a, b },
      });
      setResult(response.data.result);
      setError(response.data.error);
      setCalculating(false);
    } catch (err) {
      console.error("API call error:", err);
      setError("Error calling API");
      setCalculating(false);
    }
  };

  // Function to clear the inputs and results
  const handleClear = () => {
    setA("");
    setB("");
    setResult(null);
    setError(null);
    setOperator("add");
  };

  const styles = {
    container: {
      width: "320px",
      margin: "2rem auto",
      padding: "1.5rem",
      borderRadius: "12px",
      backgroundColor: "#f8f9fa",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
      fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      boxSizing: "border-box" // Ensure padding is included in width calculation
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1a1a1a",
      textAlign: "center",
      marginBottom: "0.5rem"
    },
    displayContainer: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "0.75rem 1rem",
      height: "3.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start", // Changed to flex-start for left alignment
      border: "1px solid #e0e0e0",
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
      overflow: "hidden",
      transition: "all 0.2s ease",
      boxSizing: "border-box" // Ensure padding is included in width calculation
    },
    displayText: {
      fontSize: "1.5rem",
      fontFamily: "monospace",
      color: "#333",
      marginLeft: "auto" // Push result text to the right
    },
    displayPlaceholder: {
      color: "#9e9e9e",
      fontSize: "0.9rem",
      paddingLeft: "0.25rem" // Reduced padding to keep within bounds
    },
    errorText: {
      color: "#e53935",
      fontSize: "0.9rem",
      fontWeight: "500"
    },
    calculatingText: {
      color: "#757575",
      fontSize: "0.9rem"
    },
    operationDisplay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.1rem",
      fontWeight: "500",
      color: "#424242",
      marginBottom: "0.75rem"
    },
    operandDisplay: {
      backgroundColor: "#e3f2fd",
      padding: "0.25rem 0.5rem",
      borderRadius: "4px",
      minWidth: "2rem",
      textAlign: "center"
    },
    operatorText: {
      margin: "0 0.75rem",
      fontWeight: "bold"
    },
    inputGroup: {
      marginBottom: "0.75rem",
      width: "100%",
      boxSizing: "border-box" // Ensure child elements respect container width
    },
    label: {
      display: "block",
      fontSize: "0.85rem",
      fontWeight: "500",
      color: "#424242",
      marginBottom: "0.3rem"
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "6px",
      backgroundColor: "white",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      boxSizing: "border-box" // Ensure padding is included in width calculation
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "6px",
      backgroundColor: "white",
      appearance: "none",
      backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"black\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 0.5rem center",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      boxSizing: "border-box" // Ensure padding is included in width calculation
    },
    buttonContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0.75rem",
      marginTop: "0.5rem",
      width: "100%",
      boxSizing: "border-box" // Ensure child elements respect container width
    },
    calculateButton: {
      padding: "0.75rem",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      outline: "none"
    },
    calculateButtonHover: {
      backgroundColor: "#1565c0"
    },
    calculateButtonDisabled: {
      backgroundColor: "#bbdefb",
      cursor: "not-allowed"
    },
    clearButton: {
      padding: "0.75rem",
      backgroundColor: "#e0e0e0",
      color: "#424242",
      border: "none",
      borderRadius: "6px",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      outline: "none"
    },
    clearButtonHover: {
      backgroundColor: "#bdbdbd"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Scientific Calculator</h2>
      
      {/* Display for the result */}
      <div style={styles.displayContainer}>
        {calculating ? (
          <div style={styles.calculatingText}>Calculating...</div>
        ) : error ? (
          <div style={styles.errorText}>{error}</div>
        ) : result !== null ? (
          <div style={styles.displayText}>{result}</div>
        ) : (
          <div style={styles.displayPlaceholder}>Enter values and press calculate</div>
        )}
      </div>
      
      {/* Operation expression display */}
      <div style={styles.operationDisplay}>
        <span style={styles.operandDisplay}>{a || '?'}</span>
        <span style={styles.operatorText}>{getOperatorSymbol(operator)}</span>
        <span style={styles.operandDisplay}>{b || '?'}</span>
      </div>

      {/* First operand */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>First Number</label>
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          style={styles.input}
          placeholder="Enter first number"
        />
      </div>
      
      {/* Operation selection */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Operation</label>
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={styles.select}
        >
          <option value="add">Addition (+)</option>
          <option value="sub">Subtraction (-)</option>
          <option value="mul">Multiplication (×)</option>
          <option value="div">Division (÷)</option>
          <option value="exp">Exponentiation (^)</option>
          <option value="mod">Modulus (%)</option>
          <option value="max">Maximum (max)</option>
          <option value="min">Minimum (min)</option>
          <option value="avg">Average (avg)</option>
          <option value="absdiff">Absolute Difference (|a-b|)</option>
        </select>
      </div>
      
      {/* Second operand */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Second Number</label>
        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          style={styles.input}
          placeholder="Enter second number"
        />
      </div>
      
      {/* Buttons */}
      <div style={styles.buttonContainer}>
        <button
          onClick={handleCalculate}
          disabled={calculating}
          style={{
            ...styles.calculateButton,
            ...(calculating ? styles.calculateButtonDisabled : {})
          }}
          onMouseOver={(e) => {
            if (!calculating) e.target.style.backgroundColor = styles.calculateButtonHover.backgroundColor;
          }}
          onMouseOut={(e) => {
            if (!calculating) e.target.style.backgroundColor = styles.calculateButton.backgroundColor;
          }}
        >
          {calculating ? "Calculating..." : "Calculate"}
        </button>
        <button
          onClick={handleClear}
          style={styles.clearButton}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = styles.clearButtonHover.backgroundColor;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = styles.clearButton.backgroundColor;
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Calculator;