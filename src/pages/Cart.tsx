import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronLeft, Plus, Minus, Truck, ShoppingBag, Clock, Package, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getSavedOrders, Order } from "@/utils/orderStorage";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    clearCart 
  } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(() => getSavedOrders());
  
  const renderEmptyCart = () => (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      <Header />
      
      <main className="flex-grow pt-24 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-16 h-16 bg-[#1F1F2A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-8 w-8 text-[#D13B28]" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[#1F1F2A]">عربة التسوق الخاصة بك فارغة</h2>
          <p className="text-[#A0A0A0] mb-8">
            يبدو أنك لم تقم بإضافة أي منتجات إلى عربة التسوق الخاصة بك حتى الآن.
          </p>
          <Button asChild className="bg-[#D13B28] hover:bg-[#D13B28]/90">
            <Link to="/shop">مواصلة التسوق</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF]">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="cart" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2 bg-[#FFFFFF] border border-[#A0A0A0]/30">
              <TabsTrigger 
                value="cart" 
                className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
              >
                عربة التسوق الحالية
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-[#FFFFFF] text-[#1F1F2A]"
              >
                سجل الطلبات
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="cart">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[#1F1F2A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="h-8 w-8 text-[#D13B28]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-[#1F1F2A]">عربة التسوق الخاصة بك فارغة</h2>
                  <p className="text-[#A0A0A0] mb-8">
                    يبدو أنك لم تقم بإضافة أي منتجات إلى عربة التسوق الخاصة بك حتى الآن.
                  </p>
                  <Button asChild className="bg-[#D13B28] hover:bg-[#D13B28]/90">
                    <Link to="/shop">مواصلة التسوق</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold mb-8 text-[#1F1F2A]">عربة التسوق الخاصة بك</h1>
                  
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3">
                      <div className="bg-[#FFFFFF] rounded-lg shadow-md overflow-hidden border border-[#A0A0A0]/30">
                        <div className="p-4 border-b border-[#A0A0A0]/30">
                          <h2 className="text-lg font-semibold text-[#1F1F2A]">عناصر عربة التسوق ({cartItems.length})</h2>
                        </div>
                        
                        <div className="divide-y divide-[#A0A0A0]/30">
                          {cartItems.map((item, index) => (
                            <motion.div 
                              key={`${item.product.id}-${item.color || 'default'}`}
                              className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-20 h-20 bg-[#1F1F2A]/10 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              
                              <div className="flex-grow">
                                <h3 className="font-medium text-[#1F1F2A]">{item.product.name}</h3>
                                {item.color && (
                                  <div className="flex items-center mt-1">
                                    <span className="text-sm text-[#A0A0A0] mr-2">اللون:</span>
                                    <span 
                                      className="w-4 h-4 rounded-full border border-[#A0A0A0]/30" 
                                      style={{ backgroundColor: item.color }}
                                    />
                                  </div>
                                )}
                                <div className="text-[#D13B28] font-medium mt-1">
                                  ${item.product.price.toFixed(2)}
                                </div>
                              </div>
                              
                              <div className="flex items-center border border-[#A0A0A0]/30 rounded-md">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 rounded-none text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center text-[#1F1F2A]">{item.quantity}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 rounded-none text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.product.stock}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="text-right font-medium text-[#1F1F2A]">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-[#A0A0A0] hover:text-[#D13B28]"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="p-4 border-t border-[#A0A0A0]/30 flex flex-wrap justify-between gap-4">
                          <Button variant="outline" asChild className="border-[#A0A0A0]/30 text-[#1F1F2A] hover:bg-[#1F1F2A]/5">
                            <Link to="/shop" className="flex items-center">
                              <ChevronLeft className="mr-2 h-4 w-4" />
                            مواصلة التسوق
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            onClick={clearCart} 
                            className="text-[#D13B28] border-[#D13B28]/30 hover:bg-[#D13B28]/10 hover:text-[#D13B28]"
                          >
                            مسح عربة التسوق
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                      <div className="bg-[#FFFFFF] rounded-lg shadow-md overflow-hidden sticky top-24 border border-[#A0A0A0]/30">
                        <div className="p-4 border-b border-[#A0A0A0]/30">
                          <h2 className="text-lg font-semibold text-[#1F1F2A]">ملخص الطلب</h2>
                        </div>
                        
                        <div className="p-4 space-y-4">
                          <div className="flex justify-between text-[#1F1F2A]">
                            <span className="text-[#A0A0A0]">المجموع الفرعي</span>
                            <span>${cartTotal.toFixed(2)}</span>
                          </div>
                          
                          <div className="flex justify-between text-[#1F1F2A]">
                            <span className="text-[#A0A0A0]">التوصيل</span>
                            <span>{cartTotal >= 50 ? "Free" : "$5.00"}</span>
                          </div>
                          
                          <div className="flex justify-between text-[#1F1F2A]">
                            <span className="text-[#A0A0A0]">الاجور</span>
                            <span>${(cartTotal * 0.07).toFixed(2)}</span>
                          </div>
                          
                          <div className="border-t border-[#A0A0A0]/30 pt-4 flex justify-between font-bold text-[#1F1F2A]">
                            <span>المجموع</span>
                            <span>${(cartTotal + (cartTotal >= 50 ? 0 : 5) + (cartTotal * 0.07)).toFixed(2)}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-[#A0A0A0] mt-2">
                            <Truck className="h-4 w-4 mr-2 text-green-500" />
                            {cartTotal >= 50 ? (
                              <span>تم تطبيق التوصيل المجاني</span>
                            ) : (
                              <span>اشتري بقيمة ${(50 - cartTotal).toFixed(2)} اضافية للحصول على توصيل مجاني</span>
                            )}
                          </div>
                          
                          <div className="pt-2">
                            <Button 
                              className="w-full bg-[#D13B28] hover:bg-[#D13B28]/90"
                              onClick={() => navigate('/checkout')}
                            >
الطلب
                            </Button>
                          </div>
                          
                          <div className="pt-4">
                            <div className="relative">
                              <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#A0A0A0]/30"></div>
                              </div>
                              <div className="relative flex justify-center">
                                <span className="bg-[#FFFFFF] px-2 text-sm text-[#A0A0A0]">او</span>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <div className="flex gap-2 mb-4">
                                <Input 
                                  placeholder="Coupon code" 
                                  className="border-[#A0A0A0]/30 text-[#1F1F2A]"
                                />
                                <Button 
                                  variant="outline" 
                                  className="border-[#A0A0A0]/30 text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                                >
                                  تطبيق
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-[#1F1F2A]">سجل طلباتك</h1>
                
                {orders.length === 0 ? (
                  <div className="text-center py-16 bg-[#FFFFFF] rounded-lg shadow-md border border-[#A0A0A0]/30">
                    <Package className="h-16 w-16 mx-auto text-[#A0A0A0] mb-4" />
                    <h2 className="text-2xl font-bold mb-4 text-[#1F1F2A]">لا توجد طلبات</h2>
                    <p className="text-[#A0A0A0] mb-8">
                      لم تقم بتقديم أي طلبات حتى الآن. ابدأ التسوق وستظهر طلباتك هنا.
                    </p>
                    <Button asChild className="bg-[#D13B28] hover:bg-[#D13B28]/90">
                      <Link to="/shop">تسوق المنتجات</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <motion.div 
                        key={order.id}
                        className="bg-[#FFFFFF] rounded-lg shadow-md overflow-hidden border border-[#A0A0A0]/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="p-4 border-b border-[#A0A0A0]/30 flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-[#1F1F2A]">طلب #{order.id}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-[#A0A0A0]">{formatDate(order.date)}</p>
                          </div>
                          <div className="font-bold text-[#D13B28]">${order.total.toFixed(2)}</div>
                        </div>
                        
                        <Accordion type="single" collapsible>
                          <AccordionItem value="items">
                            <AccordionTrigger className="px-4 text-[#1F1F2A]">المنتجات </AccordionTrigger>
                            <AccordionContent>
                              <div className="px-4 pb-4 divide-y divide-[#A0A0A0]/30">
                                {order.items.map((item) => (
                                  <div key={item.product.id} className="py-3 flex items-center gap-3">
                                    <div className="w-16 h-16 bg-[#1F1F2A]/10 rounded-md overflow-hidden">
                                      <img 
                                        src={item.product.image} 
                                        alt={item.product.name}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium text-[#1F1F2A]">{item.product.name}</h4>
                                      <div className="text-sm text-[#A0A0A0]">
                                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                                      </div>
                                    </div>
                                    <div className="font-medium text-[#1F1F2A]">
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="shipping">
                            <AccordionTrigger className="px-4 text-[#1F1F2A]">معلومات العميل</AccordionTrigger>
                            <AccordionContent>
                              <div className="px-4 pb-4 space-y-2">
                                <div className="flex items-start gap-2">
                                  <MapPin className="h-5 w-5 text-[#A0A0A0] mt-0.5" />
                                  <div className="text-[#1F1F2A]">
                                    <p className="font-medium">{order.shippingAddress.name}</p>
                                    <p className="text-[#A0A0A0]">{order.shippingAddress.address}</p>
                                    <p className="text-[#A0A0A0]">{order.shippingAddress.city}</p>
                                    <p className="text-[#A0A0A0]">{order.shippingAddress.phone}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="h-4 w-4 text-amber-500" />
                                  <span className="text-amber-700">
                                    {order.status === 'delivered' 
                                      ? 'تم التوصيل' 
                                      : order.status === 'cancelled' 
                                        ? 'ملغى' 
                                        : 'يتم التوصيل بمدة لاتزيد عن 5 ايام'}
                                  </span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <div className="p-4 border-t border-[#A0A0A0]/30 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="border-[#A0A0A0]/30 text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                          >
                            <Link to={`/shop`}>اعادة الطلب</Link>
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
