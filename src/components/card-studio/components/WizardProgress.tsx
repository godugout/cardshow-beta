
import React from 'react';

interface WizardProgressProps {
  steps: Array<{ key: string; label: string }>;
  currentStep: number;
  onStepClick: (index: number) => void;
}

const WizardProgress: React.FC<WizardProgressProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <button
            onClick={() => onStepClick(index)}
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
              index === currentStep
                ? 'bg-primary border-primary text-primary-foreground'
                : index < currentStep
                ? 'bg-primary/20 border-primary text-primary'
                : 'border-muted-foreground text-muted-foreground'
            }`}
          >
            {index + 1}
          </button>
          <span className={`ml-2 text-sm ${
            index === currentStep ? 'font-medium' : 'text-muted-foreground'
          }`}>
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-4 ${
              index < currentStep ? 'bg-primary' : 'bg-muted'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default WizardProgress;
