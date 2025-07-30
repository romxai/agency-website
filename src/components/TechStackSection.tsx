"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/magicui/marquee";

const techStack = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
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
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "AWS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
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
  return (
    <section className="py-20 bg-background" id="tech-stack">
      <div className="container">
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
      <div className="w-full">
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
