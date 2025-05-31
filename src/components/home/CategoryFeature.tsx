import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

interface CategoryFeatureProps {
  categoryId: string;
  reversed?: boolean;
}

const CategoryFeature: React.FC<CategoryFeatureProps> = ({ categoryId, reversed = false }) => {
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return null;
  }
  
  return (
    <section className={`py-16 ${reversed ? 'bg-[#1F1F2A]/5' : 'bg-white'}`}>
      <div className="container mx-auto">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-[#D13B28]/20 to-[#D13B28]/5 rounded-xl blur-xl"></div>
              <img 
                src={category.image} 
                alt={category.name} 
                className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]" 
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold mb-4 text-[#1F1F2A]">{category.name}</h2>
              <p className="text-[#A0A0A0] mb-6 text-lg">{category.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="border-[#D13B28]/10 bg-[#D13B28]/5">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-[#D13B28] mb-1">+{category.count}</div>
                    <p className="text-sm text-[#A0A0A0]">منتج متوفر</p>
                  </CardContent>
                </Card>
                
                <Card className="border-[#1F1F2A]/10">
                  <CardContent className="p-4 flex flex-col justify-center items-center text-center h-full">
                    <p className="text-sm font-medium text-[#1F1F2A]">أحدث المنتجات والإكسسوارات</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-[#D13B28] hover:bg-[#D13B28]/90">
                  <Link to={`/category/${category.id}`}>
                    تصفح المنتجات
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-[#1F1F2A] text-[#1F1F2A] hover:bg-[#1F1F2A]/5">
                  <Link to={`/shop`}>
                    العروض الخاصة
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFeature;
