import { Mail, Phone, AlertCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import FormInput from "../ui/FormInput";

type AddressFormProps = {
  title: string;
  orderData: any;
  onChange: (e: any) => void;
  onContinue: () => void;
  buttonText?: string;
  showShippingCheckbox?: boolean;
  onCheckboxChange?: (e: any) => void;
  isLoading?: boolean;
};

// Zod validation schema
const AddressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^[0-9]{10,}$/, "Please enter a valid phone number (min 10 digits)"),
  building: z.string().min(1, "Building/Apt is required"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z
    .string()
    .min(6, "Pincode is required")
    .regex(/^[0-9]{5,10}$/, "Please enter a valid pincode (6 digits)"),
  country: z.string().min(1, "Country is required"),
  isShippingSame: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof AddressSchema>;

// Validation utility function
const validateFormWithZod = (
  orderData: any
): {
  isValid: boolean;
  error: string | null;
  fieldErrors?: Record<string, string>;
} => {
  const result = AddressSchema.safeParse(orderData);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    let firstError = "";

    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      fieldErrors[path] = issue.message;
      if (!firstError) {
        firstError = issue.message;
      }
    });

    return {
      isValid: false,
      error: firstError,
      fieldErrors,
    };
  }

  return { isValid: true, error: null };
};

// Error Alert Component
function ErrorAlert({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
      <p className="text-sm text-red-700 font-medium flex-1">{message}</p>
      <button
        onClick={onDismiss}
        className="text-red-600 hover:text-red-700 transition"
      >
        ✕
      </button>
    </div>
  );
}

// Personal Information Section
function PersonalInfoSection({
  orderData,
  onChange,
  fieldErrors,
}: {
  orderData: any;
  onChange: (e: any) => void;
  fieldErrors?: Record<string, string>;
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FormInput
            label="First Name *"
            name="firstName"
            value={orderData.firstName}
            onChange={onChange}
            placeholder="John"
          />
          {fieldErrors?.firstName && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.firstName}</p>
          )}
        </div>
        <div>
          <FormInput
            label="Last Name *"
            name="lastName"
            value={orderData.lastName}
            onChange={onChange}
            placeholder="Doe"
          />
          {fieldErrors?.lastName && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FormInput
            label="Email *"
            name="email"
            type="email"
            value={orderData.email}
            onChange={onChange}
            placeholder="john@example.com"
            icon={<Mail className="w-4 h-4" />}
          />
          {fieldErrors?.email && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
          )}
        </div>
        <div>
          <FormInput
            label="Phone *"
            name="phone"
            type="tel"
            value={orderData.phone}
            onChange={onChange}
            placeholder="+91 98765 43210"
            icon={<Phone className="w-4 h-4" />}
            maxLength={10}
          />
          {fieldErrors?.phone && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>
          )}
        </div>
      </div>
    </>
  );
}

// Address Information Section
function AddressInfoSection({
  orderData,
  onChange,
  fieldErrors,
}: {
  orderData: any;
  onChange: (e: any) => void;
  fieldErrors?: Record<string, string>;
}) {
  return (
    <>
      <div>
        <FormInput
          label="Building *"
          name="building"
          value={orderData.building}
          onChange={onChange}
          placeholder="Apartment 12, Building A"
        />
        {fieldErrors?.building && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.building}</p>
        )}
      </div>

      <div>
        <FormInput
          label="Street Address *"
          name="address"
          value={orderData.address}
          onChange={onChange}
          placeholder="123 Main Street"
        />
        {fieldErrors?.address && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FormInput
            label="City *"
            name="city"
            value={orderData.city}
            onChange={onChange}
            placeholder="Mumbai"
          />
          {fieldErrors?.city && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.city}</p>
          )}
        </div>
        <div>
          <FormInput
            label="State *"
            name="state"
            value={orderData.state}
            onChange={onChange}
            placeholder="Maharashtra"
          />
          {fieldErrors?.state && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.state}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FormInput
            label="Pincode *"
            name="pincode"
            value={orderData.pincode}
            onChange={onChange}
            placeholder="400001"
            maxLength={6}
          />
          {fieldErrors?.pincode && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.pincode}</p>
          )}
        </div>
        <div>
          <FormInput
            label="Country *"
            name="country"
            value={orderData.country}
            onChange={onChange}
            placeholder="India"
          />
          {fieldErrors?.country && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.country}</p>
          )}
        </div>
      </div>
    </>
  );
}

// Checkbox Section
function CheckboxSection({
  orderData,
  onChange,
  label,
}: {
  orderData: any;
  onChange: (e: any) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <input
        type="checkbox"
        name="isShippingSame"
        checked={orderData.isShippingSame}
        onChange={onChange}
        className="w-4 h-4 accent-orange-500 cursor-pointer"
      />
      <label className="text-sm font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  );
}

// Main Generic Address Form Component
export default function AddressForm({
  title,
  orderData,
  onChange,
  onContinue,
  buttonText = "Continue",
  showShippingCheckbox = false,
  onCheckboxChange,
  isLoading = false,
}: AddressFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const validation = validateFormWithZod(orderData);

    if (!validation.isValid) {
      setError(validation.error);
      setFieldErrors(validation.fieldErrors || {});
      return;
    }

    setError(null);
    setFieldErrors({});
    onContinue();
  };

  const isFormValid = () => {
    const validation = validateFormWithZod(orderData);
    return validation.isValid;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

      {/* Error Alert */}
      {error && <ErrorAlert message={error} onDismiss={() => setError(null)} />}

      {/* Personal Information */}
      <div className="space-y-4">
        <PersonalInfoSection
          orderData={orderData}
          onChange={onChange}
          fieldErrors={fieldErrors}
        />
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <AddressInfoSection
          orderData={orderData}
          onChange={onChange}
          fieldErrors={fieldErrors}
        />
      </div>

      {/* Shipping Checkbox */}
      {showShippingCheckbox && (
        <CheckboxSection
          orderData={orderData}
          onChange={onCheckboxChange || onChange}
          label="Shipping address same as billing"
        />
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:text-gray-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : buttonText}
      </button>
    </div>
  );
}
