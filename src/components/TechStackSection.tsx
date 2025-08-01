"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";
import { GradientHeading } from "@/components/ui/gradient-heading"; // Assuming you have this component

const techStack = [
  {
    name: "React",
    logo: "/svgs/react-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "Next.js",
    logo: "/svgs/next-js-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "TypeScript",
    logo: "/svgs/typescript-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "Javascript",
    logo: "/svgs/javascript-155-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "SQL",
    logo: "/svgs/sql-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "Python",
    logo: "/svgs/python-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "MongoDB",
    logo: "/svgs/mongodb-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "Git",
    logo: "/svgs/github-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "C#",
    logo: "/svgs/c-sharp-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "C",
    logo: "/svgs/c-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "AWS",
    logo: "/svgs/aws-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "Docker",
    logo: "/svgs/docker-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "Kubernetes",
    logo: "/svgs/kubernetes-svgrepo-com.svg", // Updated to monochrome SVG path
  },
  {
    name: "Flutter",
    logo: "/svgs/flutter-svgrepo-com.svg", // Updated to monochrome SVG path
  },
];

const TechStackSection = () => {
  return (
    <section
      id="tech-stack-section" // Changed ID for clarity
      className="relative py-20 overflow-hidden bg-black" // Consistent background and padding
    >
      {/* Background overlay similar to SolutionsSection */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16" // Consistent margin-bottom
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // Matched transition duration
        >
          {/* Using GradientHeading for title consistent with SolutionsSection */}
          <GradientHeading
            size="xl"
            weight="semi"
            variant="accent3" // Use the same variant for consistency
            className="font-monesta-semibold leading-none mb-6" // Consistent font and spacing
          >
            Our Tech Stack
          </GradientHeading>

          <p className="text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto">
            We leverage cutting-edge technologies and robust frameworks to craft
            scalable, high-performance solutions tailored to your unique
            business needs.
          </p>
        </motion.div>

        {/* Full-width marquee */}
        <div className="w-full relative z-10">
          <Marquee className="w-full [--duration:30s]" pauseOnHover={true}>
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 mx-8" // Removed flex-col to remove labels
              >
                <div className="w-16 h-16 flex items-center justify-center bg-secondary/20 rounded-lg p-3 hover:bg-secondary/30 transition-colors duration-300">
                  {/* Using 'currentColor' for fill to allow CSS control, removed filter/invert */}
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-full h-full object-contain" // Set desired golden color here
                     // Ensures SVG uses the text color
                  />
                </div>
                {/* Removed the text label: <span className="text-sm font-medium text-muted-foreground">{tech.name}</span> */}
              </div>
            ))}
          </Marquee>

          {/* Second row in reverse direction */}
          <Marquee
            className="w-full [--duration:35s] mt-8"
            reverse={true}
            pauseOnHover={true}
          >
            {techStack
              .slice()
              .reverse()
              .map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 mx-8" // Removed flex-col to remove labels
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-secondary/20 rounded-lg p-3 hover:bg-secondary/30 transition-colors duration-300">
                    {/* Using 'currentColor' for fill to allow CSS control, removed filter/invert */}
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-full h-full object-contain text-[#FFED99]" // Set desired golden color here
                      style={{ fill: "#FFED99" }} // Ensures SVG uses the text color
                    />
                  </div>
                  {/* Removed the text label: <span className="text-sm font-medium text-muted-foreground">{tech.name}</span> */}
                </div>
              ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
