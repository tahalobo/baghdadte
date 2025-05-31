import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Heart, Share2, Star, Shield, Truck, Package, RefreshCw, ChevronDown, Plus, Minus, Clock, Check, AlertCircle, Bookmark, BadgeCheck, Award } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { getProductById, getRelatedProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

// Exchange rate constant (1 USD = 1300 IQD as example)
const EXCHANGE_RATE = 1300;
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ar-IQ', {
    style: 'currency',
    currency: 'IQD',
    maximumFractionDigits: 0
  }).format(price * EXCHANGE_RATE);
};
const ProductDetail = () => {
  const {
    productId
  } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState("details");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({
    x: 0,
    y: 0
  });
  const {
    addToCart
  } = useCart();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useWishlist();
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Fetch product details
    setIsLoading(true);
    if (productId) {
      const fetchedProduct = getProductById(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        // Get related products (same category)
        const related = getRelatedProducts(fetchedProduct);
        setRelatedProducts(Array.isArray(related) ? related : []);
      }
    }
    setIsLoading(false);
  }, [productId]);
  const handleAddToCart = () => {
    if (product) {
      if (product.stock === 0) {
        toast.error("عذراً، المنتج غير متوفر حالياً");
        return;
      }
      addToCart(product, quantity);
      toast.success(`تمت إضافة ${product.name} إلى سلة التسوق`);
    }
  };
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };
  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} تمت إزالتها من قائمة الرغبات`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} أضيفت إلى قائمة الأمنيات!`);
    }
  };
  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const {
      left,
      top,
      width,
      height
    } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;
    setZoomPosition({
      x,
      y
    });
  };
  const shareProduct = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.name,
        text: `تحقق من ${product.name}`,
        url: window.location.href
      }).then(() => console.log('Shared successfully')).catch(error => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('تم نسخ رابط المنتج');
    }
  };
  if (isLoading) {
    return <div className="min-h-screen">
        <Header />
        <div className="container mx-auto mt-28 mb-8 flex justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-[#D13B28] rounded-full border-t-transparent"></div>
        </div>
        <Footer />
      </div>;
  }
  if (!product) {
    return <div className="min-h-screen">
        <Header />
        <div className="container mx-auto mt-28 mb-8 p-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-[#1F1F2A]">عذراً، لم يتم العثور على المنتج</h1>
            <p className="mt-4 mb-8 text-[#1F1F2A]">المنتج الذي تبحث عنه غير موجود أو تم إزالته</p>
            <Button asChild className="bg-[#D13B28] hover:bg-[#D13B28]/90">
              <Link to="/shop">العودة إلى المتجر</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>;
  }
  const productImages = ["/lovable-uploads/e9f3b555-0da2-47b3-a199-b5ee1fced447.png", "https://images.unsplash.com/photo-1546868871-7041f2a55e12", "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"];
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
  return <div className="min-h-screen bg-[#FFFFFF]">
      <Header />
      
      <main className="container mx-auto py-8 px-4 mt-24">
        {/* Breadcrumbs */}
        <nav className="flex py-3 text-sm">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link to="/" className="text-[#A0A0A0] hover:text-[#D13B28] inline-flex items-center">
                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                الرئيسية
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-[#A0A0A0] mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <Link to="/shop" className="text-[#A0A0A0] hover:text-[#D13B28] ms-1 md:ms-2">المتجر</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-[#A0A0A0] mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <Link to={`/category/${product.category}`} className="text-[#A0A0A0] hover:text-[#D13B28] ms-1 md:ms-2">
                  {product.category.replace('-', ' ')}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-[#A0A0A0] mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="text-[#1F1F2A] ms-1 md:ms-2 font-medium">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Details Section */}
        <div className="bg-[#FFFFFF] rounded-xl shadow-sm overflow-hidden p-4 md:p-8 mb-8 border border-[#A0A0A0]/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg bg-[#FFFFFF] cursor-zoom-in" onMouseMove={handleImageZoom} onMouseEnter={() => setIsZoomed(true)} onMouseLeave={() => setIsZoomed(false)} onClick={() => setIsZoomed(!isZoomed)}>
                <div className={`w-full h-full transition-all duration-200 ${isZoomed ? 'scale-150' : 'scale-100'}`} style={isZoomed ? {
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              } : undefined}>
                  <img src={productImages[selectedImage]} alt={product.name} className="w-full h-full object-contain" />
                </div>
                
                {product.discount > 0 && <div className="absolute top-4 right-4">
                    <Badge className="rounded-full px-3 py-1.5 text-sm font-medium animate-pulse bg-[#D13B28]">
                      خصم {product.discount}%
                    </Badge>
                  </div>}
                
                {product.newArrival && <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 rounded-full px-3 py-1.5 text-sm font-medium">
                      جديد
                    </Badge>
                  </div>}

                {product.bestSeller && <div className="absolute bottom-4 left-4">
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-3 py-1.5 text-sm font-medium">
                      <Award className="w-4 h-4 mr-1" />
                      الأكثر مبيعاً
                    </Badge>
                  </div>}

                {/* Image zoom instructions */}
                <div className="absolute bottom-4 right-4 bg-[#1F1F2A]/80 text-white px-2 py-1 rounded-md text-xs flex items-center">
                  <Plus className="h-3 w-3 mr-1" />
                  اضغط للتكبير
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img, index) => <motion.div key={index} whileHover={{
                scale: 1.05
              }} onClick={() => setSelectedImage(index)} className={`cursor-pointer aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-[#D13B28] ring-2 ring-[#D13B28]/20' : 'border-transparent'}`}>
                    <img src={img} alt={`${product.name} - صورة ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.div>)}
              </div>
              
              {/* Product Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t border-[#A0A0A0]/30">
                <div className="flex flex-col items-center justify-center bg-[#FFFFFF] p-3 rounded-lg border border-[#A0A0A0]/30">
                  <Shield className="h-6 w-6 text-[#D13B28] mb-1" />
                  <span className="text-xs text-[#1F1F2A] text-center">ضمان لمدة عام</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-[#FFFFFF] p-3 rounded-lg border border-[#A0A0A0]/30">
                  <Truck className="h-6 w-6 text-[#D13B28] mb-1" />
                  <span className="text-xs text-[#1F1F2A] text-center">شحن مجاني</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-[#FFFFFF] p-3 rounded-lg border border-[#A0A0A0]/30">
                  <Package className="h-6 w-6 text-[#D13B28] mb-1" />
                  <span className="text-xs text-[#1F1F2A] text-center">منتج أصلي</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-[#FFFFFF] p-3 rounded-lg border border-[#A0A0A0]/30">
                  <RefreshCw className="h-6 w-6 text-[#D13B28] mb-1" />
                  <span className="text-xs text-[#1F1F2A] text-center">استرجاع مجاني</span>
                </div>
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline" className="text-[#1F1F2A] border-[#A0A0A0]/30">
                    {product.category.replace('-', ' ')}
                  </Badge>
                  {product.bestSeller && <Badge className="bg-amber-500 hover:bg-amber-600">الأكثر مبيعاً</Badge>}
                  {product.newArrival && <Badge className="bg-emerald-500 hover:bg-emerald-600">جديد</Badge>}
                  {product.featured && <Badge className="bg-purple-500 hover:bg-purple-600">منتج مميز</Badge>}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#1F1F2A]">{product.name}</h1>
                
                
                
                <div className="flex items-center mb-4">
                  <span className="text-xl font-medium text-[#1F1F2A]">ID: {product.id}</span>
                  <div className="h-4 w-px bg-[#A0A0A0]/30 mx-2"></div>
                  <span className="text-sm text-[#A0A0A0]">الباركود: {1000000 + parseInt(product.id)}</span>
                </div>
                
                {/* Product Price */}
                <div className="flex items-baseline space-x-4 rtl:space-x-reverse mb-6">
                  {product.discount ? <>
                      <div className="flex flex-col">
                        <span className="text-4xl font-bold text-[#D13B28]">
                          {formatPrice(discountedPrice)}
                        </span>
                        <span className="text-lg text-[#A0A0A0] line-through">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <div className="bg-[#D13B28]/10 text-[#D13B28] px-3 py-1 rounded-lg text-sm font-medium">
                        توفير {formatPrice(product.price - discountedPrice)}
                      </div>
                    </> : <span className="text-4xl font-bold text-[#D13B28]">
                      {formatPrice(product.price)}
                    </span>}
                </div>
                
                <Separator className="my-6 bg-[#A0A0A0]/30" />
                
                {/* Stock Status */}
                {product.stock > 0 ? <div className="text-green-600 flex items-center mb-4">
                    
                    متوفر في المخزون ({product.stock} قطعة)
                    {product.stock <= 5 && <span className="bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full mr-2 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        كمية محدودة
                      </span>}
                  </div> : <div className="text-[#D13B28] flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#D13B28] mr-2"></div>
                    غير متوفر حالياً
                    <Button variant="link" size="sm" className="mr-2 p-0 text-[#1F1F2A]">
                      أشعرني عند التوفر
                    </Button>
                  </div>}
                
                {/* Estimated Delivery */}
                <div className="bg-[#1F1F2A]/10 text-[#1F1F2A] p-3 rounded-lg flex items-start mb-6">
                  <Truck className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-[#1F1F2A]" />
                  <div>
                    <p className="font-medium">التوصيل السريع</p>
                    <p className="text-sm">اطلب الآن للحصول عليه بحلول {estimatedDelivery.toLocaleDateString('ar-IQ')}</p>
                  </div>
                </div>
                
                {/* Add to Cart */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center border border-[#A0A0A0]/30 rounded-lg bg-[#FFFFFF]">
                    <button className="px-4 py-3 text-[#1F1F2A] transition-colors hover:text-[#D13B28] hover:bg-[#1F1F2A]/5" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-3 font-medium text-lg min-w-[3rem] text-center text-[#1F1F2A]">{quantity}</span>
                    <button className="px-4 py-3 text-[#1F1F2A] transition-colors hover:text-[#D13B28] hover:bg-[#1F1F2A]/5" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <Button size="lg" className="flex-grow text-lg bg-[#D13B28] hover:bg-[#D13B28]/90" onClick={handleAddToCart} disabled={product.stock === 0}>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    إضافة إلى السلة
                  </Button>
                </div>
                
                {/* Quick Actions */}
                <div className="flex gap-2 mb-6">
                  <Button variant="outline" size="lg" className={cn("flex-1 border-[#A0A0A0]/30 text-[#1F1F2A] hover:bg-[#1F1F2A]/5", isInWishlist(product.id) && "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700")} onClick={toggleWishlist}>
                    <Heart className={cn("mr-2 h-5 w-5", isInWishlist(product.id) && "fill-current")} />
                    {isInWishlist(product.id) ? "في قائمة الرغبات" : "أضف للمفضلة"}
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-[52px] w-[52px] border-[#A0A0A0]/30 text-[#1F1F2A] hover:bg-[#1F1F2A]/5" onClick={shareProduct}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Product Highlights */}
                <div className="space-y-2">
                  
                  <ul className="space-y-1">
                    
                    
                    
                    
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }} className="mb-12 bg-[#FFFFFF] rounded-xl shadow-sm overflow-hidden border border-[#A0A0A0]/30">
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-[#A0A0A0]/30">
              <TabsList className="w-full justify-start overflow-x-auto flex-nowrap px-4 h-16 bg-[#FFFFFF]">
                <TabsTrigger value="details" className="px-8 text-[#1F1F2A] data-[state=active]:text-[#D13B28] data-[state=active]:border-b-2 data-[state=active]:border-[#D13B28]">المواصفات</TabsTrigger>
                
                <TabsTrigger value="shipping" className="px-8 text-[#1F1F2A] data-[state=active]:text-[#D13B28] data-[state=active]:border-b-2 data-[state=active]:border-[#D13B28]">الشحن والإرجاع</TabsTrigger>
                <TabsTrigger value="faq" className="px-8 text-[#1F1F2A] data-[state=active]:text-[#D13B28] data-[state=active]:border-b-2 data-[state=active]:border-[#D13B28]">الأسئلة الشائعة</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="details" className="p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#1F1F2A]">المواصفات التقنية</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#A0A0A0]/30">
                      <h4 className="font-medium mb-3 text-[#D13B28]">الأبعاد والوزن</h4>
                      <ul className="space-y-3 text-[#1F1F2A]">
                        <li className="flex justify-between border-b border-dashed border-[#A0A0A0]/30 pb-2">
                          <span className="text-[#A0A0A0]">الأبعاد:</span>
                          <span className="font-medium">15 × 10 × 5 سم</span>
                        </li>
                        <li className="flex justify-between border-b border-dashed border-[#A0A0A0]/30 pb-2">
                          <span className="text-[#A0A0A0]">الوزن:</span>
                          <span className="font-medium">350 جرام</span>
                        </li>
                        <li className="flex justify-between border-b border-dashed border-[#A0A0A0]/30 pb-2">
                          <span className="text-[#A0A0A0]">الحجم الصافي:</span>
                          <span className="font-medium">750 مل</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-[#FFFFFF] p-4 rounded-lg border border-[#A0A0A0]/30">
                      <h4 className="font-medium mb-3 text-[#D13B28]">المواصفات العامة</h4>
                      <ul className="space-y-3 text-[#1F1F2A]">
                        <li className="flex justify-between border-b border-dashed border-[#A0A0A0]/30 pb-2">
                          <span className="text-[#A0A0A0]">بلد المنشأ:</span>
                          <span className="font-medium">اليابان</span>
                        </li>
                        <li className="flex justify-between border-b border-dashed border-[#A0A0A0]/30 pb-2">
                          <span className="text-[#A0A0A0]">اللون:</span>
                          <span className="font-medium">أسود / فضي</span>
                        </li>
                        <li className="flex justify-between border-b border-dashed border-[#A0A0A0]/30 pb-2">
                          <span className="text-[#A0A0A0]">المواد:</span>
                          <span className="font-medium">بلاستيك، معدن، سيليكون</span>
                        </li>
                        <li className="flex justify-between border-b border-dashed border-[#A0A0A0]/30 pb-2">
                          <span className="text-[#A0A0A0]">الضمان:</span>
                          <span className="font-medium">12 شهر</span>
                        </li>
                      </ul>
                    </div>

                    {isSpecsOpen && <>
                        
                        
                        
                      </>}
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-[#1F1F2A]">وصف المنتج</h3>
                  <div className="prose max-w-none text-[#1F1F2A]">
                    <p>
                      {product.description || `${product.name} هو منتج عالي الجودة يتميز بتصميم عصري وأداء ممتاز. تم تصنيعه باستخدام مواد متينة مختارة بعناية لضمان المتانة والاستخدام طويل الأمد.`}
                    </p>
                    <p className="mt-4">
                      يأتي هذا المنتج مع العديد من الميزات المفيدة التي تلبي احتياجات المستخدمين اليومية. سواء كنت تستخدمه في المنزل أو في العمل، ستجد أنه يوفر تجربة سلسة وفعالة.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li>• تصميم أنيق وعصري يناسب جميع الأذواق</li>
                      <li>• سهل الاستخدام والتنظيف</li>
                      <li>• مواد عالية الجودة تضمن المتانة</li>
                      <li>• يأتي مع ضمان لمدة عام كامل</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6 md:p-8">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="md:w-1/3 bg-[#FFFFFF] p-6 rounded-xl border border-[#A0A0A0]/30">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-[#D13B28]">{product.rating.toFixed(1)}</div>
                      <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-[#A0A0A0]'}`} />)}
                      </div>
                      <p className="text-[#A0A0A0] text-sm mt-2">
                        بناءً على {Math.floor(Math.random() * 50) + 10} تقييم
                      </p>
                      
                      <Separator className="my-4 bg-[#A0A0A0]/30" />
                      
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map(rating => {
                        const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
                        return <div key={rating} className="flex items-center">
                              <span className="text-sm mr-2 text-[#1F1F2A]">{rating}</span>
                              <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-2" />
                              <div className="flex-grow h-2 bg-[#A0A0A0]/20 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 rounded-full" style={{
                              width: `${percentage}%`
                            }}></div>
                              </div>
                              <span className="text-sm ml-2 text-[#1F1F2A] w-8">{percentage}%</span>
                            </div>;
                      })}
                      </div>
                      
                      <Button className="w-full mt-6 bg-[#D13B28] hover:bg-[#D13B28]/90">
                        أضف تقييمك
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4 text-[#1F1F2A]">آراء العملاء</h3>
                    
                    <div className="space-y-6">
                      {[...Array(3)].map((_, i) => <div key={i} className="border-b border-[#A0A0A0]/30 pb-6 last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-[#1F1F2A]/10 overflow-hidden flex items-center justify-center text-[#1F1F2A] font-medium">
                                {["أ", "س", "ف"][i]}
                              </div>
                              <div className="ml-3">
                                <div className="font-medium text-[#1F1F2A]">
                                  {["أحمد محمد", "سارة علي", "فهد العتيبي"][i]}
                                </div>
                                <div className="text-[#A0A0A0] text-sm">
                                  {["بغداد", "البصرة", "أربيل"][i]}
                                </div>
                              </div>
                            </div>
                            <div className="text-[#A0A0A0] text-sm">
                              قبل {[3, 7, 14][i]} أيام
                            </div>
                          </div>
                          
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, j) => <Star key={j} className={`h-4 w-4 ${j < [5, 4, 5][i] ? 'text-amber-400 fill-amber-400' : 'text-[#A0A0A0]'}`} />)}
                          </div>
                          
                          <h4 className="font-medium mb-2 text-[#1F1F2A]">
                            {["منتج رائع لا يفوت", "جودة ممتازة مقابل السعر", "سعيد جداً بالشراء"][i]}
                          </h4>
                          
                          <p className="text-[#1F1F2A]">
                            {["منتج رائع جداً، أنا سعيد جداً بالشراء. الجودة ممتازة والتوصيل كان سريع. أنصح به بشدة لمن يبحث عن منتج موثوق.", "تجربة شراء ممتازة، المنتج كما هو موصوف تماماً. السعر معقول جداً مقارنة بالجودة العالية، أنصح به بشدة.", "منتج ممتاز بجودة عالية ويستحق السعر. التوصيل كان سريعا والتغليف ممتاز. سأشتري منه مرة أخرى بالتأكيد."][i]}
                          </p>
                          
                          {i === 0 && <div className="mt-3 flex gap-2">
                              <div className="h-16 w-16 rounded-md overflow-hidden border border-[#A0A0A0]/30">
                                <img src={productImages[1]} alt="User review" className="h-full w-full object-cover" />
                              </div>
                              <div className="h-16 w-16 rounded-md overflow-hidden border border-[#A0A0A0]/30">
                                <img src={productImages[2]} alt="User review" className="h-full w-full object-cover" />
                              </div>
                            </div>}
                          
                          <div className="mt-3 flex text-sm">
                            <span className="text-[#A0A0A0]">هل كان هذا التقييم مفيداً؟</span>
                            <Button variant="ghost" size="sm" className="h-auto p-1 ml-2 text-[#1F1F2A]">
                              نعم
                            </Button>
                            <Button variant="ghost" size="sm" className="h-auto p-1 ml-2 text-[#1F1F2A]">
                              لا
                            </Button>
                          </div>
                        </div>)}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-6 border-[#A0A0A0]/30 text-[#1F1F2A] hover:bg-[#1F1F2A]/5">
                      عرض كل التقييمات
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="p-6 md:p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#A0A0A0]/30">
                      <h4 className="font-medium text-lg flex items-center text-[#D13B28] mb-4">
                        <Truck className="mr-2 h-5 w-5" />
                        الشحن
                      </h4>
                      <ul className="space-y-3 text-[#1F1F2A]">
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>شحن مجاني لجميع الطلبات فوق 50,000 د.ع</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>التوصيل خلال 2-5 أيام عمل داخل بغداد</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>التوصيل خلال 3-7 أيام عمل إلى باقي المحافظات</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>خدمة التتبع متاحة لجميع الشحنات</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>الدفع عند الاستلام متاح في معظم المناطق</span>
                        </li>
                      </ul>
                      
                      <p className="mt-4 bg-[#1F1F2A]/10 text-[#1F1F2A] p-3 rounded-lg text-sm">
                        نعمل مع أفضل شركات الشحن المحلية لضمان وصول منتجك بأمان وفي أسرع وقت
                      </p>
                    </div>
                    
                    <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#A0A0A0]/30">
                      <h4 className="font-medium text-lg flex items-center text-[#D13B28] mb-4">
                        <Clock className="mr-2 h-5 w-5" />
                        مواعيد التوصيل
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-dashed border-[#A0A0A0]/30">
                          <span className="text-[#1F1F2A]">بغداد</span>
                          <span className="font-medium text-[#1F1F2A]">1-3 أيام</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-dashed border-[#A0A0A0]/30">
                          <span className="text-[#1F1F2A]">أربيل</span>
                          <span className="font-medium text-[#1F1F2A]">2-4 أيام</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-dashed border-[#A0A0A0]/30">
                          <span className="text-[#1F1F2A]">البصرة</span>
                          <span className="font-medium text-[#1F1F2A]">3-5 أيام</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-dashed border-[#A0A0A0]/30">
                          <span className="text-[#1F1F2A]">مناطق أخرى</span>
                          <span className="font-medium text-[#1F1F2A]">4-7 أيام</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#A0A0A0]/30">
                      <h4 className="font-medium text-lg flex items-center text-[#D13B28] mb-4">
                        <RefreshCw className="mr-2 h-5 w-5" />
                        الإرجاع والاستبدال
                      </h4>
                      <ul className="space-y-3 text-[#1F1F2A]">
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>استرجاع مجاني خلال 14 يوم من تاريخ الاستلام</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>يجب أن تكون المنتجات في حالتها الأصلية مع كل الملحقات</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>استبدال مجاني في حالة وجود عيوب تصنيع</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>ضمان شامل لمدة عام ضد عيوب التصنيع</span>
                        </li>
                      </ul>
                      
                      <div className="mt-4 bg-amber-50 text-amber-700 p-3 rounded-lg text-sm">
                        <p className="font-medium">ملاحظات الاسترجاع:</p>
                        <p>بعض المنتجات الاستهلاكية أو الحساسة قد لا تكون مؤهلة للاسترجاع. يرجى الاطلاع على سياسة الاسترجاع الكاملة.</p>
                      </div>
                    </div>
                    
                    <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#A0A0A0]/30">
                      <h4 className="font-medium text-lg flex items-center text-[#D13B28] mb-4">
                        <Shield className="mr-2 h-5 w-5" />
                        الضمان
                      </h4>
                      <ul className="space-y-3 text-[#1F1F2A]">
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>ضمان لمدة عام كامل على المنتج</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>يشمل الضمان إصلاح أو استبدال المنتج</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>مراكز خدمة معتمدة في جميع المحافظات الرئيسية</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="p-6 md:p-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#1F1F2A]">الأسئلة الشائعة</h3>
                <div className="space-y-4">
                  {[{
                  q: "هل المنتج يأتي مع ضمان؟",
                  a: "نعم، جميع منتجاتنا تأتي مع ضمان لمدة عام ضد عيوب التصنيع."
                }, {
                  q: "هل يمكنني إلغاء الطلب بعد الشراء؟",
                  a: "نعم، يمكنك إلغاء الطلب في غضون 24 ساعة من وقت الشراء عن طريق التواصل مع خدمة العملاء."
                }, {
                  q: "كيف يمكنني تتبع طلبي؟",
                  a: "ستتلقى بريدًا إلكترونيًا أو رسالة نصية تحتوي على رقم التتبع بمجرد شحن طلبك. يمكنك استخدام هذا الرقم لتتبع شحنتك على موقعنا."
                }, {
                  q: "ما هي طرق الدفع المتاحة؟",
                  a: "نقبل الدفع عند الاستلام، والبطاقات الائتمانية، والتحويل البنكي، والمحافظ الإلكترونية."
                }, {
                  q: "هل المنتج متوافق مع جميع الأجهزة؟",
                  a: "المنتج متوافق مع معظم الأجهزة الحديثة. يرجى التحقق من مواصفات التوافق في قسم المواصفات التقنية للتأكد."
                }].map((item, i) => <div key={i} className="bg-[#FFFFFF] p-5 rounded-xl border border-[#A0A0A0]/30">
                      <h4 className="font-medium mb-3 flex items-center text-[#1F1F2A]">
                        <BadgeCheck className="text-[#D13B28] mr-2 h-5 w-5" />
                        {item.q}
                      </h4>
                      <p className="text-[#1F1F2A] pl-7">{item.a}</p>
                    </div>)}
                  
                  <div className="bg-[#1F1F2A]/10 p-5 rounded-xl mt-6">
                    <h4 className="font-medium mb-3 flex items-center text-[#1F1F2A]">
                      <AlertCircle className="text-[#1F1F2A] mr-2 h-5 w-5" />
                      هل لديك سؤال آخر؟
                    </h4>
                    <p className="text-[#1F1F2A] mb-3">نحن هنا للمساعدة. تواصل معنا عبر:</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      
                      <Button variant="outline" className="bg-[#FFFFFF] border-[#A0A0A0]/30 text-[#1F1F2A]">
                        اتصل بنا: 07700000000
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Related Products */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.6
      }} className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#1F1F2A]">منتجات ذات صلة</h2>
            <Button variant="link" asChild className="text-[#D13B28]">
              <Link to={`/category/${product.category}`}>عرض المزيد</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(relatedProducts) && relatedProducts.slice(0, 4).map(product => <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>)}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>;
};
export default ProductDetail;
