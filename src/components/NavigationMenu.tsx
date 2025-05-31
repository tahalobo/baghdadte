import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRTL } from "@/contexts/RTLContext";
import { rtlAwareClasses } from "@/lib/rtl-utils";
import { getCategories, ApiCategory } from "@/utils/categoriesApi";
import { getBrands, ApiBrand } from "@/utils/brandsApi";

const collections = [
  { name: "الوافدون الجدد", href: "/new-arrivals", description: "شاهد أحدث منتجاتنا الطازجة في المتجر" },
  { name: "الأكثر مبيعاً", href: "/best-sellers", description: "منتجاتنا الأكثر شعبية التي يحبها عملاؤنا" },
  { name: "مميز", href: "/featured", description: "منتجات منتقاة بعناية معروضة لجودتها" },
  { name: "عروض", href: "/sale", description: "عروض وخصومات رائعة لا يجب أن تفوتك" },
];

export function MainNav() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isRTL } = useRTL();
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [brands, setBrands] = useState<ApiBrand[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          getCategories(),
          getBrands()
        ]);
        
        // Show random 8 categories for navigation
        const shuffledCategories = categoriesData.sort(() => 0.5 - Math.random()).slice(0, 8);
        setCategories(shuffledCategories);
        
        // Show random 6 brands for navigation
        const shuffledBrands = brandsData.sort(() => 0.5 - Math.random()).slice(0, 6);
        setBrands(shuffledBrands);
      } catch (error) {
        console.error('Error loading navigation data:', error);
      }
    };
    
    loadData();
  }, []);

  if (isMobile) {
    return null;
  }

  // Reordering the navigation items for RTL layout
  const menuItems = [
    {
      type: "link",
      component: (
        <NavigationMenuItem key="home">
          <Link to="/">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-[#1F1F2A]/5 hover:text-[#D13B28]",
                location.pathname === "/" && "text-[#D13B28] font-medium"
              )}
            >
              الرئيسية
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )
    },
    {
      type: "dropdown",
      component: (
        <NavigationMenuItem key="categories">
          <NavigationMenuTrigger className={cn(
            "bg-transparent hover:bg-[#1F1F2A]/5 hover:text-[#D13B28]",
            categories.some(category => location.pathname === `/category/${category.id}`) && "text-[#D13B28] font-medium"
          )}>
            الفئات
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#FFFFFF] border border-[#A0A0A0]/30">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category) => (
                <li key={category.id} className="row-span-1">
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/category/${category.id}`}
                      className="flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md hover:bg-[#D13B28]/10"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-[#1F1F2A]">
                        {category.name}
                      </div>
                      <p className="text-sm leading-tight text-[#A0A0A0]">
                        تصفح منتجات {category.name.toLowerCase()} 
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
              {categories.length > 0 && (
                <li className="col-span-2">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/categories"
                      className="flex h-full w-full select-none flex-col justify-center rounded-md bg-[#D13B28]/5 hover:bg-[#D13B28]/10 p-6 no-underline outline-none focus:shadow-md text-center"
                    >
                      <div className="text-lg font-medium text-[#1F1F2A]">عرض جميع الفئات</div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    },
    {
      type: "dropdown",
      component: (
        <NavigationMenuItem key="collections">
          <NavigationMenuTrigger className={cn(
            "bg-transparent hover:bg-[#1F1F2A]/5 hover:text-[#D13B28]",
            collections.some(collection => location.pathname === collection.href) && "text-[#D13B28] font-medium"
          )}>
            المجموعات
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#FFFFFF] border border-[#A0A0A0]/30">
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              {collections.map((collection) => (
                <li key={collection.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={collection.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#D13B28]/10 hover:text-[#1F1F2A] focus:bg-[#D13B28]/10 focus:text-[#1F1F2A]"
                    >
                      <div className="text-sm font-medium leading-none text-[#1F1F2A]">
                        {collection.name}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-[#A0A0A0]">
                        {collection.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    },
    {
      type: "dropdown",
      component: (
        <NavigationMenuItem key="brands">
          <NavigationMenuTrigger className={cn(
            "bg-transparent hover:bg-[#1F1F2A]/5 hover:text-[#D13B28]",
            (location.pathname === "/brands" || location.pathname.startsWith("/brand/")) && "text-[#D13B28] font-medium"
          )}>
            العلامات التجارية
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-[#FFFFFF] border border-[#A0A0A0]/30">
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/brand/${brand.id}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#D13B28]/10 hover:text-[#1F1F2A] focus:bg-[#D13B28]/10 focus:text-[#1F1F2A]"
                    >
                      <div className="text-sm font-medium leading-none text-[#1F1F2A]">
                        {brand.name}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-[#A0A0A0]">
                        منتجات عالية الجودة من {brand.name}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
              <li className="lg:col-span-2">
                <NavigationMenuLink asChild>
                  <Link
                    to="/brands"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-[#D13B28]/5 hover:bg-[#D13B28]/10 text-center"
                  >
                    <div className="text-sm font-medium leading-none text-[#1F1F2A]">عرض جميع العلامات التجارية</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      )
    },
    {
      type: "link",
      component: (
        <NavigationMenuItem key="shop">
          <Link to="/shop">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-[#1F1F2A]/5 hover:text-[#D13B28]",
                location.pathname === "/shop" && "text-[#D13B28] font-medium"
              )}
            >
              المتجر
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )
    },
    {
      type: "link",
      component: (
        <NavigationMenuItem key="deals">
          <Link to="/deals">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-[#1F1F2A]/5 hover:text-[#D13B28]",
                location.pathname === "/deals" && "text-[#D13B28] font-medium"
              )}
            >
              العروض
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )
    },
    {
      type: "link",
      component: (
        <NavigationMenuItem key="about">
          <Link to="/about">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-[#1F1F2A]/5 hover:text-[#D13B28]",
                location.pathname === "/about" && "text-[#D13B28] font-medium"
              )}
            >
              عن المتجر
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )
    },
    {
      type: "link",
      component: (
        <NavigationMenuItem key="contact">
          <Link to="/contact">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-[#1F1F2A]/5 hover:text-[#D13B28]",
                location.pathname === "/contact" && "text-[#D13B28] font-medium"
              )}
            >
              اتصل بنا
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      )
    },
  ];

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex-row-reverse">
        {menuItems.map((item) => (
          React.cloneElement(item.component, { key: item.component.key })
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
