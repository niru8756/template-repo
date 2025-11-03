"use client";

import { useRouter, usePathname } from "next/navigation";
import { LogOut, ShoppingCart, Package, Home, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { UnisoukNameComponent } from "@/assets/SVGElement/UnisoukComponent";
import { LogoComponent } from "@/assets/SVGElement/LogoComponent";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart(); // ✅ Get cart count
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { name: "Products", path: "/products", icon: Home },
    {
      name: "Cart",
      path: "/cart",
      icon: ShoppingCart,
      badge: cartCount, // ✅ Add badge
    },
    { name: "Orders", path: "/orders", icon: Package },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      try {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("customerId");
        localStorage.removeItem("cartId");
        localStorage.removeItem("cartData");
      } catch (storageError) {
        console.error("Error clearing storage during logout:", storageError);
        setError("Failed to clear local data. Please try again.");
        return;
      }

      try {
        router.push("/auth/login");
      } catch (routerError) {
        console.error("Routing error during logout:", routerError);
        setError("Failed to redirect. Please refresh the page.");
      }
    } catch (err) {
      console.error("Unexpected logout error:", err);
      setError("An unexpected error occurred during logout.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/verify-email"
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={() => router.push("/products")}
        >
          <LogoComponent />
          <UnisoukNameComponent />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              pathname === tab.path || pathname.startsWith(`${tab.path}/`);

            return (
              <button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-orange-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{tab.name}</span>
                {/* ✅ Cart Badge */}
                {tab.badge ? (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Logout + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          {/* Logout (Desktop only) */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Logout"
          >
            {isLoggingOut ? (
              <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogOut className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">Logout</span>
          </button>

          {/* Hamburger Menu (Mobile only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-md">
          <div className="flex flex-col p-3 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive =
                pathname === tab.path || pathname.startsWith(`${tab.path}/`);
              return (
                <button
                  key={tab.path}
                  onClick={() => {
                    router.push(tab.path);
                    setIsMenuOpen(false);
                  }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                  {/* ✅ Cart Badge Mobile */}
                  {tab.badge ? (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {tab.badge > 99 ? "99+" : tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-orange-600 transition disabled:opacity-50"
            >
              {isLoggingOut ? (
                <div className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogOut className="w-5 h-5" />
              )}
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;