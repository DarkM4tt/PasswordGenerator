import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import "./styles.css";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* Password Text and Copy Button */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <button className="copyBtn" onClick={handleCopy}>
            {copied ? "Copied" : "copy"}
          </button>
        </div>
      )}

      {/* Character Length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* Checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((item, idx) => {
          return (
            <div key={idx}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(idx)}
                checked={item.state}
              />
              <label>{item.title}</label>
            </div>
          );
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password} />

      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Generate Button */}
      <button
        className="generateBtn"
        onClick={() => generatePassword(checkboxData, length)}
      >
        Generate Password
      </button>
    </div>
  );
}
