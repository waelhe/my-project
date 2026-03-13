'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  Shield, 
  MessageCircle, 
  Phone,
  Home as HomeIcon,
  Car,
  Compass,
  Building2,
  Users,
  CheckCircle2,
  ArrowLeft,
  Menu,
  X,
  Loader2,
  AlertCircle
} from "lucide-react"
import { useState, useEffect } from "react"
import { TourismAgent } from "@/components/tourism/TourismAgent"

// ==================== Types ====================

interface City {
  id: string
  nameAr: string
  nameEn: string
  governorate: string
  isPopular: boolean
  image: string | null
  _count: {
    accommodations: number
  }
}

interface Accommodation {
  id: string
  titleAr: string
  titleEn: string | null
  type: string
  addressAr: string | null
  basePrice: number
  rating: number
  reviewCount: number
  coverImage: string | null
  images: string[]
  city: {
    nameAr: string
    nameEn: string
  } | null
}

interface CitiesResponse {
  cities: City[]
}

interface AccommodationsResponse {
  accommodations: Accommodation[]
  pagination: {
    total: number
    hasMore: boolean
  }
}

// ==================== Hero Section Component ====================

interface HeroSectionProps {
  totalAccommodations: number
  totalCities: number
}

function HeroSection({ totalAccommodations, totalCities }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const searchTypes = [
    { id: "all", label: "الكل" },
    { id: "hotel", label: "فنادق" },
    { id: "apartment", label: "شقق" },
    { id: "chalet", label: "شاليهات" },
    { id: "tour", label: "جولات" },
  ]

  return (
    <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - الجامع الأموي في دمشق، سوريا */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/hero.png')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 sm:p-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">ضيف</h1>
          </div>
        </div>
        
        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
          اكتشف جمال <span className="text-amber-400">سوريا</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
          منصتك الموثوقة لحجز الفنادق، الشقق، الجولات السياحية وخدمات النقل
        </p>
        
        {/* Search Box */}
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
          {/* Search Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center">
            {searchTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                onClick={() => setSelectedType(type.id)}
                className={`rounded-full px-4 sm:px-6 text-sm sm:text-base ${selectedType === type.id ? "bg-amber-500 hover:bg-amber-600" : ""}`}
              >
                {type.label}
              </Button>
            ))}
          </div>
          
          {/* Search Input */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                type="text"
                placeholder="ابحث عن وجهتك..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 sm:h-14 pr-10 sm:pr-12 text-base sm:text-lg border-gray-200 rounded-xl"
              />
            </div>
            <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 bg-amber-500 hover:bg-amber-600 text-white rounded-xl">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              بحث
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-800">+{totalAccommodations}</div>
              <div className="text-xs sm:text-sm text-gray-500">مكان إقامة</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-800">+{totalCities}</div>
              <div className="text-xs sm:text-sm text-gray-500">وجهة سياحية</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-gray-800">+10,000</div>
              <div className="text-xs sm:text-sm text-gray-500">ضيف سعيد</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/80 rounded-full" />
        </div>
      </div>
    </section>
  )
}

// ==================== Services Section ====================

function ServicesSection() {
  const services = [
    {
      icon: HomeIcon,
      title: "السكن",
      titleEn: "Accommodation",
      description: "فنادق، شقق مفروشة، شاليهات، ومخيمات في جميع أنحاء سوريا",
      color: "bg-amber-500",
      link: "/accommodations"
    },
    {
      icon: Car,
      title: "النقل",
      titleEn: "Transportation",
      description: "سيارات مع أو بدون سائق، باصات، وخدمات نقل آمنة",
      color: "bg-emerald-500",
      link: "/transport"
    },
    {
      icon: Compass,
      title: "السياحة",
      titleEn: "Tourism",
      description: "جولات سياحية، معالم تاريخية، سياحة علاجية وسياحة حرب",
      color: "bg-sky-500",
      link: "/tours"
    },
    {
      icon: Building2,
      title: "الأعمال",
      titleEn: "Business",
      description: "فرص استثمارية، خدمات للأعمال، وشراكات تجارية",
      color: "bg-violet-500",
      link: "/business"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
            خدماتنا
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            كل ما تحتاجه لرحلتك في مكان واحد
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نقدم لك مجموعة متكاملة من الخدمات لتجعل رحلتك إلى سوريا تجربة لا تُنسى
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white cursor-pointer overflow-hidden"
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                <Button variant="ghost" className="text-amber-600 hover:text-amber-700 p-0 group/btn">
                  اكتشف المزيد
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover/btn:-translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== Popular Destinations ====================

interface PopularDestinationsProps {
  cities: City[]
  loading: boolean
  error: string | null
}

function PopularDestinations({ cities, loading, error }: PopularDestinationsProps) {
  // صور المدن السورية - صور مولدة بالذكاء الاصطناعي للمعالم السورية
  // Syrian cities images - AI generated images of Syrian landmarks
  const defaultCityImages: Record<string, string> = {
    // دمشق - الجامع الأموي (أحد أكبر وأقدم المساجد في العالم)
    "دمشق": "/images/cities/damascus.png",
    // حلب - قلعة حلب (أحد أقدم وأكبر القلاع في العالم)
    "حلب": "/images/cities/aleppo.png",
    // اللاذقية - شاطئ البحر المتوسط
    "اللاذقية": "/images/cities/latakia.png",
    // طرطوس - جزيرة أرواد (الجزيرة المأهولة الوحيدة في سوريا)
    "طرطوس": "/images/cities/tartus.png",
    // تدمر - الآثار الرومانية (موقع تراث عالمي)
    "تدمر": "/images/cities/palmyra.png",
    // معلولا - دير مار تقلا (من أقدم الأديرة في العالم)
    "معلولا": "/images/cities/maaloula.png",
    // صافيتا - البرج (قلعة من العهد الصليبي)
    "صافيتا": "/images/cities/safita.png",
    // حمص - قلعة الحصن (كراك دي شوفالييه - أفضل قلعة صليبية محفوظة)
    "حمص": "/images/cities/homs.png",
    // حماة - نواقير حماة (النواعير التاريخية على نهر العاصي)
    "حماة": "/images/cities/hama.png",
  }

  // صورة افتراضية - الجامع الأموي في دمشق
  const defaultImage = "/images/cities/damascus.png"

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-6 w-24 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-gray-100 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">حدث خطأ في تحميل البيانات</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Empty state
  if (cities.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">لا توجد وجهات متاحة حالياً</h3>
            <p className="text-gray-500">يرجى التحقق لاحقاً</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-sky-100 text-sky-700 hover:bg-sky-100">
            وجهات مميزة
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            اكتشف أجمل الأماكن في سوريا
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            من المدن التاريخية إلى السواحل الخلابة، سوريا تنتظرك
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.slice(0, 6).map((city) => (
            <Card 
              key={city.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={city.image || defaultCityImages[city.nameAr] || defaultImage} 
                  alt={`صورة لمدينة ${city.nameAr} - وجهة سياحية في سوريا`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{city.nameAr}</h3>
                  <p className="text-white/80 text-sm mb-2">{city.governorate}</p>
                  <div className="flex items-center text-white/70 text-sm">
                    <HomeIcon className="w-4 h-4 ml-1" />
                    <span>{city._count.accommodations} مكان إقامة</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full px-8">
            عرض جميع الوجهات
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

// ==================== Featured Accommodations ====================

interface FeaturedAccommodationsProps {
  accommodations: Accommodation[]
  loading: boolean
  error: string | null
}

function FeaturedAccommodations({ accommodations, loading, error }: FeaturedAccommodationsProps) {
  // Map accommodation types to Arabic labels
  const typeLabels: Record<string, string> = {
    HOTEL: "فندق",
    APARTMENT: "شقة",
    VILLA: "فيلا",
    CHALET: "شاليه",
    CAMP: "مخيم",
    GUESTHOUSE: "نزل",
    HOSTEL: "سكن شباب",
    RESORT: "منتجع",
  }

  // صورة افتراضية - فناء منزل دمشقي تقليدي
  const defaultImage = "/images/default-accommodation.png"

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="h-6 w-24 bg-gray-200 rounded-full mb-4 animate-pulse" />
              <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">حدث خطأ في تحميل البيانات</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Empty state
  if (accommodations.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <HomeIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">لا توجد أماكن إقامة متاحة حالياً</h3>
            <p className="text-gray-500">يرجى التحقق لاحقاً</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
              أماكن مميزة
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              أماكن الإقامة الأكثر طلباً
            </h2>
          </div>
          <Button variant="ghost" className="hidden md:flex text-amber-600 hover:text-amber-700">
            عرض الكل
            <ArrowLeft className="w-4 h-4 mr-2" />
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accommodations.slice(0, 4).map((acc) => {
            const displayImage = acc.coverImage || (acc.images && acc.images[0]) || defaultImage
            const location = acc.city ? `${acc.city.nameAr}${acc.addressAr ? '، ' + acc.addressAr : ''}` : acc.addressAr || 'سوريا'
            
            return (
              <Card 
                key={acc.id} 
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={displayImage} 
                    alt={`صورة ${acc.titleAr} - ${typeLabels[acc.type] || 'مكان إقامة'} في ${acc.city?.nameAr || 'سوريا'}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {acc.rating >= 4.8 && (
                    <Badge className="absolute top-3 right-3 bg-amber-500 text-white">
                      مميز
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-3 left-3 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-3 h-3 ml-1" />
                    {location}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{acc.titleAr}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400 ml-1" />
                      <span className="font-medium text-sm">{acc.rating.toFixed(1)}</span>
                      <span className="text-gray-400 text-sm mr-1">({acc.reviewCount})</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{typeLabels[acc.type] || acc.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-lg text-gray-900">{acc.basePrice.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm mr-1">ل.س / ليلة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ==================== How It Works ====================

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "ابحث واختر",
      description: "تصفح مئات الخيارات وابحث عن المكان المناسب لرحلتك",
      icon: Search
    },
    {
      number: "02",
      title: "احجز بسهولة",
      description: "أكمل الحجز بخطوات بسيطة مع خيارات دفع متعددة",
      icon: CheckCircle2
    },
    {
      number: "03",
      title: "استمتع برحلتك",
      description: "تواصل مع المضيف واستمتع بإقامتك مع ضمان ضيف",
      icon: Heart
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
            كيف يعمل
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            احجز رحلتك في 3 خطوات بسيطة
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 relative">
                <step.icon className="w-8 h-8 text-amber-500" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-0 w-full">
                  <div className="border-t-2 border-dashed border-amber-200 w-1/2 mr-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== Trust Section ====================

function TrustSection() {
  const features = [
    {
      icon: Shield,
      title: "ضمان الحجز",
      description: "نظام ضمان يحمي حقوق الضيف والمضيف على حد سواء"
    },
    {
      icon: Users,
      title: "مضيفون موثوقون",
      description: "جميع المضيفين مُتحقق منهم لضمان تجربة آمنة"
    },
    {
      icon: MessageCircle,
      title: "دعم على مدار الساعة",
      description: "فريق دعم متخصص جاهز لمساعدتك في أي وقت"
    },
    {
      icon: Phone,
      title: "تواصل آمن",
      description: "تواصل مع المضيفين دون الحاجة لكشف معلوماتك الشخصية"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            لماذا ضيف؟
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            رحلتك بأمان مع ضيف
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نحن نضمن لك تجربة حجز آمنة ومريحة
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== CTA Section ====================

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          هل أنت مستعد لاستكشاف سوريا؟
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          انضم إلى آلاف الضيوف الذين اكتشفوا جمال سوريا معنا
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 rounded-full px-8">
            ابدأ البحث الآن
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
            كيف تعمل المنصة؟
          </Button>
        </div>
      </div>
    </section>
  )
}

// ==================== Host CTA ====================

function HostCTA() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-amber-500/20 text-amber-400 hover:bg-amber-500/20">
              كن مضيفاً
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              شارك مكانك مع ضيوف من جميع أنحاء العالم
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              سواء كان لديك فندق، شقة، شاليه، أو حتى مخيم، انضم إلى منصة ضيف وابدأ بتقديم خدمتك للضيوف
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "إدارة سهلة للحجوزات عبر واتساب",
                "نظام ضمان يحمي حقوقك",
                "دعم فني متواصل",
                "تحصيل آمن للمدفوعات"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 ml-3" />
                  {item}
                </li>
              ))}
            </ul>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-8">
              سجل كمضيف الآن
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl p-8 backdrop-blur-sm border border-amber-500/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">0%</div>
                  <div className="text-gray-400 text-sm">عمولة للأشهر الـ 3 الأولى</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                  <div className="text-gray-400 text-sm">دعم فني مستمر</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-sky-400 mb-2">+500</div>
                  <div className="text-gray-400 text-sm">مضيف نشط</div>
                </div>
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-violet-400 mb-2">8%</div>
                  <div className="text-gray-400 text-sm">عمولة بعد الترويج</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== Header Component ====================

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-amber-600">ضيف</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">الرئيسية</a>
            <a href="#services" className="text-gray-600 hover:text-amber-600 transition-colors">الخدمات</a>
            <a href="#destinations" className="text-gray-600 hover:text-amber-600 transition-colors">الوجهات</a>
            <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors">عن ضيف</a>
          </nav>
          
          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-gray-600">
              تسجيل الدخول
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full">
              انضم كمضيف
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors py-2">الرئيسية</a>
              <a href="#services" className="text-gray-600 hover:text-amber-600 transition-colors py-2">الخدمات</a>
              <a href="#destinations" className="text-gray-600 hover:text-amber-600 transition-colors py-2">الوجهات</a>
              <a href="#" className="text-gray-600 hover:text-amber-600 transition-colors py-2">عن ضيف</a>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" className="w-full justify-center">تسجيل الدخول</Button>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">انضم كمضيف</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// ==================== Footer Component ====================

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">ضيف</h3>
            <p className="text-gray-400 mb-6">
              منصتك الموثوقة للسياحة والضيافة في سوريا. نربط الضيوف بالمضيفين بطريقة آمنة وموثوقة.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">الخدمات</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-amber-500 transition-colors">السكن</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">النقل</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">الجولات السياحية</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">السياحة العلاجية</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">خدمات الأعمال</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">ضيف</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-amber-500 transition-colors">عن المنصة</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">كيف يعمل</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">انضم كمضيف</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">تواصل معنا</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span dir="ltr">+963 11 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-500" />
                <span>info@dayf.sy</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-1" />
                <span>دمشق، سوريا</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h5 className="text-white text-sm font-semibold mb-3">النشرة البريدية</h5>
              <div className="flex gap-2">
                <Input placeholder="بريدك الإلكتروني" className="bg-gray-800 border-gray-700 text-white" />
                <Button className="bg-amber-500 hover:bg-amber-600 shrink-0">
                  اشتراك
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 ضيف. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-amber-500 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-amber-500 transition-colors">شروط الاستخدام</a>
              <a href="#" className="hover:text-amber-500 transition-colors">سياسة الإلغاء</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ==================== Main Page Component ====================

export default function Home() {
  // State for cities
  const [cities, setCities] = useState<City[]>([])
  const [citiesLoading, setCitiesLoading] = useState(true)
  const [citiesError, setCitiesError] = useState<string | null>(null)

  // State for accommodations
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [accommodationsLoading, setAccommodationsLoading] = useState(true)
  const [accommodationsError, setAccommodationsError] = useState<string | null>(null)

  // Stats for hero section
  const [stats, setStats] = useState({
    totalAccommodations: 500,
    totalCities: 50
  })

  // Fetch cities on mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setCitiesLoading(true)
        const response = await fetch('/api/cities')
        
        if (!response.ok) {
          throw new Error('فشل في جلب البيانات')
        }
        
        const data: CitiesResponse = await response.json()
        setCities(data.cities || [])
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalCities: data.cities?.length || 0
        }))
      } catch (err) {
        console.error('Error fetching cities:', err)
        setCitiesError('لم نتمكن من تحميل المدن')
      } finally {
        setCitiesLoading(false)
      }
    }

    fetchCities()
  }, [])

  // Fetch accommodations on mount
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        setAccommodationsLoading(true)
        const response = await fetch('/api/accommodations?limit=4')
        
        if (!response.ok) {
          throw new Error('فشل في جلب البيانات')
        }
        
        const data: AccommodationsResponse = await response.json()
        setAccommodations(data.accommodations || [])
        
        // Update stats with total from pagination
        setStats(prev => ({
          ...prev,
          totalAccommodations: data.pagination?.total || data.accommodations?.length || 0
        }))
      } catch (err) {
        console.error('Error fetching accommodations:', err)
        setAccommodationsError('لم نتمكن من تحميل أماكن الإقامة')
      } finally {
        setAccommodationsLoading(false)
      }
    }

    fetchAccommodations()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection 
          totalAccommodations={stats.totalAccommodations}
          totalCities={stats.totalCities}
        />
        <div id="services">
          <ServicesSection />
        </div>
        <div id="destinations">
          <PopularDestinations 
            cities={cities}
            loading={citiesLoading}
            error={citiesError}
          />
        </div>
        <FeaturedAccommodations 
          accommodations={accommodations}
          loading={accommodationsLoading}
          error={accommodationsError}
        />
        <HowItWorks />
        <TrustSection />
        <CTASection />
        <HostCTA />
      </main>
      <Footer />
      <TourismAgent />
    </div>
  )
}
