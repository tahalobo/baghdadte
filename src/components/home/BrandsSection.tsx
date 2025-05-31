import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBrands, ApiBrand } from "@/utils/brandsApi";

const BrandsSection: React.FC = () => {
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandsData = await getBrands();
        // Show random 8 brands for the section
        const shuffledBrands = brandsData.sort(() => 0.5 - Math.random()).slice(0, 8);
        setBrands(shuffledBrands);
      } catch (error) {
        console.error('Error loading brands:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBrands();
  }, []);

  if (loading) {
    return (
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F2A]/20 to-[#D13B28]/20">
          <div className="absolute inset-0 bg-grid-[#A0A0A0]/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1F1F2A] to-[#D13B28] bg-clip-text text-transparent">
              اشهر العلامات التجارية
            </h2>
            <p className="text-[#A0A0A0] mt-2">جاري تحميل العلامات التجارية...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F1F2A]/20 to-[#D13B28]/20">
        <div className="absolute inset-0 bg-grid-[#A0A0A0]/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D13B28]/10 to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1F1F2A] to-[#D13B28] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            اشهر العلامات التجارية
          </motion.h2>
          <motion.p 
            className="text-[#A0A0A0] mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            نحن نتشارك مع العلامات التجارية الرائدة في مجال التكنولوجيا في العالم
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/brand/${brand.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/90 backdrop-blur-sm border-[#A0A0A0]/20">
                  <CardContent className="p-6">
                    <div className="h-20 flex items-center justify-center mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                      <div className="text-2xl font-bold text-[#1F1F2A] group-hover:text-[#D13B28] transition-colors">
                        {brand.name}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-[#1F1F2A] mb-1">{brand.name}</h3>
                      <p className="text-sm text-[#A0A0A0] mb-3">منتجات عالية الجودة</p>
                      <div className="text-xs text-[#A0A0A0] mb-4">كود: {brand.code}</div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#D13B28]">منتجات متنوعة</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors -mr-2"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {brands.length > 0 && (
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm border-[#1F1F2A] text-[#1F1F2A] hover:bg-[#1F1F2A]/5">
              <Link to="/brands">عرض جميع العلامات التجارية</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandsSection;
