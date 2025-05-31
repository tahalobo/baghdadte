import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ShoppingBag, Heart, Clock, BadgeCheck, Shield, Eye, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { formatPrice } from "@/utils/currency";

interface ProductCardProps {
  product: Product;
  className?: string;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, onProductClick }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();
  
  const handleCardClick = (e: React.MouseEvent) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    setTimeout(() => {
      addToCart(product);
      setIsAddingToCart(false);
      toast.success(`${product.name} added to cart!`);
    }, 600);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} تمت إزالتها من قائمة الرغبات`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} أضيفت إلى قائمة الأمنيات!`);
    }
  };

  const discountedPrice = product.discount 
    ? (product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <motion.div 
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white border border-transparent transition-all duration-300 hover:border-[#D13B28]/20 hover:shadow-xl h-full flex flex-col",
        className
      )}
      onClick={handleCardClick}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] bg-gradient-to-br from-[#1F1F2A]/10 to-[#1F1F2A]/5">
          <motion.img 
            src="/lovable-uploads/e9f3b555-0da2-47b3-a199-b5ee1fced447.png"
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1, rotate: isHovered ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <motion.button 
              className={cn(
                "flex items-center justify-center rounded-full w-10 h-10 shadow-md transition-colors",
                isInWishlist(product.id) 
                  ? "bg-[#D13B28]/10 text-[#D13B28] hover:bg-[#D13B28]/20" 
                  : "bg-white text-[#1F1F2A] hover:bg-[#D13B28] hover:text-white"
              )}
              onClick={toggleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={cn(
                "h-5 w-5", 
                isInWishlist(product.id) && "fill-[#D13B28]"
              )} />
            </motion.button>
            
            <motion.button 
              className={cn(
                "flex items-center justify-center rounded-full bg-[#D13B28] w-10 h-10 text-white shadow-md transition-colors hover:bg-[#D13B28]/90",
                (product.stock === 0 || isAddingToCart) && "cursor-not-allowed opacity-60"
              )}
              disabled={product.stock === 0 || isAddingToCart}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAddingToCart ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <ShoppingBag className="h-5 w-5" />
              )}
            </motion.button>

            <motion.button 
              className="flex items-center justify-center rounded-full bg-white w-10 h-10 text-[#1F1F2A] shadow-md transition-colors hover:bg-[#1F1F2A]/10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.bestSeller && (
            <Badge className="bg-[#1F1F2A] text-white hover:bg-[#1F1F2A]/90 text-xs rounded-full px-2 py-0.5 shadow-sm">
              الأكثر مبيعاً
            </Badge>
          )}
          
          {product.newArrival && (
            <Badge className="bg-[#1F1F2A] text-white hover:bg-[#1F1F2A]/90 text-xs rounded-full px-2 py-0.5 shadow-sm">
              جديد
            </Badge>
          )}
          
          {product.featured && (
            <Badge className="bg-[#1F1F2A] text-white hover:bg-[#1F1F2A]/90 text-xs rounded-full px-2 py-0.5 shadow-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              مميز
            </Badge>
          )}
        </div>
        
        {product.discount && (
          <div className="absolute right-2 top-2">
            <Badge className="bg-[#D13B28] rounded-full px-1.5 py-0.5 text-[10px] font-medium shadow-sm">
              -{product.discount}%
            </Badge>
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <span className="rounded-full bg-white/90 px-6 py-2 font-semibold text-[#D13B28] shadow-md">
              غير متوفر من المخزون
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col p-4 flex-grow">
        <span className="text-xs font-medium uppercase tracking-wider text-[#D13B28]/80">
          {product.category.replace('-', ' ')}
        </span>
        
        <h3 className="mt-1 line-clamp-2 min-h-[40px] font-bold text-[#1F1F2A] transition-colors group-hover:text-[#D13B28]/90">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center text-xs font-medium text-[#A0A0A0]">
            <Tag className="h-3 w-3 mr-1" />
            <span>ID: {product.id}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-3 flex items-end justify-between">
          <div className="flex flex-col">
            {product.discount ? (
              <>
                <span className="text-sm font-medium text-[#A0A0A0] line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl font-bold text-[#D13B28]">
                  {formatPrice(discountedPrice)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-[#D13B28]">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {product.stock > 0 && product.stock <= 5 && (
            <div className="flex items-center text-xs font-medium text-[#D13B28] bg-[#D13B28]/10 px-2 py-1 rounded-full">
              <Clock className="mr-1 h-3 w-3" />
              <span>فقط {product.stock} بقي</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#A0A0A0]">
          {product.featured && (
            <div className="flex items-center bg-[#1F1F2A]/5 px-2 py-1 rounded-full">
              <BadgeCheck className="mr-1 h-3 w-3 text-[#D13B28]" />
              <span>مميز</span>
            </div>
          )}
          <div className="flex items-center bg-[#1F1F2A]/5 px-2 py-1 rounded-full">
            <Shield className="mr-1 h-3 w-3 text-[#D13B28]" />
            <span>ضمان</span>
          </div>
        </div>

        <div className="mt-4 sm:hidden">
          <Button 
            onClick={handleAddToCart} 
            disabled={product.stock === 0 || isAddingToCart}
            className="w-full rounded-full bg-[#D13B28] hover:bg-[#D13B28]/90"
            variant="default"
            size="sm"
          >
            {isAddingToCart ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                أضف...
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                اضافة للسلة
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
