import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Phone as WhatsApp, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    if (email) {
      toast({
        title: "Subscription Successful",
        description: `شكراً لاشتراكك مع${email}.ستصلك رسالتنا الإخبارية قريباً.`
      });
      form.reset();
    }
  };

  return (
    <footer className="bg-[#1F1F2A] text-[#FFFFFF]">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-[#A0A0A0] border-opacity-30 pb-12">
          <motion.div 
            className="flex items-center space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-[#2d2d3a] p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#D13B28" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">شحن سريع</h3>
              <p className="text-sm text-[#A0A0A0]">في جميع المحافظات العراقية</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[#2d2d3a] p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#D13B28" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="8"></circle>
                <path d="m12 8 4 4"></path>
                <path d="m12 8-4 4"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">ضمان الجودة</h3>
              <p className="text-sm text-[#A0A0A0]">منتجات أصلية، مضمونة</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-[#2d2d3a] p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#D13B28" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">دعم العملاء</h3>
              <p className="text-sm text-[#A0A0A0]">7 أيام في الأسبوع، 9 صباحاً - 9 مساءً</p>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">متجر تل بغداد</h2>
            <p className="text-[#A0A0A0] max-w-xs">
              وجهتك الموثوقة للمنتجات التقنية المتميزة في العراق. نحن نقدم مجموعة واسعة من الأدوات والإكسسوارات الأصلية التي يتم توصيلها إلى باب منزلك.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/9647XXXXXXXX" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors"
              >
                <WhatsApp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold border-b border-[#A0A0A0] border-opacity-30 pb-2">روابط سريعة</h3>
            <div className="grid grid-cols-1 gap-2">
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/shop" 
                    className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors flex items-center"
                  >
                    <span className="h-1 w-1 bg-[#A0A0A0] rounded-full mr-2"></span>
                    المتجر
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors flex items-center"
                  >
                    <span className="h-1 w-1 bg-[#A0A0A0] rounded-full mr-2"></span>
                    عنا
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors flex items-center"
                  >
                    <span className="h-1 w-1 bg-[#A0A0A0] rounded-full mr-2"></span>
                    تواصل
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/brands" 
                    className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors flex items-center"
                  >
                    <span className="h-1 w-1 bg-[#A0A0A0] rounded-full mr-2"></span>
                    العلامات التجارية
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/wishlist" 
                    className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors flex items-center"
                  >
                    <span className="h-1 w-1 bg-[#A0A0A0] rounded-full mr-2"></span>
                    قائمة الرغبات
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cart" 
                    className="text-[#A0A0A0] hover:text-[#D13B28] transition-colors flex items-center"
                  >
                    <span className="h-1 w-1 bg-[#A0A0A0] rounded-full mr-2"></span>
                    سلة التسوق
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold border-b border-[#A0A0A0] border-opacity-30 pb-2">تواصل</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#D13B28]" />
                <span className="text-[#A0A0A0]">+964 0773 631 7779</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#D13B28]" />
                <span className="text-[#A0A0A0]">telbaghdad5@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section - Remains unchanged as it's commented out */}
        </div>

        <hr className="border-[#A0A0A0] border-opacity-30 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#A0A0A0] text-sm">
            &copy; {new Date().getFullYear()} كل الحقوق محفوظة لصالح متجر تل بغداد
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
