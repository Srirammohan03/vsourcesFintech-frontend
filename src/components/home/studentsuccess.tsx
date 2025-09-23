// StudentWall.jsx
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { Students } from "@/lib/types/Gallery";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

const studentImages = [
  // Replace with real image URLs or import from Supabase
  "/assets/images/students/1.jpeg",
  "/assets/images/students/1.jpg",
  "/assets/images/students/2.jpeg",
  "/assets/images/students/3.jpeg",
  "/assets/images/students/4.jpeg",

  "/assets/images/students/8.jpeg",
  "/assets/images/students/9.jpeg",
  "/assets/images/students/10.jpeg",
  "/assets/images/students/11.jpeg",
  "/assets/images/students/12.jpeg",
  "/assets/images/students/13.jpeg",
  "/assets/images/students/14.jpg",

  "/assets/images/students/16.jpeg",
  "/assets/images/students/17.jpeg",
  "/assets/images/students/18.jpeg",
  "/assets/images/students/19.jpeg",
  "/assets/images/students/20.jpeg",
  "/assets/images/students/21.jpeg",
  "/assets/images/students/22.jpeg",
  "/assets/images/students/23.jpeg",
  "/assets/images/students/24.jpeg",
  "/assets/images/students/25.jpeg",
  "/assets/images/students/26.jpeg",
  "/assets/images/students/27.jpeg",
  "/assets/images/students/28.jpeg",
  "/assets/images/students/29.jpeg",
  "/assets/images/students/30.jpeg",
  "/assets/images/students/31.jpeg",
  "/assets/images/students/32.jpeg",
  "/assets/images/students/33.jpeg",
  // '/assets/images/students/34.jpeg',
  "/assets/images/students/35.jpeg",

  "/assets/images/students/36.jpg",
  "/assets/images/students/37.jpg",
  "/assets/images/students/38.jpg",
  "/assets/images/students/39.jpg",
  "/assets/images/students/40.jpg",
  "/assets/images/students/41.jpg",

  "/assets/images/students/43.jpg",
  "/assets/images/students/44.jpg",
  "/assets/images/students/45.jpg",
  "/assets/images/students/46.jpg",
  "/assets/images/students/47.jpg",
  "/assets/images/students/48.jpg",
  "/assets/images/students/49.jpg",
  "/assets/images/students/50.jpg",
  "/assets/images/students/51.jpg",
  "/assets/images/students/52.jpg",
  "/assets/images/students/53.jpg",
  "/assets/images/students/54.jpg",
  "/assets/images/students/55.jpg",
  "/assets/images/students/56.jpg",
  "/assets/images/students/57.jpg",
  "/assets/images/students/58.jpg",
  "/assets/images/students/59.jpg",
  "/assets/images/students/60.jpg",
  "/assets/images/students/61.jpg",
  "/assets/images/students/62.jpg",
  "/assets/images/students/63.jpg",
  "/assets/images/students/64.jpg",
  "/assets/images/students/65.jpg",
  "/assets/images/students/66.jpg",
  "/assets/images/students/67.jpg",
  "/assets/images/students/68.jpg",
  "/assets/images/students/69.jpg",
  "/assets/images/students/70.jpg",
  "/assets/images/students/71.jpg",
  "/assets/images/students/72.jpg",
  "/assets/images/students/73.jpg",

  "/assets/images/students/75.jpg",
  // '/assets/images/students/76.jpg',
  "/assets/images/students/77.jpg",
  "/assets/images/students/78.jpg",
  "/assets/images/students/79.jpg",
  "/assets/images/students/80.jpg",
  "/assets/images/students/81.jpg",
  "/assets/images/students/82.jpg",
  "/assets/images/students/83.jpg",
  "/assets/images/students/84.jpg",
  "/assets/images/students/85.jpg",

  // Add as many as needed...
];

export const fetchStudents = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/gallery?populate[blocks][on][gallery.student-images][populate][students_images][fields][0]=url&populate[blocks][on][gallery.student-images][populate][students_images][fields][1]=name&populate[blocks][on][gallery.student-images][populate][students_images][fields][2]=alternativeText&populate[blocks][on][gallery.student-images][populate][students_images][fields][3]=documentId`
  );
  return data.data.blocks[0] || {};
};

const StudentWall = () => {
  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery<Students>({
    queryKey: ["students"],
    queryFn: fetchStudents,
  });

  if (isError) {
    toast.error("failed to load students");
    console.error("failed to students", error);
    return null;
  }

  if (isLoading || !students) {
    return <BannerSkeleton />;
  }

  return (
    <section className="student-wall-section">
      <div className="student-wall">
        {/* Top Card */}
        <div className="info-card top-card">
          {students?.card_title || (
            <>
              {" "}
              <h2>S U C C E S S</h2>
              <p>OF VSOURCE</p>
            </>
          )}
        </div>

        {/* Student Image Grid */}
        <div className="student-grid">
          {students &&
            students?.students_images &&
            students?.students_images.map((img, index) => (
              <img
                key={img?.id || index}
                src={img?.url}
                alt={`Student ${index + 1}`}
              />
            ))}
        </div>

        {/* Bottom Card */}
        <div className="info-card bottom-card">
          {students?.card_title1 || (
            <>
              <h2>
                TRUSTED BY <span>100000+</span>
              </h2>
              <p>STUDENTS</p>
            </>
          )}
        </div>
      </div>
      <style>{`
       /* StudentWall.css */

.student-wall-section {
  background: #fff;
  padding: 0;
  position: relative;
  overflow: hidden;
}

.student-wall {
  position: relative;
  max-width: 1200px;
  margin: auto;
  padding: 2rem 0;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  padding: 0 20px;
}

.student-grid img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
}

.info-card {
  position: absolute;
  width: 100%;
  text-align: center;
  color: white;
  padding: 20px 0;
  background-color: rgba(255, 165, 0, 0.8);
  font-family: Arial, sans-serif;
  z-index: 2;
}
@media (max-width: 768px) {
  .student-grid {
    grid-template-columns: repeat(6, 1fr) !important;
  }
}
.top-card {
  top: 20%;
  transform: translateY(-50%);
}

.bottom-card {
  bottom: 40%;
  transform: translateY(50%);
}

.info-card h2 {
    font-size: 2rem;
    letter-spacing: 5px;
    margin: 0;
    font-weight:500 !important;
}

.info-card p {
  font-size: 1.2rem;
  margin: 5px 0 0 0;
}

.bottom-card h2 span {
  
  font-size: 2.5rem;
}


      `}</style>
    </section>
  );
};

export default StudentWall;
