type FormInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  maxLength?: number;
};

export default function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  maxLength,
}: FormInputProps) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
}
