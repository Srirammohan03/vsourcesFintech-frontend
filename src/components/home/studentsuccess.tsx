// StudentWall.jsx
import { Students } from "@/lib/types/Gallery";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const fetchStudents = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/gallery?populate[blocks][on][gallery.student-images][populate][students_images]=true`
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
            students?.students_images?.map((img, index) => (
              <img
                key={img?.id || index}
                src={
                  img?.formats?.small?.url ? img?.formats?.small?.url : img?.url
                }
                alt={`Student ${index + 1}`}
                loading="lazy"
                decoding="async"
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
