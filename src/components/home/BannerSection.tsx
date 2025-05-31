import React from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BannerSection: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Banner data with images
  const banners = [{
    id: 1,
    title: "أحدث الإكسسوارات التقنية",
    description: "استكشف مجموعتنا من الإكسسوارات الحديثة لأجهزتك الذكية بأفضل الأسعار",
    buttonText: "تسوق الآن",
    buttonLink: "/shop",
    imageUrl: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?q=80&w=2072&auto=format&fit=crop"
  }, {
    id: 2,
    title: "عروض حصرية",
    description: "خصومات رائعة على منتجات مختارة لفترة محدودة فقط",
    buttonText: "اكتشف العروض",
    buttonLink: "/deals",
    imageUrl: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=2025&auto=format&fit=crop"
  }, {
    id: 3,
    title: "ماركات عالمية",
    description: "تسوق من مجموعة واسعة من الماركات العالمية المميزة",
    buttonText: "تصفح الماركات",
    buttonLink: "/brands",
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop"
  }, {
    id: 4,
    title: "الأجهزة الذكية",
    description: "تسوق أحدث الأجهزة الذكية والساعات بأسعار تنافسية",
    buttonText: "استكشف الآن",
    buttonLink: "/shop",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop"
  }, {
    id: 5,
    title: "عروض نهاية الموسم",
    description: "خصومات حصرية تصل إلى ٥٠٪ على منتجات مختارة",
    buttonText: "احصل عليها الآن",
    buttonLink: "/deals",
    imageUrl: "https://images.unsplash.com/photo-1525904097878-94fb15835963?q=80&w=2070&auto=format&fit=crop"
  }];
  
  return (
    <section className="py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto">
        <Carousel 
          opts={{ align: "start", loop: true }} 
          className="w-full"
        >
          <CarouselContent>
            {banners.map(banner => (
              <CarouselItem key={banner.id} className="md:basis-full lg:basis-full">
                <motion.div 
                  className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden relative" 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  {/* Background image with overlay gradient */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={banner.imageUrl} 
                      alt={banner.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1F1F2A] to-[#D13B28] opacity-80"></div>
                  </div>
                  
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-10">
                    <motion.div 
                      initial="hidden" 
                      whileInView="visible" 
                      viewport={{ once: true }} 
                      variants={containerVariants} 
                      className="max-w-lg"
                    >
                      <motion.h2 
                        variants={itemVariants} 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                      >
                        {banner.title}
                      </motion.h2>
                      <motion.p 
                        variants={itemVariants} 
                        className="text-white/90 text-lg mb-6"
                      >
                        {banner.description}
                      </motion.p>
                      <motion.div variants={itemVariants}>
                        <Button 
                          asChild 
                          size="lg" 
                          className="bg-white text-[#1F1F2A] hover:bg-white/90"
                        >
                          <Link to={banner.buttonLink}>{banner.buttonText}</Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white rounded-full opacity-20"></div>
                  <div className="absolute top-16 -left-8 w-32 h-32 bg-white rounded-full opacity-20"></div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="static mx-2 transform-none bg-white/20 backdrop-blur-sm hover:bg-white/40 border-0" />
            <CarouselNext className="static mx-2 transform-none bg-white/20 backdrop-blur-sm hover:bg-white/40 border-0" />
          </div>
        </Carousel>
        
        {/* Feature boxes below the slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1F1F2A]/5 to-[#1F1F2A]/10 p-6 rounded-lg shadow-sm flex items-center"
          >
            <div className="w-12 h-12 bg-[#D13B28] rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1F1F2A]">ضمان جودة</h3>
              <p className="text-sm text-[#A0A0A0]">جميع منتجاتنا أصلية ومضمونة</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1F1F2A]/5 to-[#1F1F2A]/10 p-6 rounded-lg shadow-sm flex items-center"
          >
            <div className="w-12 h-12 bg-[#D13B28] rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 4-8-4V5l8 4 8-4v2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1F1F2A]">شحن سريع</h3>
              <p className="text-sm text-[#A0A0A0]">
                توصيل سريع لجميع مناطق ومحافظات العراق
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1F1F2A]/5 to-[#1F1F2A]/10 p-6 rounded-lg shadow-sm flex items-center"
          >
            <div className="w-12 h-12 bg-[#D13B28] rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1F1F2A]">الدفع عند الاستلام</h3>
              <p className="text-sm text-[#A0A0A0]">ادفع بعد استلام منتجاتك</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
