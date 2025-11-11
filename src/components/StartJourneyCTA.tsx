import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface StartJourneyCTAProps {}

const StartJourneyCTA: React.FC<StartJourneyCTAProps> = () => {
  return (
    <section className="py-10 lg:py-16 bg-gradient-primary text-white">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>

          <p className="text-xl text-white/90 mb-8">
            Get personalized loan options and scholarship opportunities in
            minutes
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 h-14 px-8"
            >
              <Link to="/contact">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 h-14 px-8"
            >
              <Link to="/tools">Explore Tools</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StartJourneyCTA;
