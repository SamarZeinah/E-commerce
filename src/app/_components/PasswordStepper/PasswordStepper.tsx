import { Mail, KeyRound, Lock } from "lucide-react";

type Step = 1 | 2 | 3;

interface StepperProps {
  currentStep: Step;
}

export function PasswordStepper({ currentStep }: StepperProps) {
  const steps = [
    { icon: Mail, step: 1 },
    { icon: KeyRound, step: 2 },
    { icon: Lock, step: 3 },
  ];

  return (
    <div className="flex items-center justify-center my-6">
      {steps.map(({ icon: Icon, step }, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 ${
              currentStep >= step
                ? "bg-[#16A34A]"
                : "bg-gray-200"
            }`}
          >
            <Icon
              size={20}
              className={currentStep >= step ? "text-white" : "text-gray-400"}
            />
          </div>
          {index < steps.length - 1 && (
  <div className={`w-16 h-px mx-1 transition-colors duration-200 ${
    currentStep > step ? "bg-[#16A34A]" : "bg-gray-300"
  }`} />
)}
        </div>
      ))}
    </div>
  );
}