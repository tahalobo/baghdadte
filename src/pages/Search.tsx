import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import ProductGridToggle, { GridViewType } from "@/components/ProductGridToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { searchProducts, getProductsByCategory, categories } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Search as SearchIcon, X, Filter, ChevronDown } from "lucide-react";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFilter, setSelectedFilter] = useState<string>("relevance");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState<GridViewType>("grid");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      performSearch(searchQuery);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
    setSearchResults([]);
  };
  
  const performSearch = (query: string) => {
    setIsSearching(true);
    
    setTimeout(() => {
      let results = searchProducts(query);
      
      if (selectedCategory !== "all") {
        results = results.filter(product => product.category === selectedCategory);
      }
      
      results = sortResults(results, selectedFilter);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };
  
  const sortResults = (products: Product[], filter: string) => {
    switch (filter) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...products].filter(p => p.newArrival).concat(
          [...products].filter(p => !p.newArrival)
        );
      default:
        return products;
    }
  };
  
  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  const applyFilters = () => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  };
  
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedFilter]);
  
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF]">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-[#1F1F2A]">البحث عن المنتجات</h1>
            
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-20 border border-[#A0A0A0]/30 text-[#1F1F2A]"
              />
              <div className="absolute inset-y-0 left-0 flex items-center">
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={clearSearch}
                    className="h-full text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="rounded-r-none bg-[#D13B28] hover:bg-[#D13B28]/90"
                >
                  <SearchIcon className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="ml-2 md:hidden border border-[#A0A0A0]/30 text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                >
                  <Filter className="ml-2 h-4 w-4" />
                  الفلاتر
                  <ChevronDown className={`mr-1 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                {initialQuery && (
                  <div className="text-sm text-[#1F1F2A]">
                    {isSearching ? (
                      <span>جارِ البحث...</span>
                    ) : (
                      <span>
                        تم العثور على <span className="font-semibold">{searchResults.length}</span> نتيجة لـ&nbsp;
                        <span className="font-semibold">"{initialQuery}"</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <ProductGridToggle
                  view={gridView}
                  onChange={setGridView}
                />
                
                <div className={`w-full md:w-auto ${showFilters ? 'block' : 'hidden md:block'}`}>
                  <Tabs defaultValue="relevance" value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-[#FFFFFF]">
                      <TabsTrigger 
                        value="relevance" 
                        className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
                      >
                        الصلة
                      </TabsTrigger>
                      <TabsTrigger 
                        value="price-low" 
                        className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
                      >
                        السعر: الأقل
                      </TabsTrigger>
                      <TabsTrigger 
                        value="price-high" 
                        className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
                      >
                        السعر: الأعلى
                      </TabsTrigger>
                      <TabsTrigger 
                        value="rating" 
                        className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
                      >
                        التقييم
                      </TabsTrigger>
                      <TabsTrigger 
                        value="newest" 
                        className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
                      >
                        الأحدث
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
            
            <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="flex flex-wrap bg-[#FFFFFF]">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
                  >
                    جميع الفئات
                  </TabsTrigger>
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {isSearching ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#A0A0A0]/30 border-t-[#D13B28]"></div>
                <p className="text-[#A0A0A0]">جارِ البحث عن المنتجات...</p>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="mb-10">
              <ProductGrid 
                products={searchResults} 
                view={gridView}
                onProductClick={handleProductClick}
              />
            </div>
          ) : initialQuery ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-[#1F1F2A]/5 p-8 text-center">
              <SearchIcon className="mb-4 h-12 w-12 text-[#A0A0A0]" />
              <h2 className="mb-2 text-xl font-semibold text-[#1F1F2A]">لم يتم العثور على نتائج</h2>
              <p className="mb-4 text-[#A0A0A0]">
                لم نتمكن من العثور على أي منتجات تطابق "{initialQuery}".
              </p>
              <p className="text-[#A0A0A0]">حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه.</p>
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-[#1F1F2A]/5 p-8 text-center">
              <SearchIcon className="mb-4 h-12 w-12 text-[#A0A0A0]" />
              <h2 className="mb-2 text-xl font-semibold text-[#1F1F2A]">ابحث عن المنتجات</h2>
              <p className="text-[#A0A0A0]">
                أدخل مصطلح البحث أعلاه للعثور على المنتجات.
              </p>
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
    </div>
  );
};

export default Search;
