import {
  Check,
  MapPin,
  Truck,
  CreditCard,
  LucideCheck,
  UserStar,
} from "lucide-react";

type ProgressStepsProps = {
  activeStep: number;
};

export default function ProgressSteps({ activeStep }: ProgressStepsProps) {
  const steps = [
    { id: 1, title: "Billing", icon: MapPin },
    { id: 2, title: "Shipping", icon: Truck },
    { id: 3, title: "Payment", icon: CreditCard },
    { id: 4, title: "Review", icon: UserStar },
    { id: 5, title: "Confirmation", icon: LucideCheck },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-2 sm:p-6">
      <div className="flex justify-between">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          const isCompleted = activeStep > step.id;

          return (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {isCompleted ? <Check size={20} /> : <Icon size={20} />}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {step.title}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-6 sm:w-10 h-1 ${
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
