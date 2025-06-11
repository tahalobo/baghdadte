
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
        // Get the latest 8 products (you can sort by date if you have that field, for now we'll take the last 8)
        const latest = allProducts.slice(-8).reverse(); // Get last 8 and reverse to show newest first
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
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-20 w-40 h-40 bg-emerald-200/30 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-60 h-60 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">جاري تحميل أحدث المنتجات...</p>
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
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent transform rotate-12" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-40 h-40 bg-emerald-200/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
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
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              أحدث المنتجات
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
          <Button asChild size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
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
