import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRTL } from "@/contexts/RTLContext";
import SearchBar from "./SearchBar";
import { MainNav } from "./NavigationMenu";
import MobileMenu from "./MobileMenu";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { rtlAwareClasses } from "@/lib/rtl-utils";
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {
    cartItems,
    cartCount
  } = useCart();
  const {
    wishlistItems,
    wishlistCount
  } = useWishlist();
  const navigate = useNavigate();
  const {
    isRTL
  } = useRTL();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleSearchSubmit = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };
  const Logo = <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">متجر تل بغداد</span>
    </Link>;
  return <header className={cn("fixed top-0 inset-x-0 z-40 transition-all duration-300 backdrop-blur-lg", isScrolled ? "py-3 bg-white/90 shadow-sm" : "py-5 bg-white/50")}>
      <div className="container flex flex-col px-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className={cn("hidden md:block", isRTL ? "order-3" : "order-1")}>
            {Logo}
          </div>

          <div className={cn("hidden md:block flex-1 px-6", isRTL ? "order-2" : "order-2")}>
            <MainNav />
          </div>

          <div className={cn("hidden md:flex items-center", isRTL ? "space-x-reverse space-x-1 order-1" : "space-x-1 order-3")}>
            <SearchBar onSearch={handleSearchSubmit} />
            
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && <span className={cn("absolute flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full", isRTL ? "-top-1 -left-1" : "-top-1 -right-1")}>
                    {wishlistCount}
                  </span>}
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label="Shopping cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && <span className={cn("absolute flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full", isRTL ? "-top-1 -left-1" : "-top-1 -right-1")}>
                    {cartCount}
                  </span>}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <MobileMenu logo={Logo} />
        </div>
      </div>
    </header>;
};
export default Header;
