import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getCategories, ApiCategory } from "@/utils/categoriesApi";
import { Button } from "@/components/ui/button";

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        // Show random 6 categories for the section
        const shuffledCategories = categoriesData.sort(() => 0.5 - Math.random()).slice(0, 6);
        setCategories(shuffledCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-b from-[#1F1F2A]/5 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F1F2A]">تسوق حسب الفئة</h2>
            <p className="text-[#A0A0A0] mt-2">جاري تحميل الفئات...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-[#1F1F2A]/5 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-[#1F1F2A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            تسوق حسب الفئة
          </motion.h2>
          <motion.p 
            className="text-[#A0A0A0] mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            تصفح مجموعتنا الواسعة من المنتجات حسب الفئة
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/category/${category.id}`}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#A0A0A0]/20 hover:shadow-md transition-shadow duration-300 text-center group">
                  <div className="h-16 flex items-center justify-center mb-4">
                    <div className="text-lg font-bold text-[#1F1F2A] group-hover:text-[#D13B28] transition-colors">
                      {category.name}
                    </div>
                  </div>
                  <h3 className="font-medium text-[#1F1F2A] mb-1">{category.name}</h3>
                  <p className="text-sm text-[#A0A0A0]">كود: {category.code}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {categories.length > 0 && (
          <div className="text-center mt-8">
            <Button 
              asChild 
              variant="outline"
              className="border-[#1F1F2A] text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
            >
              <Link to="/categories">عرض جميع الفئات</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
