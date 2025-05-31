import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PromotionSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#1F1F2A] via-[#1F1F2A]/95 to-[#D13B28] text-white overflow-hidden relative">
      {/* Enhanced decorative elements */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#D13B28]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D13B28]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#D13B28]/15 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="space-y-7"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1.5 px-4 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
              عرض لفترة محدودة
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              تخفيضات الصيف
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              احصل على خصم يصل إلى 50% على الملحقات المختارة. أسرع، العرض ينتهي قريباً!
            </p>
            <div className="flex flex-wrap gap-4 pt-3">
              <Button 
                asChild 
                variant="secondary"
                className="bg-white text-[#1F1F2A] hover:bg-white/90 btn-hover-effect text-lg px-6 py-6 h-auto font-medium"
                size="lg"
              >
                <Link to="/deals">
                  تسوق العروض
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white/20 btn-hover-effect text-lg px-6 py-6 h-auto font-medium backdrop-blur-sm"
                size="lg"
              >
                <Link to="/shop">
                  اكتشف المزيد
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-5">
              <motion.div 
                className="bg-[#1F1F2A]/40 backdrop-blur-sm rounded-2xl p-5 rotate-2 cursor-pointer transform transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-xl hover:bg-[#1F1F2A]/60"
                whileHover={{ y: -8 }}
                onClick={() => handleCardClick("headphones")}
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <img src="/placeholder.svg" alt="سماعات لاسلكية" className="w-full h-auto rounded-lg hover:scale-110 transition-all duration-500" />
                </div>
                <div className="mt-2 text-center">
                  <div className="font-bold text-lg mb-1">سماعات لاسلكية</div>
                  <div className="flex justify-center items-center space-x-3">
                    <span className="line-through text-white/60">٩٩٫٩٩ د.ع</span>
                    <span className="font-bold text-xl text-white">٤٩٫٩٩ د.ع</span>
                  </div>
                  <div className="mt-3 bg-[#D13B28] text-white text-xs font-medium py-1 px-2 rounded-full inline-block">
                    خصم 50%
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-[#1F1F2A]/40 backdrop-blur-sm rounded-2xl p-5 -rotate-2 mt-8 cursor-pointer transform transition-all duration-300 hover:rotate-0 hover:scale-105 hover:shadow-xl hover:bg-[#1F1F2A]/60"
                whileHover={{ y: -8 }}
                onClick={() => handleCardClick("chargers")}
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <img src="/placeholder.svg" alt="شاحن سريع" className="w-full h-auto rounded-lg hover:scale-110 transition-all duration-500" />
                </div>
                <div className="mt-2 text-center">
                  <div className="font-bold text-lg mb-1">شاحن سريع</div>
                  <div className="flex justify-center items-center space-x-3">
                    <span className="line-through text-white/60">٣٩٫٩٩ د.ع</span>
                    <span className="font-bold text-xl text-white">٢٤٫٩٩ د.ع</span>
                  </div>
                  <div className="mt-3 bg-[#D13B28] text-white text-xs font-medium py-1 px-2 rounded-full inline-block">
                    خصم 37%
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
