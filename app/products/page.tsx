"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import { ProductDetailsProps } from "@/lib/type/product.type";
import Loader from "@/components/global/Loader";
import ProductCard from "@/components/global/ProductCard";
import getAllProductList from "@/lib/api/product.api";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductDetailsProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setSearchLoading(false);
      setNoData(false);

      try {
        const response = await getAllProductList(10, 1);
        const data = response?.data?.products || [];

        setProducts(data);
        setNoData(data.length === 0);
      } catch (err: any) {
        console.error("Failed to fetch product list:", err);

        // Backend error
        if (err.response?.data?.message) {
          setError(err.response.data.message);
        }
        // Network or unexpected error
        else if (err.message) {
          setError(err.message);
        } else {
          setError("Failed to load products. Please try again.");
        }

        setNoData(true);
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductDetails = (id: string) => {
    router.push(`/products/${id}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Products
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Explore our latest products and offers
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      {noData ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center px-4">
          <img
            src="/no-results.svg"
            alt="No products"
            className="w-40 sm:w-56 h-40 sm:h-56 opacity-80 mb-4"
          />
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
            No products found
          </h2>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Try adjusting your search or come back later.
          </p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 py-8 transition-opacity duration-300 ${
            searchLoading ? "opacity-60" : "opacity-100"
          }`}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              brandName={product.brandName}
              subCategoryName={product.subCategoryName}
              originCountry={product.originCountry}
              imageUrl={product.images?.[0]?.url}
              onClick={handleProductDetails}
              showButton
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default withAuth(ProductsPage);
