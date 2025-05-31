import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allProducts, loadProductsFromAPI } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import ScrollToTop from "@/components/ScrollToTop";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import ProductPagination from "@/components/ProductPagination";
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp,
  X 
} from "lucide-react";
import { toast } from "sonner";
import ProductGrid from "@/components/ProductGrid";
import ProductGridToggle, { GridViewType } from "@/components/ProductGridToggle";
import { formatPrice, USD_TO_IQD_RATE } from "@/utils/currency";

const categories = [
  "جميع الفئات",
  "أغطية الهواتف",
  "سماعات الرأس",
  "الشواحن",
  "الكابلات",
  "مكبرات الصوت",
  "واقيات الشاشة",
  "الملحقات"
];

const ITEMS_PER_PAGE = 7;

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150 * USD_TO_IQD_RATE]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("جميع الفئات");
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({
    bestSeller: false,
    newArrival: false,
    featured: false,
    inStock: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [gridView, setGridView] = useState<GridViewType>("grid");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const initializeProducts = async () => {
      setIsLoading(true);
      try {
        // Load products from API
        await loadProductsFromAPI();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        toast.success("تم تحميل المنتجات بنجاح");
      } catch (error) {
        console.error("Error initializing products:", error);
        toast.error("حدث خطأ أثناء تحميل المنتجات");
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeProducts();
  }, []);
  
  // Update pagination whenever filtered products change
  useEffect(() => {
    const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    setTotalPages(total || 1);
    
    // Reset to page 1 if current page is beyond total pages
    if (currentPage > total && total > 0) {
      setCurrentPage(1);
    }
    
    // Get products for current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const applyFilters = () => {
    let filtered = [...allProducts];
    
    // Filter by price range (converted to USD)
    filtered = filtered.filter(
      product => 
        product.price * USD_TO_IQD_RATE >= priceRange[0] && 
        product.price * USD_TO_IQD_RATE <= priceRange[1]
    );
    
    // Filter by category
    if (selectedCategory !== "جميع الفئات") {
      filtered = filtered.filter(
        product => product.category.toLowerCase() === selectedCategory.toLowerCase().replace(/\s+/g, '-')
      );
    }
    
    // Apply selected filters
    if (selectedFilters.bestSeller) {
      filtered = filtered.filter(product => product.bestSeller);
    }
    
    if (selectedFilters.newArrival) {
      filtered = filtered.filter(product => product.newArrival);
    }
    
    if (selectedFilters.featured) {
      filtered = filtered.filter(product => product.featured);
    }
    
    if (selectedFilters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    
    setFilteredProducts(filtered);
    if (window.innerWidth < 768) {
      setFilterOpen(false);
    }
  };
  
  const clearFilters = () => {
    setPriceRange([0, 150 * USD_TO_IQD_RATE]);
    setSelectedCategory("جميع الفئات");
    setSelectedFilters({
      bestSeller: false,
      newArrival: false,
      featured: false,
      inStock: false,
    });
    setFilteredProducts(allProducts);
    setCurrentPage(1);
  };
  
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Shop Header */}
        <div className="bg-gradient-to-r from-[#1F1F2A]/5 to-[#1F1F2A]/10 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-[#1F1F2A]">المتجر</h1>
            <p className="text-[#A0A0A0] text-center">تصفح مجموعتنا الواسعة من المنتجات</p>
          </div>
        </div>
        
        {/* Shop Content */}
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#D13B28] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-[#A0A0A0]">جاري تحميل المنتجات...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Mobile Filter Toggle */}
              <div className="md:hidden mb-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center border-[#1F1F2A] text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter className="ml-2 h-4 w-4" />
                  {filterOpen ? "إخفاء الفلاتر" : "عرض الفلاتر"}
                </Button>
              </div>
              
              {/* Filters Sidebar */}
              <div className={`
                md:w-1/4 lg:w-1/5 
                ${filterOpen ? 'block' : 'hidden'} md:block
                fixed md:static top-24 left-4 right-4 z-20
                bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 rounded-lg
                max-h-[70vh] md:max-h-full overflow-auto
                transform transition-transform duration-300 ease-in-out
                border border-[#A0A0A0]/20
              `}>
                <div className="flex items-center justify-between sticky top-0 bg-white z-10 pb-2 mb-2 md:hidden">
                  <h3 className="font-semibold text-lg text-[#1F1F2A]">الفلاتر</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setFilterOpen(false)}
                    className="text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-3 text-[#1F1F2A]">الفئات</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div 
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`cursor-pointer py-1 px-2 rounded-md transition-colors ${
                            selectedCategory === category 
                              ? 'bg-[#D13B28]/10 text-[#D13B28] font-medium' 
                              : 'hover:bg-[#1F1F2A]/5 text-[#1F1F2A]'
                          }`}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold mb-3 text-[#1F1F2A]">نطاق السعر (د.ع)</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 150 * USD_TO_IQD_RATE]}
                        value={[priceRange[0], priceRange[1]]}
                        max={200 * USD_TO_IQD_RATE}
                        step={5000}
                        onValueChange={handlePriceChange}
                        className="mb-6"
                        trackClassName="bg-[#1F1F2A]/20"
                        rangeClassName="bg-[#D13B28]"
                        thumbClassName="bg-[#D13B28] border-[#1F1F2A]"
                      />
                      <div className="flex justify-between text-sm text-[#1F1F2A]">
                        <span>{new Intl.NumberFormat('ar-IQ').format(priceRange[0])} د.ع</span>
                        <span>{new Intl.NumberFormat('ar-IQ').format(priceRange[1])} د.ع</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Other Filters */}
                  <div>
                    <h3 className="font-semibold mb-3 text-[#1F1F2A]">فلاتر المنتجات</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="best-seller" 
                          checked={selectedFilters.bestSeller}
                          onCheckedChange={() => toggleFilter('bestSeller')}
                          className="ml-2 text-[#D13B28] border-[#A0A0A0]/30"
                        />
                        <label htmlFor="best-seller" className="text-sm cursor-pointer text-[#1F1F2A]">
                          الأكثر مبيعاً
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="new-arrival" 
                          checked={selectedFilters.newArrival}
                          onCheckedChange={() => toggleFilter('newArrival')}
                          className="ml-2 text-[#D13B28] border-[#A0A0A0]/30"
                        />
                        <label htmlFor="new-arrival" className="text-sm cursor-pointer text-[#1F1F2A]">
                          وصل حديثاً
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="featured" 
                          checked={selectedFilters.featured}
                          onCheckedChange={() => toggleFilter('featured')}
                          className="ml-2 text-[#D13B28] border-[#A0A0A0]/30"
                        />
                        <label htmlFor="featured" className="text-sm cursor-pointer text-[#1F1F2A]">
                          منتجات مميزة
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Checkbox 
                          id="in-stock" 
                          checked={selectedFilters.inStock}
                          onCheckedChange={() => toggleFilter('inStock')}
                          className="ml-2 text-[#D13B28] border-[#A0A0A0]/30"
                        />
                        <label htmlFor="in-stock" className="text-sm cursor-pointer text-[#1F1F2A]">
                          متوفر في المخزون
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Apply Filters */}
                  <div className="flex flex-col space-y-2 sticky bottom-0 bg-white pt-4 pb-2 md:relative md:pt-0 md:pb-0">
                    <Button 
                      onClick={applyFilters}
                      className="bg-[#D13B28] hover:bg-[#D13B28]/90"
                    >
                      تطبيق الفلاتر
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="border-[#1F1F2A] text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                    >
                      مسح الفلاتر
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="md:w-3/4 lg:w-4/5">
                {filteredProducts.length > 0 ? (
                  <>
                    {/* Grid view toggle */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-[#A0A0A0]">
                        عرض {paginatedProducts.length} من {filteredProducts.length} منتج
                      </div>
                      <ProductGridToggle 
                        view={gridView}
                        onChange={setGridView}
                        activeColor="text-[#D13B28]"
                        inactiveColor="text-[#A0A0A0]"
                      />
                    </div>
                    
                    <ProductGrid 
                      products={paginatedProducts}
                      view={gridView}
                      emptyMessage="لم يتم العثور على منتجات تطابق معايير البحث"
                    />
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <ProductPagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        activeColor="bg-[#D13B28] text-white"
                        inactiveColor="bg-white text-[#1F1F2A] border border-[#A0A0A0]/20"
                      />
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-[#1F1F2A]">لم يتم العثور على منتجات</h3>
                    <p className="text-[#A0A0A0] mt-2">حاول تعديل الفلاتر الخاصة بك</p>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-[#1F1F2A] text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                      onClick={clearFilters}
                    >
                      إعادة تعيين الفلاتر
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal} 
      />
      
      <ScrollToTop />
      
      {/* Overlay for mobile filters */}
      {filterOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default Shop;
