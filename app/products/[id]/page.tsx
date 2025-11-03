"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductDetails, getProductVariant } from "@/lib/api/product.api";
import { SpecificProductDetailsProps } from "@/lib/type/product.type";
import { ProductVariantProps } from "@/lib/type/product-variant.type";
import ProductGallery from "@/components/product-details/ProductGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import Loader from "@/components/global/Loader";
import ProductDetailsCard from "@/components/product-details/ProductDetailsCard";
import ProductHeader from "@/components/product-details/ProductHeader";
import PriceDisplay from "@/components/product-details/PriceDisplay";
import VariantSelector from "@/components/product-details/VariantSelector";
import SelectedVariantInfo from "@/components/product-details/SelectedVariantInfo";
import CheckoutModal from "@/components/cart-details/CheckoutModal";
import { cartItemDuringCheckout } from "@/lib/type/cart.type";

const INITIAL_VARIANT_DETAILS: ProductVariantProps = {
  allocated: 0,
  attributes: {
    color: {
      displayName: "",
      hexCode: "",
      value: "",
    },
    size: {
      brand: "",
      displayName: "",
      gender: "",
      name: "",
      value: [
        {
          displayName: "",
          id: "",
          numericCM: "",
          numericEU: "",
          numericUK: "",
          width: "",
        },
      ],
    },
  },
  id: "",
  images: [],
  mrp: 0,
  onHand: 0,
  price: 0,
  sku: "",
};

const INITIAL_PRODUCT: SpecificProductDetailsProps = {
  storeId: "",
  id: "",
  title: "",
  slug: "",
  hsnCode: "",
  categoryName: "",
  subCategoryName: "",
  brandName: "",
  originCountry: "",
  images: [],
  description: "",
  productMeasurement: {
    width: { unit: "", value: 0 },
    height: { unit: "", value: 0 },
    length: { unit: "", value: 0 },
    weight: { unit: "", value: 0 },
  },
  manufacturingInfo: {
    manufacturerOrPackerName: "",
    manufacturerOrPackerAddress: "",
    monthOfManufactureOrPacking: "",
  },
  variants: INITIAL_VARIANT_DETAILS,
};

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] =
    useState<SpecificProductDetailsProps>(INITIAL_PRODUCT);
  const [allVariants, setAllVariants] = useState<ProductVariantProps[]>([]);
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [openCheckoutPage, setOpenCheckoutPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      try {
        // Fetch product details
        const productRes = await getProductVariant(id);
        if (!productRes?.data) {
          throw new Error("Failed to fetch product details.");
        }
        setProduct(productRes.data);

        // Fetch variants
        const variantsRes = await getProductVariant(id);
        const variants = variantsRes?.data?.variants || [];
        setAllVariants(variants);

        if (variants.length > 0) {
          setSelectedVariant(variants[0]);
        } else if (productRes.data?.variants) {
          setSelectedVariant(productRes.data.variants);
        }
      } catch (err: any) {
        console.error("Error fetching product data:", err);
        setError(
          err?.message || "Something went wrong while fetching product details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleVariantSelect = (variant: ProductVariantProps) => {
    setSelectedVariant(variant);
    setActiveImage(0);
    setQuantity(1);
  };

  if (loading) return <Loader />;

  if (!product?.id) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-gray-50 to-white">
        <p className="text-gray-600 text-lg">Product not found</p>
      </div>
    );
  }

  const currentVariant = selectedVariant || product.variants;

  let totalAmount = 0;

  if (selectedVariant) {
    totalAmount = quantity * selectedVariant?.price;
  }
  const cartData = {
    id: product.id,
    items: [
      {
        brandName: product.brandName,
        title: product.title,
        description: product.description,
        images: selectedVariant?.images ?? [],
        price: selectedVariant?.price ?? 0,
        sku: selectedVariant?.sku ?? "",
        variantId: selectedVariant?.id ?? "",
        quantity: quantity,
      },
    ],
    totalAmount: quantity * totalAmount,
  } as cartItemDuringCheckout;

  console.log("cartData ffff: ", cartData);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* 🧭 Breadcrumb */}
      <div className="py-4 text-sm text-gray-600 flex flex-wrap gap-1">
        <span>{product.categoryName}</span>
        <span>›</span>
        <span>{product.subCategoryName}</span>
        <span>›</span>
        <span className="text-gray-900 font-medium truncate max-w-[320px] sm:max-w-none">
          {product.title}
        </span>
      </div>

      {/* 📦 Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 py-6">
        {/* 🖼 Product Images */}
        <ProductGallery
          images={currentVariant?.images || product.images}
          title={product.title}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />

        {/* 📋 Product Info */}
        <div className="flex flex-col space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <ProductHeader
              title={product.title}
              brandName={product.brandName}
            />

            <PriceDisplay
              price={currentVariant?.price || 0}
              mrp={currentVariant?.mrp || 0}
            />

            {/* 🔘 Variant Selection */}
            {allVariants.length > 0 && (
              <>
                <VariantSelector
                  variants={allVariants}
                  selectedVariant={selectedVariant}
                  onVariantSelect={handleVariantSelect}
                />

                {selectedVariant && (
                  <SelectedVariantInfo variant={selectedVariant} />
                )}
              </>
            )}

            <ProductDetailsCard
              product={product}
              variant={currentVariant}
              quantity={quantity}
              setQuantity={setQuantity}
              liked={liked}
              setLiked={setLiked}
              onCheckout={() => setOpenCheckoutPage(true)}
            />
          </div>

          {/* 🧾 Product Info Tabs */}
          <ProductInfo product={product} />
        </div>
      </div>
      <CheckoutModal
        isOpen={openCheckoutPage}
        onClose={() => setOpenCheckoutPage(false)}
        cartData={cartData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </div>
  );
}
