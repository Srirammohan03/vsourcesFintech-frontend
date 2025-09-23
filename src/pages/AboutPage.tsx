import { useEffect } from "react";
import SectionTitle from "@/components/SectionTitle";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AboutSection from "../components/home/Aboutsectioninside";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { AboutUsBanner, InnerAboutUs, Members } from "@/lib/types/LandingPage";
import { toast } from "sonner";
import axios from "axios";
import TeamSkeleton from "@/Loaders/about-us/TeamSkeleton";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";

const fetchAboutBanner = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/about-us?populate[about][on][about-us.hero][populate][banner][fields][0]=url&populate[about][on][about-us.hero][populate][banner][fields][1]=alternativeText`
  );
  return data.data.about[0];
};

const fetchAboutUs = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/about-us?populate[about][on][fintech.about-fintech][populate][subheadings]=true&populate[about][on][fintech.about-fintech][populate][about_cards][populate][image][fields][0]=url&populate[about][on][fintech.about-fintech][populate][about_cards][populate][image][fields][1]=documentId&populate[about][on][fintech.about-fintech][populate][about_cards][populate][image][fields][2]=name&populate[about][on][fintech.about-fintech][populate][chairman][fields][0]=url&populate[about][on][fintech.about-fintech][populate][chairman][fields][1]=documentId&populate[about][on][fintech.about-fintech][populate][chairman][fields][2]=name`
  );
  return data.data.about[0];
};

const fetchMembers = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/about-us?populate[about][on][about-us.management-team][populate][members][populate][image][fields][0]=url&populate[about][on][about-us.management-team][populate][members][populate][image][fields][1]=alternativeText`
  );
  return data.data.about[0];
};

const AboutPage = () => {
  const {
    data: aboutData,
    isLoading,
    isError,
    error,
  } = useQuery<AboutUsBanner>({
    queryKey: ["bannerAbout"],
    queryFn: fetchAboutBanner,
  });

  const {
    data: aboutUsData,
    isLoading: aboutLoading,
    isError: aboutError,
    error: aboutErr,
  } = useQuery<InnerAboutUs>({
    queryKey: ["aboutUs"],
    queryFn: fetchAboutUs,
  });

  const {
    data: members,
    isLoading: memberLoading,
    isError: memberError,
    error: memberErr,
  } = useQuery<Members>({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error("failed to load banner");
    console.log("failed to load banner", error);
  }

  if (memberError) {
    toast.error("failed to load Members");
    console.log("failed to load Members", memberErr);
  }

  if (isLoading || !aboutData) {
    return <BannerSkeleton />;
  }

  if (memberLoading || !members) {
    return <TeamSkeleton />;
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-40 pb-36 bg-cover bg-center bg-no-repeat relative text-white"
        style={{
          backgroundImage: `url(${
            aboutData?.banner?.url || "/assets/images/about-banner.jpg"
          })`,
        }}
      >
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-darkblue/60 to-gray-900/90"></div>

        {/* Content */}
        <div className="relative w-full max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">
              {aboutData?.title || "About Us"}
            </h1>
            <p className="text-xl text-gray-300">
              {aboutData?.description ||
                "Learn about our journey, our team, and our mission to provide exceptional educational consultancy for over 20 years."}
            </p>
          </div>
        </div>
      </section>
      <style>{`
      .py-16 {
    padding-top:0.5rem !important;
    padding-bottom: 4rem;
}

      `}</style>

      {/* About Content */}

      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <AboutSection
            aboutData={aboutUsData}
            error={aboutErr}
            isError={aboutError}
            isLoading={aboutLoading}
          />
        </div>
      </section>

      {/* Team Section */}

      <>
        <section className="py-16 md:py-24">
          <div className="w-full max-w-[1400px] mx-auto px-4">
            <SectionTitle
              title={members?.basic?.title || "Our Management Team"}
              subtitle={
                members?.basic?.description ||
                "Meet the experts who make Vsource Company a trusted name in educational consultancy"
              }
            />
            <StyledTeamWrapper>
              <div className="main">
                {members &&
                  members?.members &&
                  members?.members?.map((member, index) => {
                    const delay = 50 + index * 100; // 100ms base + 100ms per index
                    return (
                      <div
                        className="profile-card"
                        key={index}
                        data-aos="fade-up"
                        data-aos-anchor-placement="center-bottom"
                        data-aos-delay={delay}
                      >
                        <div className="img">
                          <img
                            src={member?.image?.url}
                            alt={member.name}
                            data-aos="flip-left"
                            data-aos-anchor-placement="center-bottom"
                            data-aos-delay={delay}
                          />
                        </div>
                        <div className="caption">
                          <h3
                            data-aos="fade-right"
                            data-aos-anchor-placement="center-bottom"
                            data-aos-delay={delay}
                          >
                            {member?.name || "failed to load"}
                          </h3>
                          <p
                            data-aos="fade-right"
                            data-aos-anchor-placement="center-bottom"
                            data-aos-delay={delay}
                          >
                            {member?.position || "failed to load"}
                          </p>
                        </div>
                        <div className="extra-info">
                          {member?.bio || "failed to load"}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </StyledTeamWrapper>
          </div>
        </section>
      </>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <AnimateOnScroll>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#E6F0FF] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#0052CC]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-[#0052CC]">
                  Our Vision
                </h3>
                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To be the leading educational consultancy in India, recognized
                  for our integrity, personalized approach, and consistent
                  delivery of successful academic and career outcomes for our
                  students.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Mission */}
            <AnimateOnScroll delay={200}>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#FFC107]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-[#FFC107]">
                  Our Mission
                </h3>
                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To empower students with comprehensive guidance, and
                  supportive resources that enable them to make informed
                  decisions about their educational and career paths, both in
                  India and abroad.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

const StyledTeamWrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px 20px;
    padding: 10px;
  }

  .profile-card {
    position: relative;
    width: 100%;
    max-width: 260px;
    height: 355px;
    background: #fff;
    padding: 20px 20px 0px 20px;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    text-align: center;
    font-family: "Poppins", Arial, sans-serif;
    display: flex;
    flex-direction: column;
  }
  .jIozqo .img img {
    width: 200px !important;
    height: 200px !important;
    /* object-fit: cover; */
    border-radius: 15px;
    -shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    margin-left: 20px;
  }
  .profile-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
  }

  .profile-card .img {
    width: 100%;
    height: 200px; /* Fixed height for image container */
    position: relative;
    transform: translateY(-45px);
    margin-bottom: 15px;
  }

  .img img {
    width: 200px !important;
    height: 200px !important;
    // object-fit: cover; /* Ensures images maintain aspect ratio */
    border-radius: 15px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    margin-left: 20px;
  }

  .profile-card:hover .img img {
    transform: scale(1.05);
  }

  .caption {
    margin-top: 10px;
    transform: translateY(-45px);
  }

  .caption h3 {
    font-size: clamp(0.7rem, 2.5vw, 1.1rem);
    margin: 0;
    color: #333;
    word-wrap: break-word;
  }

  .caption p {
    font-size: clamp(0.7rem, 2vw, 1rem);
    color: rgb(243, 35, 8);
    margin: 5px 0 5px;
    word-wrap: break-word;
  }

  .extra-info {
    font-size: clamp(0.5rem, 2vw, 1rem);
    color: #555;
    opacity: 1;
    transform: translateY(-45px);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .profile-card,
  .img img,
  .extra-info {
    transition: all 0.3s ease-in-out;
  }

  @media (min-width: 768px) {
    .main {
      gap: 50px 30px;
    }

    .profile-card {
      max-width: 280px;
      height: 395px; /* Maintain same height on desktop */
      padding: 30px 30px 0px 30px;
    }

    .profile-card .img {
      height: 220px; /* Slightly larger images on desktop */
    }
  }

  @media (max-width: 460px) {
    .main {
      gap: 50px 30px;
    }
    .profile-card {
      max-width: 260px;
      height: 320px; /* Slightly smaller on mobile */
      padding: 10px 10px 0px 10px;
    }

    .profile-card .img {
      height: 180px; /* Slightly smaller images on mobile */
    }

    .caption h3 {
      font-size: clamp(1rem, 2.2vw, 1.2rem);
    }

    .caption p {
      font-size: clamp(1.1rem, 2vw, 0.9rem);
    }
    .extra-info {
      font-size: clamp(0.8rem, 2vw, 0.9rem);
    }
  }
`;

const teamMembers = [
  {
    name: "Mr. Mohammed Mustafa",
    position: "Founder",
    image: "https://vsourceoverseas.com/uploads/about_team/1698599558.jpg",
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. Nagender Rao",
    position: "Managing Director",
    image: "https://vsourceoverseas.com/uploads/about_team/dfg354d53.jpeg",
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Charan Teja",
    position: "CEO",
    image: "https://vsourceoverseas.com/uploads/about_team/sddsccDCD.jpeg",
    bio: "8 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Y Ranjith",
    position: "CFO",
    image: "https://vsourceoverseas.com/uploads/about_team/YR.jpg",
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Sai Siva Nag",
    position: "Friend of Mr. Mustafa",
    image: "https://vsourceoverseas.com/uploads/about_team/SIVASIR.jpeg",
    bio: "20 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Shaik Yasin",
    position: "Executive Director",
    image: "https://vsourceoverseas.com/uploads/about_team/1698618435.jpg",
    bio: "8 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Akram",
    position: "Director, Admissions",
    image: "https://vsourceoverseas.com/uploads/about_team/AKRAM.jpeg",
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Satyam Tomer",
    position: "Chief Technical Officer",
    image: "https://vsourceoverseas.com/uploads/about_team/team9.jpg",
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Virendra Singh",
    position: "Vice President",
    image: "https://vsourceoverseas.com/uploads/about_team/team2.jpg",
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. Vijay Kumar",
    position: "Chief Advisor",
    image: "https://vsourceoverseas.com/uploads/about_team/team10.jpg",
    bio: "VSOURCE GROUP",
  },
  {
    name: "Mr. Arun",
    position: "Chief Operating Officer",
    image: "https://vsourceoverseas.com/uploads/about_team/team14.jpg",
    bio: "10 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Tejesh Naidu",
    position: "Director, Operations",
    image: "https://vsourceoverseas.com/uploads/about_team/TEJA.gif",
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. Rajashekar",
    position: "Director, Education",
    image: "https://vsourceoverseas.com/uploads/about_team/team15.jpg",
    bio: "9 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Habib",
    position: "Director, Marketing",
    image:
      "https://vsourceoverseas.com/uploads/about_team/GVGCFCFVGHBHJBHJB.jpeg",
    bio: "10 YEARS WITH VSOURCE",
  },
  {
    name: "Mrs. Pushpalatha Reddy",
    position: "Director, Overseas",
    image: "https://vsourceoverseas.com/uploads/about_team/PUSHPALATHA.jpg",
    bio: "7 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Jagan Mohan",
    position: "Director, Fintech",
    image: "https://vsourceoverseas.com/uploads/about_team/JAGAN.jpeg",
    bio: "100% EDUCATION LOANS",
  },
  {
    name: "Dr. Giorgi Mikadze",
    position: "Director, Services. LLC",
    image: "https://vsourceoverseas.com/uploads/about_team/team19.jpg",
    bio: "Based in Georgia, specializing in services management.",
  },
  {
    name: "Dr. Mariam Kandelaki",
    position: "Director, Student Welfare",
    image: "https://vsourceoverseas.com/uploads/about_team/mariam.jpeg",
    bio: "Focused on student welfare initiatives in Georgia.",
  },
  {
    name: "Mr. Sreenath Reddy",
    position: "Director, Administration",
    image: "https://vsourceoverseas.com/uploads/about_team/SREENATH.jpeg",
    bio: "Leads administrative operations at VSOURCE Company.",
  },
  {
    name: "Ms. K Chaithanya",
    position: "HR",
    image: "https://vsourceoverseas.com/uploads/about_team/SDVSVSV.jpeg",
    bio: "Human Resources specialist at VSOURCE Company.",
  },
  {
    name: "Mr. Narun Reddy",
    position: "Head, Marketing",
    image:
      "https://vsourceoverseas.com/uploads/about_team/IMG_20231218_225108.jpg",
    bio: "Heads marketing operations for VSOURCE Varsity.",
  },
  {
    name: "Ms. Navya",
    position: "Head, Marketing",
    image:
      "https://vsourceoverseas.com/uploads/about_team/IMG20231031161907.jpg",
    bio: "Marketing lead for VSOURCE Overseas.",
  },
  {
    name: "Ms. Deepika",
    position: "Incharge, B.P.O",
    image: "https://vsourceoverseas.com/uploads/about_team/1698855451.jpg",
    bio: "Manages B.P.O operations at VSOURCE Fintech.",
  },

  {
    name: "Ms. Radha",
    position: "Branch Manager",
    image: "https://vsourceoverseas.com/uploads/about_team/team11.jpg",
    bio: "Branch Manager for Bengaluru operations.",
  },
  {
    name: "Mr. Mahesh",
    position: "B.P.O Incharge",
    image: "https://vsourceoverseas.com/uploads/about_team/MMAHESH.jpeg",
    bio: "Overseeing B.P.O operations at VSOURCE Overseas.",
  },
  {
    name: "Mr. Kumar",
    position: "Branch Manager",
    image: "https://vsourceoverseas.com/uploads/about_team/team16.jpg",
    bio: "Leading the Ongole branch.",
  },
  {
    name: "Mr. Srinivas Chowdary",
    position: "Branch Manager",
    image: "https://vsourceoverseas.com/uploads/about_team/KCJAHBH651566.jpeg",
    bio: "Managing branch operations in Tirupati.",
  },
  {
    name: "Mr. Srinadh Yadav",
    position: "Branch Manager",
    image:
      "https://vsourceoverseas.com/uploads/about_team/IMG_20240110_203715.jpg",
    bio: "Branch Manager for Vijayawada.",
  },
  {
    name: "Mr. Kiran Kumar",
    position: "Branch Manager",
    image: "https://vsourceoverseas.com/uploads/about_team/1698844684.jpg",
    bio: "Heading the Vizag branch.",
  },
  {
    name: "Ms. Nikhitha",
    position: "Branch Manager",
    image:
      "https://vsourceoverseas.com/uploads/about_team/IMG_20231202_140712.jpg",
    bio: "Branch Manager for Dilsukhnagar.",
  },
  {
    name: "Mr. Raj",
    position: "Branch Manager",
    image: "https://vsourceoverseas.com/uploads/about_team/IMG_3419.jpg",
    bio: "Managing the Ameerpet branch.",
  },
  {
    name: "Ms. Spandana",
    position: "Branch Manager",
    image:
      "https://vsourceoverseas.com/uploads/about_team/IMG20231031165409.jpg",
    bio: "Branch Manager in Kukatpally.",
  },
  {
    name: "Mrs. Tako",
    position: "Administration",
    image: "https://vsourceoverseas.com/uploads/about_team/tako.jpeg",
    bio: "Part of the administrative team in Georgia.",
  },
  {
    name: "Mr. Zaza",
    position: "Administration",
    image:
      "https://vsourceoverseas.com/uploads/about_team/PHOTO-2023-12-18-18-53-31.jpg",
    bio: "Administrative team member in Georgia.",
  },
  {
    name: "Mr. Aleksandre",
    position: "Accountant",
    image: "https://vsourceoverseas.com/uploads/about_team/21team.jpg",
    bio: "Accountant based in Georgia.",
  },
  {
    name: "Ms. Nino",
    position: "Administration",
    image: "https://vsourceoverseas.com/uploads/about_team/kscjanusdbjnj.jpeg",
    bio: "Administrative team member in Georgia.",
  },
  {
    name: "Mr. Dimitrilp",
    position: "Administration",
    image:
      "https://vsourceoverseas.com/uploads/about_team/PHOTO-2023-12-20-12-57-15.jpg",
    bio: "Administrative team member in Georgia.",
  },
  {
    name: "Mr. Noorbaz Khan Qaderi",
    position: "Administration",
    image: "https://vsourceoverseas.com/uploads/about_team/team22Copy1.jpg",
    bio: "Administrative team member in Russia.",
  },
  {
    name: "Mrs. Shaista Ashraf",
    position: "Head of Admissions",
    image: "https://vsourceoverseas.com/uploads/about_team/1684232284.jpg",
    bio: "Oversees admissions in UAE and Saudi Arabia.",
  },
  {
    name: "Mr. Nithin",
    position: "Senior Associate",
    image:
      "https://vsourceoverseas.com/uploads/about_team/IMG_20231220_093457.jpg",
    bio: "Senior Associate at VSOURCE Overseas.",
  },
  {
    name: "Mr. Shaik Gafoor",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/GAFOOR.gif",
    bio: "Senior Associate at VSOURCE Overseas.",
  },
  {
    name: "Mr. Venkata Sasikumar",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/SASI.jpeg",
    bio: "Senior Associate at VSOURCE Varsity.",
  },
  {
    name: "Mr. Mahesh Patil",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/MAHESH.jpeg",
    bio: "Senior Associate at VSOURCE Overseas.",
  },
  {
    name: "Mr. Bhanu Sai Prakash",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/BHANU.JPG",
    bio: "Senior Associate at VSOURCE Overseas.",
  },
  {
    name: "Mr. Radha Krishna",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/RADHA.jpeg",
    bio: "Senior Associate at VSOURCE Varsity.",
  },
  {
    name: "Mr. Venkat",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/VENKAT.jpeg",
    bio: "Senior Associate at VSOURCE Fintech.",
  },
  {
    name: "Mr. Shaik Moulali",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/MOU.jpeg",
    bio: "Senior Associate at VSOURCE Fintech.",
  },
  {
    name: "Mr. Nagaraju",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/NAGARAJU.jpeg",
    bio: "Senior Associate at VSOURCE Fintech.",
  },
  {
    name: "Ms. Kavyasree",
    position: "Senior Associate",
    image:
      "https://vsourceoverseas.com/uploads/about_team/IMG-20231201-WA0011-removebg-preview.png",
    bio: "Senior Associate at VSOURCE Fintech.",
  },
  {
    name: "Mr. Mahesh Goud",
    position: "Senior Associate",
    image: "https://vsourceoverseas.com/uploads/about_team/MAHESHGOUD.jpeg",
    bio: "Senior Associate at VSOURCE Fintech.",
  },

  {
    name: "Mr. RAKESH",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/RAKESH.jpeg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. SHAIK MUNEER",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/MUNEER.jpeg",
    bio: "Associated with VSOURCE VARSITY.",
  },
  {
    name: "Mr. M PAVAN",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/MPAVAN.jpeg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Ms. DIVYA",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/DIVYA.jpeg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. ATHAR PASHA",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/ATHAR.jpeg",
    bio: "Associated with VSOURCE VARSITY.",
  },
  {
    name: "Mr. NAGA VENKATESH",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/nagavenkatesh.jpeg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. S PAVAN",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/SPAVAN.jpeg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. BHANU SAIRAM",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/BHANUSAIRAM.jpeg",
    bio: "Associated with VSOURCE VARSITY.",
  },
  {
    name: "Mr. VIJAY",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/VIJAY.jpg",
    bio: "Associated with VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. SUBRAHMANYAM",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/SUBR.jpeg",
    bio: "Associated with VSOURCE VARSITY.",
  },
  {
    name: "Mr. LAKSHMAN",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/LAKSHMAN.jpeg",
    bio: "Associated with VSOURCE FINTECH.",
  },
  {
    name: "Mr. MOHAN KRISHNA",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/MOHAN.jpeg",
    bio: "Associated with VSOURCE FINTECH.",
  },
  {
    name: "Mr. RAMU",
    position: "Jr. ASSOCIATE",
    image: "https://vsourceoverseas.com/uploads/about_team/RAMU.jpeg",
    bio: "Associated with VSOURCE FINTECH.",
  },
  {
    name: "Mr. FAHAD",
    position: "DIGITAL MARKETING",
    image: "https://vsourceoverseas.com/uploads/about_team/Snapseed.jpeg",
    bio: "Specialist in digital marketing for VSOURCE OVERSEAS.",
  },
  {
    name: "Mr. VAMSHI",
    position: "DIGITAL MARKETING",
    image: "https://vsourceoverseas.com/uploads/about_team/VAMSHI.jpeg",
    bio: "Specialist in digital marketing for VSOURCE VARSITY.",
  },
  {
    name: "Mr. Purushotham Reddy",
    position: "GROUND MARKETING",
    image: "https://vsourceoverseas.com/uploads/about_team/team24.jpg",
    bio: "Ground marketing expert for Andhra & Telangana.",
  },
];
