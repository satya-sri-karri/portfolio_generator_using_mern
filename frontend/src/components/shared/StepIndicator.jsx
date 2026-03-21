import React from "react";

const StepIndicator = ({ steps, current, onClick }) => (
  <div className="steps">
    {steps.map((s, i) => (
      <React.Fragment key={s.id}>
        <div className="step-item">
          <div
            className={`step-circle ${i < current ? "done" : i === current ? "active" : ""}`}
            onClick={() => onClick(i)}
          >
            {i < current ? "✓" : i + 1}
          </div>
          <span className={`step-label ${i === current ? "active" : ""}`}>{s.label}</span>
        </div>
        {i < steps.length - 1 && (
          <div className={`step-connector ${i < current ? "done" : ""}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default StepIndicator;
