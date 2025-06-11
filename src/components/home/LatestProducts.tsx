import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { allProducts, loadProductsFromAPI } from "@/data/products";
import { ChevronRight, Clock } from "lucide-react";
import { Product } from "@/types";
import ProductGrid from "@/components/ProductGrid";
import { motion } from "framer-motion";

const LatestProducts: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await loadProductsFromAPI();
        const latest = allProducts.slice(-8).reverse();
        setLatestProducts(latest);
      } catch (error) {
        console.error("Error loading latest products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div 
            className="absolute top-20 right-20 w-40 h-40 rounded-full blur-2xl animate-pulse" 
            style={{ backgroundColor: 'rgba(209, 59, 40, 0.1)' }}
          />
          <div 
            className="absolute bottom-20 left-20 w-60 h-60 rounded-full blur-3xl animate-pulse" 
            style={{ 
              backgroundColor: 'rgba(209, 59, 40, 0.1)',
              animationDelay: '1s' 
            }} 
          />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div 
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                style={{ 
                  borderColor: '#D13B28',
                  borderRightColor: 'transparent'
                }}
              ></div>
              <p className="mt-4" style={{ color: '#A0A0A0' }}>
                جاري تحميل أحدث المنتجات...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (latestProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div 
          className="absolute top-20 right-20 w-40 h-40 rounded-full blur-2xl animate-pulse" 
          style={{ backgroundColor: 'rgba(209, 59, 40, 0.1)' }}
        />
        <div 
          className="absolute bottom-20 left-20 w-60 h-60 rounded-full blur-3xl animate-pulse" 
          style={{ 
            backgroundColor: 'rgba(209, 59, 40, 0.1)',
            animationDelay: '1s' 
          }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse" 
          style={{ 
            backgroundColor: 'rgba(209, 59, 40, 0.05)',
            animationDelay: '2s' 
          }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: '#D13B28' }}
            >
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold"
              style={{ color: '#1F1F2A' }}
            >
              أحدث المنتجات
            </h2>
          </div>
          <p 
            className="max-w-2xl mx-auto text-lg"
            style={{ color: '#A0A0A0' }}
          >
            اكتشف أحدث إضافاتنا من المنتجات التقنية المبتكرة والعصرية
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ProductGrid 
            products={latestProducts}
            view="grid"
            emptyMessage="لا توجد منتجات جديدة"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button 
            asChild 
            size="lg" 
            className="text-white hover:bg-[#b83222]"
            style={{ backgroundColor: '#D13B28' }}
          >
            <Link to="/shop" className="flex items-center">
              عرض جميع المنتجات
              <ChevronRight className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestProducts;
