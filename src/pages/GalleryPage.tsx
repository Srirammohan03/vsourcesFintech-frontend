import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Successstories from "@/components/home/studentsuccess";

const imagePaths = {
  "Dakannagari Rohith Reddy": "/assets/images/DAKANNAGARI ROHITH REDDY  (USA).jpeg",
  "Aninash Yadav": "/assets/images/ANINASH YADAV  (UK).jpeg",
  "Duddempudi Sahana": "/assets/images/DUDDEMPUDI SAHANA  (USA).jpeg",
  "Asar Ali Mohammed": "/assets/images/ASAR ALI MOHAMMED  (UK).jpeg",
  "Moghal Saheera Begum": "/assets/images/MOGHAL SAHEERA BEGUM  (UK).jpeg",
  "Harsha Vardhan Reddy": "/assets/images/HARSHA VARDHAN REDDY (USA).jpeg",
  "Ashritha Reddy Beerelly": "/assets/images/ASHRITHA REDDY BEERELLY (UK).jpeg",
  "Kannikanti Geethika Chowdary": "/assets/images/KANNIKANTI GEETHIKA CHOWDARY (USA).jpeg",
  "Bojja Glory": "/assets/images/BOJJA GLORY (UK).jpeg",
  "Khyathi Raguru": "/assets/images/KHYATHI RAGURU (USA).jpeg",
  "Deekshith Kumar Gudepu": "/assets/images/DEEKSHITH KUMAR GUDEPU (UK).jpeg",
  "Nithya Sree Bussu": "/assets/images/NITHYA SREE BUSSU (USA).jpeg",
  "Kathi Tulasi": "/assets/images/KATHI TULASI (UK).jpeg",
  "Preethi Kalva": "/assets/images/PREETHI KALVA (USA).jpeg",
  "Sravya Sree Bussu": "/assets/images/SRAVYA SREE BUSSU (USA).jpeg",
  "Pakala Meghana Reddy": "/assets/images/PAKALA MEGHANA REDDY (UK).jpeg",
  "Soumya Gopagoni": "/assets/images/SOUMYA GOPAGONI (UK).jpeg",
  "Adavalli Tharun Kumar": "/assets/images/ADAVALLI THARUN KUMAR (UK).jpeg",
  "Ummagani Sai Kumar": "/assets/images/UMMAGANI SAI KUMAR (UK).jpeg",
  "Priyanka": "/assets/images/Priyanka.jpg",
};

const testimonialsData = [
  {
    name: "Dakannagari Rohith Reddy",
    testimonial: "I had an amazing experience with Vsource. From day one, the team was supportive, patient, and always available to answer my questions. Their attention to detail ensured my visa application was perfect. Highly recommended",
    country: "USA"
  },
  {
    name: "Aninash Yadav",
    testimonial: "Vsource Consultancy made my dream of studying abroad a reality. Their expertise and step-by-step guidance made the entire process smooth and stress-free. Special thanks to the counsellors for being so responsive and professional",
    country: "UK"
  },
  {
    name: "Duddempudi Sahana",
    testimonial: "I'm truly grateful to Vsource Consultancy for their dedicated support throughout my student visa journey. They were transparent, thorough, and genuinely cared about my success. Thank you for making it happen",
    country: "USA"
  },
  {
    name: "Asar Ali Mohammed",
    testimonial: "The service I received from Vsource Consultancy exceeded all my expectations. They guided me through every step of the process, and their insights into the visa requirements were incredibly helpful. Highly trustworthy",
    country: "UK"
  },
  {
    name: "Moghal Saheera Begum",
    testimonial: "Vsource Consultancy is hands down the best in the business. Their knowledge, efficiency, and personalized service made a complex process seem simple. I couldn't have asked for better support.",
    country: "UK"
  },
  {
    name: "Harsha Vardhan Reddy",
    testimonial: "From choosing the right country to preparing my documents, Vsource Consultancy was there with me at every stage. The staff is well-informed and very approachable. They turned a stressful process into an enjoyable journey.",
    country: "USA"
  },
  {
    name: "Ashritha Reddy Beerelly",
    testimonial: "A big thank you to Vsource Consultancy! Their team helped me secure my visa without any hiccups. They were always available to clarify doubts and ensured every document was in perfect order.",
    country: "UK"
  },
  {
    name: "Kannikanti Geethika Chowdary",
    testimonial: "Exceptional service! Vsource Consultancy guided me with patience and professionalism. Their attention to every detail made all the difference. I highly recommend them to anyone looking to study or work abroad.",
    country: "USA"
  },
  {
    name: "Bojja Glory",
    testimonial: "The staff at VsourceConsultancy are true professionals. They know exactly what they're doing and keep you informed throughout the process. I am so thankful for their support and guidance.",
    country: "UK"
  },
  {
    name: "Khyathi Raguru",
    testimonial: "I can't thank Vsource Consultancy enough. Their well-structured process, continuous communication, and honest advice gave me great confidence. My visa was approved smoothly, all thanks to their excellent work.",
    country: "USA"
  },
  {
    name: "Deekshith Kumar Gudepu",
    testimonial: "Superb service from start to finish! The team was incredibly knowledgeable and handled my application with care and precision. Thank you, Vsource Consultancy, for your outstanding support.",
    country: "UK"
  },
  {
    name: "Nithya Sree Bussu",
    testimonial: "I was impressed by how organized and efficient Vsource Consultancy is. They guided me on every requirement, kept me updated, and ensured my application was flawless. 100% satisfied",
    country: "USA"
  },
  {
    name: "Kathi Tulasi",
    testimonial: "I had a wonderful experience with Vsource Consultancy. Their expert advice and friendly attitude made me feel at ease throughout the process. Highly recommended for anyone planning to go abroad",
    country: "UK"
  },
  {
    name: "Preethi Kalva",
    testimonial: "Professional, friendly, and reliable — that's how I'd describe Abroad Consultancy. They handled my entire visa application seamlessly. Their commitment is commendable",
    country: "USA"
  },
  {
    name: "Sravya Sree Bussu",
    testimonial: "Vsource Consultancy offers a rare combination of professionalism and personal attention. They helped me with everything — from choosing universities to visa documentation. Thank you for making it so easy",
    country: "USA"
  },
  {
    name: "Pakala Meghana Reddy",
    testimonial: "If you're confused about how to start your study abroad journey, look no further than Vsource Consultancy. They are incredibly supportive and efficient. I had a flawless experience",
    country: "UK"
  },
  {
    name: "Soumya Gopagoni",
    testimonial: "I was nervous about the visa process, but Vsource Consultancy made it completely hassle-free. Their team is approachable, experienced, and always ready to help. A big thank you",
    country: "UK"
  },
  {
    name: "Adavalli Tharun Kumar",
    testimonial: "Thanks to Vsource Consultancy, I'm now on my way to study in Canada! Their guidance was thorough, and they followed up consistently to make sure I didn't miss anything. Great team",
    country: "UK"
  },
  {
    name: "Ummagani Sai Kumar",
    testimonial: "The best decision I made was choosing Vsource Consultancy for my student visa. They are reliable, knowledgeable, and genuinely interested in your success. I highly recommend their services.",
    country: "UK"
  },
  {
    name: "Priyanka",
    testimonial: "Outstanding experience with Vsource Consultancy. Their team is well-trained, courteous, and fully committed to helping clients achieve their goals. Thank you for your constant support and encouragement",
    country: "USA"
  }
];

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("all");

  const galleryItems = [
   
  {
    id: 9,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs13.jpeg",
    is360: false
  },
  {
    id: 10,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs14.jpeg",
    is360: false
  },
  {
    id: 11,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs2.jpeg",
    is360: false
  },
  {
    id: 12,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs1.jpeg",
    is360: false
  },
  {
    id: 13,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs6.jpeg",
    is360: false
  },
  {
    id: 14,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs5.jpeg",
    is360: false
  },
  {
    id: 15,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs4.jpeg",
    is360: false
  },
  {
    id: 16,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs3.jpeg",
    is360: false
  },
  {
    id: 17,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs7.jpeg",
    is360: false
  },
  {
    id: 18,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs8.jpeg",
    is360: false
  },
  {
    id: 19,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs9.jpeg",
    is360: false
  },
  {
    id: 20,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs10.jpeg",
    is360: false
  },
  {
    id: 21,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/assets/images/vs16.jpeg",
    is360: false
  },

    {
        id: 22,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/assets/images/vs12.jpeg",
        is360: false,
    },
    {
        id: 23,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/gallery2.jpg",
        is360: false,
    },
    {
        id: 24,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/gallery1.jpg",
        is360: false,
    },
    {
        id: 25,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/17.jpeg",
        is360: false,
    },
    {
        id: 26,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/19.jpeg",
        is360: false,
    },
    {
        id: 27,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/20.jpeg",
        is360: false,
    },
    {
        id: 28,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/16.jpeg",
        is360: false,
    },
    {
        id: 29,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/gallery10.jpg",
        is360: false,
    },
    {
        id: 30,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/14.jpeg",
        is360: false,
    },
    {
        id: 31,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/15.jpeg",
        is360: false,
    },
    {
        id: 32,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/1.jpeg",
        is360: false,
    },
    {
        id: 33,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/2.jpeg",
        is360: false,
    },
    {
        id: 34,
        category: "photos",
        imageSrc: "https://vsourceoverseas.com/uploads/gallery/12.jpeg",
        is360: false,
    },
    {
      "id": 35,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/13.jpeg",
      "is360": false
    },
    {
      "id": 36,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/gallery(17).jpg",
      "is360": false
    },
    {
      "id": 37,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/21.jpeg",
      "is360": false
    },
    {
      "id": 38,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/22.jpeg",
      "is360": false
    },
    {
      "id": 39,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/23.jpeg",
      "is360": false
    },
    {
      "id": 40,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/24.jpeg",
      "is360": false
    },
    {
      "id": 41,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/BFGD.jpg",
      "is360": false
    },
    {
      "id": 42,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/RETYU.jpg",
      "is360": false
    },
    {
      "id": 43,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/TRHB.jpeg",
      "is360": false
    },
    {
      "id": 44,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/UKIU.jpeg",
      "is360": false
    },
    {
      "id": 45,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/FHGC.jpg",
      "is360": false
    },
    {
      "id": 46,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/HDTSG.jpg",
      "is360": false
    },
    {
      "id": 47,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/EYTYBR.jpg",
      "is360": false
    },
    {
      "id": 48,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/TRYR.jpg",
      "is360": false
    },
    {
      "id": 49,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/AODDM.jpeg",
      "is360": false
    },
    {
      "id": 50,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/YJTY.jpeg",
      "is360": false
    },
    {
      "id": 51,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/221.jpeg",
      "is360": false
    },
    {
      "id": 52,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/1.jpeg",
      "is360": false
    },
    {
      "id": 53,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/KJFGNJS.jpeg",
      "is360": false
    },
    {
      "id": 54,
      "category": "photos",
      "imageSrc": "https://vsourceoverseas.com/uploads/gallery/LKMDGKODFNHD.jpeg",
      "is360": false
    },
  {
    id: 55,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/P,OERMGOPTMH.jpeg",
    is360: false,
  },
  {
    id: 56,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/RTRIHG.jpeg",
    is360: false,
  },
  {
    id: 57,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/kjhgff.jpeg",
    is360: false,
  },
  {
    id: 58,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/ihiug.jpeg",
    is360: false,
  },
  {
    id: 59,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/fdbzfdb.jpeg",
    is360: false,
  },
  {
    id: 60,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/sdzvdfv.jpeg",
    is360: false,
  },
  {
    id: 61,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/11111.jpeg",
    is360: false,
  },
  {
    id: 62,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/22222.jpeg",
    is360: false,
  },
  {
    id: 63,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/3333.jpeg",
    is360: false,
  },
  {
    id: 64,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/uk1.jpeg",
    is360: false,
  },
  {
    id: 65,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/uk2.jpeg",
    is360: false,
  },
  {
    id: 66,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/uk3.jpeg",
    is360: false,
  },
  {
    id: 67,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/uk4.jpeg",
    is360: false,
  },
  {
    id: 68,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/uk5.jpeg",
    is360: false,
  },
  {
    id: 69,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/uk6.jpeg",
    is360: false,
  },
  {
    id: 70,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/51.jpeg",
    is360: false,
  },
  {
    id: 71,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/84.jpeg",
    is360: false,
  },
  {
    id: 72,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/C1660T01.JPG",
    is360: false,
  },
  {
    id: 73,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/C1664T01.JPG",
    is360: false,
  },
  {
    id: 74,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/C1665T01.JPG",
    is360: false,
  },
  {
    id: 75,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/C1666T01.JPG",
    is360: false,
  },
  {
    id: 76,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/C1667T01.JPG",
    is360: false,
  },
  {
    id: 77,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/CK9660T01.JPG",
    is360: false,
  },
  {
    id: 78,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/CK9661T01.JPG",
    is360: false,
  },
  {
    id: 79,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/CK9664T01.JPG",
    is360: false,
  },
  {
    id: 80,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/CK9665T01.JPG",
    is360: false,
  },
  {
    id: 81,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/CK9712T01.JPG",
    is360: false,
  },
  {
    id: 82,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/CK9723T01.JPG",
    is360: false,
  },
  {
    id: 83,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/CK9734T01.JPG",
    is360: false,
  },
  {
    id: 84,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/CK9748T01.JPG",
    is360: false,
  },
  {
    id: 85,
    category: "photos",
    imageSrc: "https://vsourceoverseas.com/uploads/gallery/C1622T01.JPG",
    is360: false,
  }



  ];

  const showVirtualTour = activeTab === "offices" || activeTab === "all";

  const filteredItems = galleryItems.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "offices") return item.category === "offices";
    if (activeTab === "photos") return item.category === "photos";
    if (activeTab === "students") return item.category === "students";
    return false;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-darkblue to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Visual Journey</h1>
          <p className="text-xl text-gray-300">
            Explore our offices, photos, and student success moments through our visual gallery
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-16">
        <div className="container mx-auto px-4">
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              {["all", "offices", "photos", "students"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? "bg-white shadow-sm text-primary" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === "offices"
                    ? "360° Tours"
                    : tab === "students"
                    ? "Student Success"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 360° Tour - ONLY in "All" or "Offices" tab */}
          {showVirtualTour && (
            <section className="mb-16">
              <SectionTitle 
                title="Virtual Office Tours"
                subtitle="Take a 360° tour of our main offices across India"
              />
              <AnimateOnScroll>
                <div className="mt-10 max-w-4xl mx-auto">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <iframe 
                        src="https://vsourceadmissions.com/360View/" 
                        title="Hyderabad Office Virtual Tour"
                        className="w-full h-full border-0 rounded-lg"
                        allowFullScreen
                      />
                    </div>
                    
                  </div>
                </div>
              </AnimateOnScroll>
            </section>
          )}

         {/* Student Success Section */}
{(activeTab === "students" || activeTab === "all") && (
<Successstories/>
)}



          {/* Regular Gallery Grid */}
          {activeTab !== "students" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <AnimateOnScroll key={item.id} delay={index * 100}>
                  {activeTab === "photos" ? (
                    <div className="bg-white rounded-lg overflow-hidden shadow-md group relative">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={item.imageSrc} 
                          alt={item.title || 'Gallery Photo'} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg overflow-hidden shadow-md group relative">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={item.imageSrc} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {item.is360 && (
                          <div className="absolute top-4 right-4 bg-primary text-white rounded-full px-3 py-1 text-xs font-semibold">
                            360° View
                          </div>
                        )}
                        
                      </div>
                      {/* <div className="p-4">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                       
                      </div> */}
                    </div>
                  )}
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GalleryPage;