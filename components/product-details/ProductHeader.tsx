type ProductHeaderProps = {
  title: string;
  brandName?: string;
};

export default function ProductHeader({
  title,
  brandName,
}: ProductHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      {brandName && (
        <p className="text-sm text-gray-600">
          by <span className="font-semibold text-gray-800">{brandName}</span>
        </p>
      )}
    </div>
  );
}
