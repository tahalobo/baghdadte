
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromotionSection from "@/components/home/PromotionSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import BrandsSection from "@/components/home/BrandsSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Product } from "@/types";
import ProductDetailModal from "@/components/ProductDetailModal";
import TrendingSection from "@/components/home/TrendingSection";
import { motion } from "framer-motion";
import FeaturedBrandSection from "@/components/home/FeaturedBrandSection";
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
import BrandsShowcase from "@/components/home/BrandsShowcase";
import BannerSection from "@/components/home/BannerSection";
import { useNavigate } from "react-router-dom";
import PopularProducts from "@/components/home/PopularProducts";
import DiscountedProducts from "@/components/home/DiscountedProducts";
import CategoryFeature from "@/components/home/CategoryFeature";
import LatestProducts from "@/components/home/LatestProducts";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For modal compatibility with older code
  const openProductModal = (product: Product) => {
    navigate(`/product/${product.id}`);
  };
  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  // Scroll animations for sections
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <BannerSection />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <CategoriesSection />
        </motion.div>
        
        {/* Featured Products Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <FeaturedProducts onProductClick={openProductModal} />
        </motion.div>

        {/* Latest Products Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <LatestProducts />
        </motion.div>
        
        {/* New Brands Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <BrandsSection />
        </motion.div>
        
        {/* Category Feature - Headphones */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <CategoryFeature categoryId="headphones" />
        </motion.div>
        
        {/* Popular Products - Chargers */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <PopularProducts 
            categoryId="chargers" 
            title="شواحن حديثة وسريعة" 
            description="شحن سريع وآمن لجميع أجهزتك الذكية"
          />
        </motion.div>
        
        {/* Mid-Page Banner with redesigned background */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants} className="relative py-12 md:py-16 overflow-hidden">
          {/* Enhanced gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}} />
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">تقنية متطورة بين يديك</h2>
                <p className="text-purple-100 mb-6">اكتشف أحدث المنتجات التقنية المبتكرة واستمتع بتجربة تسوق فريدة</p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">منتجات عالية الجودة</h3>
                      <p className="text-purple-200 text-sm">جميع منتجاتنا مختارة بعناية لضمان أعلى جودة</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">أسعار تنافسية</h3>
                      <p className="text-purple-200 text-sm">نقدم أفضل الأسعار في السوق مع ضمان الجودة</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1525904097878-94fb15835963?q=80&w=2070&auto=format&fit=crop" alt="تقنية متطورة" className="rounded-lg shadow-xl" />
                  <div className="absolute -bottom-5 -right-5 h-24 w-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-80 blur-xl"></div>
                  <div className="absolute -top-5 -left-5 h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-80 blur-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Discounted Products Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <DiscountedProducts />
        </motion.div>

        {/* BrandsShowcase Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <BrandsShowcase />
        </motion.div>
        
        {/* Category Feature - Phone Cases */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <CategoryFeature categoryId="phone-cases" reversed={true} />
        </motion.div>
        
        {/* Popular Products - Accessories */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <PopularProducts 
            categoryId="accessories" 
            title="اكسسوارات متنوعة" 
            description="مجموعة من الاكسسوارات المتنوعة لجميع الأجهزة"
          />
        </motion.div>
                
        {/* Featured Brand Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <FeaturedBrandSection />
        </motion.div>
        
        {/* Special Offers Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <SpecialOffersSection />
        </motion.div>
        
        {/* Promotion Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <PromotionSection />
        </motion.div>
        
        {/* Trending Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <TrendingSection onProductClick={openProductModal} />
        </motion.div>
        
        {/* Testimonials Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <TestimonialsSection />
        </motion.div>
        
        {/* Newsletter Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <NewsletterSection />
        </motion.div>
      </main>
      
      <Footer />
      
      <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={closeProductModal} />
      
      <ScrollToTop />
    </div>
  );
};

export default Index;
