import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Sparkles, ChevronRight, MessageCircle, MessagesSquare, Headphones } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const contactInfo = {
  address: {
    street: "شارع 18 الصناعة",
    city: "بغداد",
    country: "العراق",
    mapUrl: "https://maps.google.com/?q=14+Ramadan+Street+Baghdad+Iraq"
  },
  phone: {
    sales: "0780 722 2333",
    support: "0780 722 2333"
  },
  email: {
    general: "Suhah08@gmail.com",
    support: "Suhah08@gmail.com",
    sales: "Suhah08@gmail.com",
  },
  social: {
    facebook: "https://facebook.com/mystore.iraq",
    instagram: "https://instagram.com/mystore.iraq",
    twitter: "https://twitter.com/mystore_iraq"
  },
  hours: {
    weekdays: "السبت - الخميس: 9:00 صباحاً - 10:00 مساءً",
    weekend: "الجمعة: 2:00 مساءً - 10:00 مساءً"
  },
  company: {
    name: "متجري ",
    description: "وجهتك الأولى للمنتجات التقنية الأصلية في العراق. نحن نقدم أحدث الأدوات والإكسسوارات مع توصيل موثوق به في جميع أنحاء البلاد."
  }
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("تم إرسال رسالتك بنجاح! سنعاود الاتصال بك قريباً.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormSubmitting(false);
    }, 1500);
  };
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1F1F2A]/5 via-[#D13B28]/10 to-[#1F1F2A]/5 py-20">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#1F1F2A] to-[#D13B28] bg-clip-text text-transparent">
                تواصل معنا
              </h1>
              <p className="text-lg md:text-xl text-[#1F1F2A] max-w-2xl mx-auto mb-6">
                هل لديك أسئلة حول منتجاتنا أو خدماتنا؟ نحن هنا لمساعدتك!
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-8" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" className="gap-2 bg-[#D13B28] hover:bg-[#D13B28]/90">
                <Phone className="h-5 w-5" />
                اتصل بنا الآن
              </Button>
              <Button variant="outline" size="lg" className="gap-2 border-[#1F1F2A] text-[#1F1F2A] hover:bg-[#1F1F2A]/5">
                <Mail className="h-5 w-5" />
                راسلنا عبر البريد الإلكتروني
              </Button>
            </motion.div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-24 h-24 bg-[#D13B28]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#1F1F2A]/10 rounded-full blur-3xl"></div>
        </section>
        
        {/* Contact Methods */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-5xl mx-auto" 
              variants={containerAnimation} 
              initial="hidden" 
              animate="visible"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-[#1F1F2A]">طرق متعددة للوصول إلينا</h2>
                <p className="text-[#A0A0A0] max-w-2xl mx-auto">
                  اختر طريقتك المفضلة للاتصال بنا. نحن هنا لمساعدتك.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[{
                  icon: <Phone className="h-6 w-6" />,
                  title: "اتصل بنا",
                  description: "تحدث مباشرةً مع فريق الدعم لدينا",
                  info: contactInfo.phone.support,
                  color: "bg-[#D13B28]/10 text-[#D13B28]",
                  action: "اتصل الآن"
                }, {
                  icon: <Mail className="h-6 w-6" />,
                  title: "راسلنا عبر البريد الإلكتروني",
                  description: "أرسل لنا رسالة مفصّلة في أي وقت",
                  info: contactInfo.email.support,
                  color: "bg-[#1F1F2A]/10 text-[#1F1F2A]",
                  action: "إرسال بريد إلكتروني"
                }].map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemAnimation} 
                    className="bg-white rounded-xl shadow-md transition-all hover:shadow-lg border border-[#A0A0A0]/20"
                  >
                    <div className="p-6">
                      <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1F1F2A]">{item.title}</h3>
                      <p className="text-[#A0A0A0] text-sm mb-3">{item.description}</p>
                      <div className="font-medium text-[#1F1F2A] mb-4">{item.info}</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-[#1F1F2A] text-[#1F1F2A] hover:bg-[#1F1F2A]/5"
                      >
                        {item.action}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-16 bg-[#1F1F2A]/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-[#1F1F2A]">أرسل لنا رسالة</h2>
                  
                  <Tabs defaultValue="support" className="mb-8">
                    <TabsList className="grid w-full grid-cols-3 bg-[#1F1F2A]/10">
                      <TabsTrigger 
                        value="support" 
                        className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-white"
                      >
                        مساعدة
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sales" 
                        className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-white"
                      >
                        مبيعات
                      </TabsTrigger>
                      <TabsTrigger 
                        value="feedback" 
                        className="data-[state=active]:bg-[#D13B28] data-[state=active]:text-white"
                      >
                        مراجعة واقتراح
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="support" className="mt-4">
                      <p className="text-[#A0A0A0] mb-6">
                        هل تحتاج إلى مساعدة بشأن طلبك أو منتجك؟ فريق الدعم لدينا جاهز لمساعدتك في أي مشاكل أو أسئلة فنية.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="sales" className="mt-4">
                      <p className="text-[#A0A0A0] mb-6">
                        هل أنت مهتم بالطلبات بالجملة أو الشراكات التجارية؟ يود فريق المبيعات لديهم مناقشة كيفية العمل معاً.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="feedback" className="mt-4">
                      <p className="text-[#A0A0A0] mb-6">
                        نحن نقدر ملاحظاتك! أطلعنا على تجربتك مع منتجاتنا أو اقترح تحسينات.
                      </p>
                    </TabsContent>
                  </Tabs>
                  
                  <Card className="border-[#A0A0A0]/20">
                    <CardHeader>
                      <CardTitle className="text-[#1F1F2A]">تواصل معنا</CardTitle>
                      <CardDescription className="text-[#A0A0A0]">
                        املأ النموذج أدناه وسنعاود الاتصال بك في أقرب وقت ممكن.
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-[#1F1F2A]">
                              الاسم الكامل
                            </label>
                            <Input 
                              id="name" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleInputChange} 
                              placeholder="طه عبدالرحمن" 
                              required 
                              className="border-[#A0A0A0]/30"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-[#1F1F2A]">
                              عنوان البريد الإلكتروني
                            </label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleInputChange} 
                              placeholder="john@example.com" 
                              required 
                              className="border-[#A0A0A0]/30"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium text-[#1F1F2A]">
                            الموضوع
                          </label>
                          <Input 
                            id="subject" 
                            name="subject" 
                            value={formData.subject} 
                            onChange={handleInputChange} 
                            placeholder="عنوان الموضوع" 
                            required 
                            className="border-[#A0A0A0]/30"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium text-[#1F1F2A]">
                            الرسالة
                          </label>
                          <Textarea 
                            id="message" 
                            name="message" 
                            value={formData.message} 
                            onChange={handleInputChange} 
                            placeholder="يرجى تقديم أكبر قدر ممكن من التفاصيل..." 
                            rows={2} 
                            required 
                            className="border-[#A0A0A0]/30"
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-[#D13B28] hover:bg-[#D13B28]/90" 
                          disabled={formSubmitting}
                        >
                          {formSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              يتم الارسال....
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              ارسال
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col"
                >
                  <div className="rounded-xl overflow-hidden bg-white shadow-lg border border-[#A0A0A0]/20 mb-8">
                    <div className="p-6 border-b border-[#A0A0A0]/20">
                      <h3 className="text-xl font-bold text-[#1F1F2A]">زيارة متجرنا</h3>
                    </div>
                    <div className="aspect-video w-full">
                      <iframe 
                        src="https://www.google.pl/maps/place/%D8%B4%D8%B1%D9%83%D8%A9+%D8%B3%D9%85%D8%A7+%D8%A7%D9%88%D8%B1+%D9%84%D8%AA%D9%82%D9%86%D9%8A%D8%A9+%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA%E2%80%AD/@33.3074457,44.4512219,17z/data=!4m6!3m5!1s0x155781f525e1071d:0xd3e7eb7dc833043!8m2!3d33.3074457!4d44.448647!16s%2Fg%2F11rsv87jp7?entry=ttu&g_ep=EgoyMDI1MDQxMy4wIKXMDSoASAFQAw%3D%3D" 
                        className="w-full h-full border-0" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade" 
                        title="TechHaven Store Location"
                      ></iframe>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-[#D13B28] mt-0.5 mr-3" />
                        <div>
                          <h4 className="font-medium text-[#1F1F2A]">العنوان</h4>
                          <p className="text-[#A0A0A0]">{contactInfo.address.street}, {contactInfo.address.city}, {contactInfo.address.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Sparkles className="h-8 w-8 text-[#D13B28] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-[#1F1F2A]">اسئلة شائعة</h2>
              <p className="text-[#A0A0A0]">
                اعثر على إجابات سريعة للأسئلة الشائعة حول منتجاتنا وخدماتنا.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {[{
                question: "ما هي طرق الدفع التي تقبلونها؟",
                answer: "نقبل الدفع نقداً عند الاستلام فقط."
              }, {
                question: "كم من الوقت يستغرق الشحن؟",
                answer: "يستغرق الشحن القياسي عادةً من 3 إلى 5 أيام عمل."
              }, {
                question: "ما هي سياسة الإرجاع لديكم؟",
                answer: "نقدم سياسة إرجاع لمدة 30 يوماً لمعظم المنتجات. يجب أن تكون المنتجات في عبواتها الأصلية وبحالة غير مستخدمة."
              }, {
                question: "هل تقدمون الشحن الدولي؟",
                answer: "لا، نحن نقوم بالتوصيل داخل العراق فقط"
              }].map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="border-b border-[#A0A0A0]/20 py-4" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <details className="group">
                    <summary className="flex cursor-pointer items-center justify-between py-2 font-medium text-[#1F1F2A]">
                      {faq.question}
                      <span className="transition group-open:rotate-180">
                        <ChevronRight className="h-5 w-5 text-[#D13B28]" />
                      </span>
                    </summary>
                    <div className="pt-2 pb-4 text-[#A0A0A0]">
                      {faq.answer}
                    </div>
                  </details>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
