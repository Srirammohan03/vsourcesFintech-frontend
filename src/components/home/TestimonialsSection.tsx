import { useEffect, useState, useRef } from "react";

const imagePaths: Record<string, string> = {
  "Dakannagari Rohith Reddy":
    "/assets/images/students/DAKANNAGARI ROHITH REDDY  (USA).jpg",
  "Aninash Yadav": "/assets/images/students/ANINASH YADAV  (UK).jpg",
  "Duddempudi Sahana": "/assets/images/students/DUDDEMPUDI SAHANA  (USA).jpg",
  "Asar Ali Mohammed": "/assets/images/students/ASAR ALI MOHAMMED  (UK).jpg",
  "Moghal Saheera Begum":
    "/assets/images/students/MOGHAL SAHEERA BEGUM  (UK).jpg",
  "Harsha Vardhan Reddy":
    "/assets/images/students/HARSHA VARDHAN REDDY (USA).jpg",
  "Ashritha Reddy Beerelly":
    "/assets/images/students/ASHRITHA REDDY BEERELLY (UK).jpg",
  "Kannikanti Geethika Chowdary":
    "/assets/images/students/KANNIKANTI GEETHIKA CHOWDARY (USA).jpg",
  "Bojja Glory": "/assets/images/students/BOJJA GLORY (UK).jpg",
  "Khyathi Raguru": "/assets/images/students/KHYATHI RAGURU (USA).jpg",
  "Deekshith Kumar Gudepu":
    "/assets/images/students/DEEKSHITH KUMAR GUDEPU (UK).jpg",
  "Nithya Sree Bussu": "/assets/images/students/NITHYA SREE BUSSU (USA).jpg",
  "Kathi Tulasi": "/assets/images/students/KATHI TULASI (UK).jpg",
  "Preethi Kalva": "/assets/images/students/PREETHI KALVA (USA).jpg",
  "Sravya Sree Bussu": "/assets/images/students/SRAVYA SREE BUSSU (USA).jpg",
  "Pakala Meghana Reddy":
    "/assets/images/students/PAKALA MEGHANA REDDY (UK).jpg",
  "Soumya Gopagoni": "/assets/images/students/SOUMYA GOPAGONI (UK).jpg",
  "Adavalli Tharun Kumar":
    "/assets/images/students/ADAVALLI THARUN KUMAR (UK).jpg",
  "Ummagani Sai Kumar": "/assets/images/students/UMMAGANI SAI KUMAR (UK).jpg",
  Priyanka: "/assets/images/students/Priyanka.jpg",
};

const testimonialsData = [
  {
    name: "Dakannagari Rohith Reddy",
    testimonial:
      "I had an amazing experience with Vsource. From day one, the team was supportive, patient, and always available to answer my questions. Their attention to detail ensured my visa application was perfect. Highly recommended",
  },
  {
    name: "Aninash Yadav",
    testimonial:
      "Vsource Consultancy made my dream of studying abroad a reality. Their expertise and step-by-step guidance made the entire process smooth and stress-free. Special thanks to the counsellors for being so responsive and professional",
  },
  {
    name: "Duddempudi Sahana",
    testimonial:
      "I'm truly grateful to Vsource Consultancy for their dedicated support throughout my student visa journey. They were transparent, thorough, and genuinely cared about my success. Thank you for making it happen",
  },
  {
    name: "Asar Ali Mohammed",
    testimonial:
      "The service I received from Vsource Consultancy exceeded all my expectations. They guided me through every step of the process, and their insights into the visa requirements were incredibly helpful. Highly trustworthy",
  },
  {
    name: "Moghal Saheera Begum",
    testimonial:
      "Vsource Consultancy is hands down the best in the business. Their knowledge, efficiency, and personalized service made a complex process seem simple. I couldn't have asked for better support.",
  },
  {
    name: "Harsha Vardhan Reddy",
    testimonial:
      "From choosing the right country to preparing my documents, Vsource Consultancy was there with me at every stage. The staff is well-informed and very approachable. They turned a stressful process into an enjoyable journey.",
  },
  {
    name: "Ashritha Reddy Beerelly",
    testimonial:
      "A big thank you to Vsource Consultancy! Their team helped me secure my visa without any hiccups. They were always available to clarify doubts and ensured every document was in perfect order.",
  },
  {
    name: "Kannikanti Geethika Chowdary",
    testimonial:
      "Exceptional service! Vsource Consultancy guided me with patience and professionalism. Their attention to every detail made all the difference. I highly recommend them to anyone looking to study or work abroad.",
  },
  {
    name: "Bojja Glory",
    testimonial:
      "The staff at VsourceConsultancy are true professionals. They know exactly what they're doing and keep you informed throughout the process. I am so thankful for their support and guidance.",
  },
  {
    name: "Khyathi Raguru",
    testimonial:
      "I can't thank Vsource Consultancy enough. Their well-structured process, continuous communication, and honest advice gave me great confidence. My visa was approved smoothly, all thanks to their excellent work.",
  },
  {
    name: "Deekshith Kumar Gudepu",
    testimonial:
      "Superb service from start to finish! The team was incredibly knowledgeable and handled my application with care and precision. Thank you, Vsource Consultancy, for your outstanding support.",
  },
  {
    name: "Nithya Sree Bussu",
    testimonial:
      "I was impressed by how organized and efficient Vsource Consultancy is. They guided me on every requirement, kept me updated, and ensured my application was flawless. 100% satisfied",
  },
  {
    name: "Kathi Tulasi",
    testimonial:
      "I had a wonderful experience with Vsource Consultancy. Their expert advice and friendly attitude made me feel at ease throughout the process. Highly recommended for anyone planning to go abroad",
  },
  {
    name: "Preethi Kalva",
    testimonial:
      "Professional, friendly, and reliable — that's how I'd describe Abroad Consultancy. They handled my entire visa application seamlessly. Their commitment is commendable",
  },
  {
    name: "Sravya Sree Bussu",
    testimonial:
      "Vsource Consultancy offers a rare combination of professionalism and personal attention. They helped me with everything — from choosing universities to visa documentation. Thank you for making it so easy",
  },
  {
    name: "Pakala Meghana Reddy",
    testimonial:
      "If you're confused about how to start your study abroad journey, look no further than Vsource Consultancy. They are incredibly supportive and efficient. I had a flawless experience",
  },
  {
    name: "Soumya Gopagoni",
    testimonial:
      "I was nervous about the visa process, but Vsource Consultancy made it completely hassle-free. Their team is approachable, experienced, and always ready to help. A big thank you",
  },
  {
    name: "Adavalli Tharun Kumar",
    testimonial:
      "Thanks to Vsource Consultancy, I'm now on my way to study in Canada! Their guidance was thorough, and they followed up consistently to make sure I didn't miss anything. Great team",
  },
  {
    name: "Ummagani Sai Kumar",
    testimonial:
      "The best decision I made was choosing Vsource Consultancy for my student visa. They are reliable, knowledgeable, and genuinely interested in your success. I highly recommend their services.",
  },
  // [ ...your existing testimonial data... ]
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: currentIndex * sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">
      <style>
        {`
          @keyframes moveBackground {
            0% { background-position: 0 0; }
            100% { background-position: -100% 0; }
          }
          .animated-bg {
            background-image: url('/assets/images/branches/bg test.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.25;
          }
          @media (max-width: 640px) {
            .animated-bg {
              background-size: 200% 100%;
              background-repeat: repeat-x;
              animation: moveBackground 40s linear infinite;
            }
          }
        `}
      </style>
      {/* Background */}
      <div className="animated-bg z-0"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-600 drop-shadow-lg">
            Success Stories
          </h2>
          <p className="text-base md:text-lg text-black-900 mt-20 mt-35">
            Hear from our students who have achieved their academic and career
            goals with our guidance.
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden sm:block relative h-[400px] w-full">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white bg-opacity-70 text-black p-5 rounded-xl max-w-4xl w-full mx-auto">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={
                      imagePaths[
                        testimonialsData[currentIndex]
                          .name as keyof typeof imagePaths
                      ]
                    }
                    alt={testimonialsData[currentIndex].name}
                    loading="lazy"
                    className="rounded-full w-36 h-36 object-cover shadow-lg"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-lg md:text-xl mb-4 italic leading-relaxed">
                    "{testimonialsData[currentIndex].testimonial}"
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {testimonialsData[currentIndex].name}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-3 shadow-md z-20 hover:bg-gray-100 transition-colors"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-3 shadow-md z-20 hover:bg-gray-100 transition-colors"
          >
            ▶
          </button>
        </div>

        {/* Mobile */}
        <div className="sm:hidden relative py-4">
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory px-4"
          >
            {testimonialsData.map(({ name, testimonial }, i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-full max-w-xs mx-auto bg-white bg-opacity-70 text-black p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mb-4">
                  <img
                    src={imagePaths[name as keyof typeof imagePaths]}
                    alt={name}
                    loading="lazy"
                    className="rounded-full w-24 h-24 object-cover mx-auto shadow-md"
                  />
                </div>
                <p className="text-md italic mb-3">"{testimonial}"</p>
                <h3 className="text-lg font-semibold">{name}</h3>
              </div>
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-2 shadow-md z-10"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-2 shadow-md z-10"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
