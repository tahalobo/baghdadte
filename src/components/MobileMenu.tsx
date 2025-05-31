import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, ShoppingBag, Heart, Search, Phone, Info, Tag, Package, Layers, LayoutGrid } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface MobileMenuProps {
  logo: React.ReactNode;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  logo
}) => {
  const {
    cartItems,
    cartCount
  } = useCart();
  const {
    wishlistItems,
    wishlistCount
  } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  const menuItems = [{
    icon: Home,
    label: "الصفحة الرئيسية",
    path: "/"
  }, {
    icon: Package,
    label: "المتجر",
    path: "/shop"
  }, {
    icon: Tag,
    label: "العروض",
    path: "/deals"
  }, {
    icon: Phone,
    label: "تواصل",
    path: "/contact"
  }, {
    icon: Info,
    label: "عنا",
    path: "/about"
  }];
  
  const categories = [{
    name: "أغطية الهاتف",
    href: "/category/phone-cases"
  }, {
    name: "سماعات الرأس",
    href: "/category/headphones"
  }, {
    name: "الشواحن",
    href: "/category/chargers"
  }, {
    name: "الكيبلات",
    href: "/category/cables"
  }, {
    name: "سماعات",
    href: "/category/speakers"
  }, {
    name: "شاشات الحماية",
    href: "/category/screen-protectors"
  }, {
    name: "الإكسسوارات",
    href: "/category/accessories"
  }];
  
  const collections = [{
    name: "الوافدون الجدد",
    href: "/new-arrivals",
    description: "شاهد أحدث منتجاتنا الطازجة في المتجر"
  }, {
    name: "الأكثر مبيعاً",
    href: "/best-sellers",
    description: "منتجاتنا الأكثر شعبية التي يحبها عملاؤنا"
  }, {
    name: "مميز",
    href: "/featured",
    description: "منتجات منتقاة بعناية ومعروضة بعناية لجودتها"
  }, {
    name: "عروض",
    href: "/sale",
    description: "عروض وخصومات رائعة لا يجب أن تفوتك"
  }];
  
  const brands = [{
    name: "Apple",
    href: "/brand/apple"
  }, {
    name: "Samsung",
    href: "/brand/samsung"
  }, {
    name: "Sony",
    href: "/brand/sony"
  }, {
    name: "Bose",
    href: "/brand/bose"
  }, {
    name: "JBL",
    href: "/brand/jbl"
  }, {
    name: "Anker",
    href: "/brand/anker"
  }];
  
  return <div className="md:hidden flex items-center justify-between w-full px-4">
      <div className="flex-1">
        {logo}
      </div>
      
      <div className="flex items-center gap-2">
        <Link to="/search" className="p-2 text-[#1F1F2A] hover:text-[#D13B28]">
          <Search className="h-5 w-5" />
        </Link>
        
        <Link to="/wishlist" className="p-2 relative text-[#1F1F2A] hover:text-[#D13B28]">
          <Heart className="h-5 w-5" />
          {wishlistCount > 0 && <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#D13B28] rounded-full">
              {wishlistCount}
            </span>}
        </Link>
        
        <Link to="/cart" className="p-2 relative text-[#1F1F2A] hover:text-[#D13B28]">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#D13B28] rounded-full">
              {cartCount}
            </span>}
        </Link>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-[#1F1F2A] hover:bg-[#1F1F2A]/5">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-full max-w-[85vw] sm:max-w-sm overflow-hidden bg-[#FFFFFF] border-l border-[#A0A0A0]/30">
            <div className="flex flex-col h-full">
              <div className="p-4 flex items-center justify-between border-b border-[#A0A0A0]/30">
                {logo}
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-[#1F1F2A] hover:bg-[#1F1F2A]/5">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-4 max-h-[calc(100vh-140px)]">
                <ul className="space-y-2 px-2">
                  {menuItems.map(item => <li key={item.path}>
                      <Link to={item.path} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1F1F2A]/5" onClick={closeMenu}>
                        <item.icon className="h-5 w-5 text-[#D13B28]" />
                        <span className="font-medium text-[#1F1F2A]">{item.label}</span>
                      </Link>
                    </li>)}
                  
                  {/* Categories Collapsible */}
                  <li>
                    <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen} className="w-full">
                      <CollapsibleTrigger className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1F1F2A]/5 w-full text-right">
                        <LayoutGrid className="h-5 w-5 text-[#D13B28]" />
                        <span className="font-medium flex-1 text-right text-[#1F1F2A]">الفئات</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isCategoriesOpen ? 'transform rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pr-12 pl-4 space-y-2 py-2 text-right">
                          {categories.map(category => <Link key={category.href} to={category.href} className="block py-2 text-sm hover:text-[#D13B28] text-[#1F1F2A]" onClick={closeMenu}>
                              {category.name}
                            </Link>)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>

                  {/* Collections Collapsible */}
                  <li>
                    <Collapsible open={isCollectionsOpen} onOpenChange={setIsCollectionsOpen} className="w-full">
                      <CollapsibleTrigger className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1F1F2A]/5 w-full text-right">
                        <Layers className="h-5 w-5 text-[#D13B28]" />
                        <span className="font-medium flex-1 text-right text-[#1F1F2A]">المجموعات</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isCollectionsOpen ? 'transform rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pr-12 pl-4 space-y-2 py-2 text-right">
                          {collections.map(collection => <Link key={collection.href} to={collection.href} className="block py-2 text-sm hover:text-[#D13B28] text-[#1F1F2A]" onClick={closeMenu}>
                              {collection.name}
                            </Link>)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                  
                  {/* Brands Collapsible */}
                  <li>
                    <Collapsible open={isBrandsOpen} onOpenChange={setIsBrandsOpen} className="w-full">
                      <CollapsibleTrigger className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#1F1F2A]/5 w-full text-right">
                        <Package className="h-5 w-5 text-[#D13B28]" />
                        <span className="font-medium flex-1 text-right text-[#1F1F2A]">العلامات التجارية</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isBrandsOpen ? 'transform rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pr-12 pl-4 space-y-2 py-2 text-right">
                          {brands.map(brand => <Link key={brand.href} to={brand.href} className="block py-2 text-sm hover:text-[#D13B28] text-[#1F1F2A]" onClick={closeMenu}>
                              {brand.name}
                            </Link>)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                </ul>
              </nav>
              
              <div className="p-4 border-t border-[#A0A0A0]/30 mt-auto">
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/wishlist" onClick={closeMenu}>
                    <Button variant="outline" className="w-full border border-[#A0A0A0]/30 text-[#1F1F2A] hover:bg-[#1F1F2A]/5">
                      <Heart className="mr-2 h-4 w-4" />
                      قائمة الرغبات
                    </Button>
                  </Link>
                  <Link to="/cart" onClick={closeMenu}>
                    <Button className="w-full bg-[#D13B28] hover:bg-[#D13B28]/90">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      سلة التسوق
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>;
};

export default MobileMenu;
