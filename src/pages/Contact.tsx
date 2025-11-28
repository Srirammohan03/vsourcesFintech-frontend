import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SectionTitle from "@/components/SectionTitle";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const location = useLocation();
  const [selectedService, setSelectedService] = useState("");

  // Scroll to top on page load and handle URL query params
  useEffect(() => {
    window.scrollTo(0, 0);

    // Get program from URL query parameter
    const params = new URLSearchParams(location.search);
    const program = params.get("program");

    if (program) {
      setSelectedService(program);
    }
  }, [location]);

  const branches = [
    {
      id: 1,
      city: "Hyderabad",
      address: "123 Educational Lane, Knowledge City, Hyderabad 500001",
      phone: "+91 123 456 7890",
      email: "hyderabad@vsource.com",
      hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    },
    {
      id: 2,
      city: "Delhi",
      address: "456 Academic Avenue, Study District, Delhi 110001",
      phone: "+91 234 567 8901",
      email: "delhi@vsource.com",
      hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    },
    {
      id: 3,
      city: "Mumbai",
      address: "789 Campus Road, Education Quarter, Mumbai 400001",
      phone: "+91 345 678 9012",
      email: "mumbai@vsource.com",
      hours: "Mon-Sat: 10:00 AM - 7:00 PM",
    },
  ];

  // List of available services
  const services = [
    { value: "", label: "Select a service" },
    { value: "Study Abroad Counseling", label: "Study Abroad Counseling" },
    { value: "Visa Assistance", label: "Visa Assistance" },
    { value: "University Selection", label: "University Selection" },
    { value: "Scholarship Guidance", label: "Scholarship Guidance" },
    { value: "Other", label: "Other" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-36 pb-20 bg-gradient-to-b from-darkblue to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Branches</h1>
            <p className="text-xl text-gray-300">
              Visit our offices across India for in-person consultations
            </p>
          </div>
        </div>
      </section>

      {/* Branch Locations */}
      <section className="py-16 md:py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                city: "Dilsukhnagar",
                address:
                  "Vsource, Near Shashi Hospital, Metro pillar no-1519, Dilsukhnagar, Hyderabad- 500060, Telangana.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/VSource/@17.3692602,78.519197,17z/data=!3m1!4b1!4m5!3m4!1s0x3bcb98f7d166d455:0x1d4049b98242ba23!8m2!3d17.3692602!4d78.5213857",
                imageUrl: "/assets/images/branches/Dilsukhnagar.jpg",
              },
              {
                city: "Ameerpet",
                address:
                  "Vsource Building, Kamma Sangam lane, Ameerpet, Hyderabad- 500073, Telangana.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl: "https://maps.app.goo.gl/wfy4bB9sGaUVBtKf7",
                imageUrl: "/assets/images/branches/Ameerpet.webp",
              },
              {
                city: "KPHB - JNTU",
                address:
                  "Beside JNTU Metro station Near ICICI Bank, Hyderabad, Telangana.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl: "https://maps.app.goo.gl/YEPNx4qtezQ4SCjTA",
                imageUrl: "/assets/images/branches/jntu branch.jpg",
              },
              {
                city: "Vijayawada",
                address:
                  "1st floor, Mouli Towers, Beside Reliance Trends, Benz Circle, Vijayawada, AP.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl: "https://maps.app.goo.gl/8S3veFkys9eqbEPJ8",
                imageUrl: "/assets/images/branches/vijaywada branch.jpeg",
              },
              {
                city: "Visakhapatnam",
                address:
                  "Annapurna Nilayam 2nd Floor, Opp Hotel Kamat, Lawson's Bay Colony, Visakhapatnam, AP.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl:
                  "https://www.google.com/maps/place/Annapurna+Nilayam/@17.7260105,83.3154943,15z/data=!4m10!1m2!2m1!1sAnnapurna+Nilayam+2nd+Floor,+Opp+Hotel+Kamat,+Lawson's+Bay+Colony,+Visakhapatnam,+AP.!3m6!1s0x3a3943003fa4956b:0xc818085c92e6c50c!8m2!3d17.7260105!4d83.3345487!15sClVBbm5hcHVybmEgTmlsYXlhbSAybmQgRmxvb3IsIE9wcCBIb3RlbCBLYW1hdCwgTGF3c29uJ3MgQmF5IENvbG9ueSwgVmlzYWtoYXBhdG5hbSwgQVAukgESYXBhcnRtZW50X2J1aWxkaW5nqgHPARABKlQiUGFubmFwdXJuYSBuaWxheWFtIDJuZCBmbG9vciBvcHAgaG90ZWwga2FtYXQgbGF3c29uJ3MgYmF5IGNvbG9ueSB2aXNha2hhcGF0bmFtIGFwKAAyHxABIhvuhInUa5mDOARt2VWc3lqHzM6Cr3G5c1dyBg0yVBACIlBhbm5hcHVybmEgbmlsYXlhbSAybmQgZmxvb3Igb3BwIGhvdGVsIGthbWF0IGxhd3NvbidzIGJheSBjb2xvbnkgdmlzYWtoYXBhdG5hbSBhcOABAA!16s%2Fg%2F11vxmf0vlw?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D",
                imageUrl: "/assets/images/branches/vizga.webp",
              },
              {
                city: "Tirupathi",
                address:
                  "19-3-1/s, 3rd Floor, Renigunta Rd, Near Jawa showroom, Tirupathi - 517501.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl: "https://maps.app.goo.gl/oEAfuChXdMDMHt1H6",
                imageUrl: "/assets/images/branches/tirupati branch.jpeg",
              },

              {
                city: "Bengaluru",
                address:
                  "#88, 9th cross G-Block, Sahakar Nagar, Bengaluru-560092, Karnataka.",
                phone: "+91 91217 11119",
                email: "Support@vsourceadmissions.com",
                hours: "10am to 8pm",
                locationUrl: "https://maps.app.goo.gl/7Jkr9TLvTZmor3sY9",
                imageUrl: "/assets/images/branches/bangular.webp",
              },
            ].map((branch, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-56 bg-gray-200">
                    {branch.imageUrl ? (
                      <img
                        src={branch.imageUrl}
                        alt={`${branch.city} Branch`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <MapPin className="h-10 w-10 text-primary/60" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between flex-grow p-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        {branch.city} Branch
                      </h3>
                      <div className="space-y-3">
                        <div className="flex">
                          <MapPin className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">
                            {branch.address}
                          </span>
                        </div>
                        <div className="flex">
                          <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{branch.phone}</span>
                        </div>
                        <div className="flex">
                          <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{branch.email}</span>
                        </div>
                        <div className="flex">
                          <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{branch.hours}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={branch.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded font-medium transition-colors inline-flex items-center justify-center"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/*       */}
    </>
  );
};

export default ContactPage;
