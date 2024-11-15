import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

// Defining an array of possible button styles
const STYLES = ["btn--primary", "btn--outline", "btn--test"];
// Defining an array of possible button sizes
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  destination,
}) => {
  // Checking if the passed buttonStyle is valid, else default to the first style
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  // Checking if the passed buttonSize is valid, else default to the first size
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  // This function handles rendering the button or Link based on whether a destination is provided
  const ButtonContent = () => {
    // If a destination is provided, wrap the button in a Link for navigation
    if (destination) {
      return (
        <Link to={destination} className="btn-mobile">
          <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            type={type}
            onClick={onClick}
          >
            {children} {/* Render the children inside the button */}
          </button>
        </Link>
      );
    }

    // If no destination is provided, just render a regular button
    return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        type={type}
        onClick={onClick}
      >
        {children} {/* Render the children inside the button */}
      </button>
    );
  };

  // Return the ButtonContent component
  return <ButtonContent />;
};
