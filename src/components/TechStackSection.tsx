"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";

const techStack = [
  {
    name: "React",
    logo: "/react-svgrepo-com.svg",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Javascript",
    logo: "/js-svgrepo-com.svg",
  },
  {
    name: "Python",
    logo: "/python-svgrepo-com.svg",
  },
  {
    name: "MongoDB",
    logo: "/icons8-c-sharp-logo.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "AWS",
    logo: "/aws-svgrepo-com.svg",
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Kubernetes",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "GraphQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Redis",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
];

const TechStackSection = () => {
  const PAGE_BACKGROUND_COLOR = "#000000"; // <--- CHANGE THIS TO YOUR ACTUAL PAGE BACKGROUND COLOR

  return (
    <section
      id="portfolio-preview"
      className="relative"
      style={{
        // Stack the linear gradient on top of your background image
        background: `
          linear-gradient(to bottom, 
            ${PAGE_BACKGROUND_COLOR} 0%, 
            rgba(0, 0, 0, 0) 5%, 
            rgba(0, 0, 0, 0) 95%, 
            ${PAGE_BACKGROUND_COLOR} 100%
          ),
          url('/polygon-scatter-haikei.svg')
        `,
        backgroundSize: "cover, cover", // One for gradient, one for image
        backgroundPosition: "center, center", // One for gradient, one for image
        backgroundRepeat: "no-repeat, no-repeat",
        paddingTop: "100px",
        paddingBottom: "100px",
        // One for gradient, one for image
      }}
    >
      <div className="absolute inset-0 bg-background/40"></div>
      <div className="container relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Our <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We use cutting-edge technologies and frameworks to build robust,
            scalable solutions that drive your business forward.
          </p>
        </motion.div>
      </div>

      {/* Full-width marquee */}
      <div className="w-full relative z-10">
        <Marquee className="w-full [--duration:30s]" pauseOnHover={true}>
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 mx-8"
            >
              <div className="w-16 h-16 mb-3 flex items-center justify-center bg-secondary/20 rounded-lg p-3 hover:bg-secondary/30 transition-colors duration-300">
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-full h-full object-contain filter brightness-0 invert dark:filter-none"
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {tech.name}
              </span>
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
                className="flex flex-col items-center justify-center p-4 mx-8"
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center bg-secondary/20 rounded-lg p-3 hover:bg-secondary/30 transition-colors duration-300">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="w-full h-full object-contain filter brightness-0 invert dark:filter-none"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TechStackSection;
