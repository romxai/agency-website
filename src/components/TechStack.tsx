"use client";

import { motion } from "framer-motion";

// Sample tech stack data
const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "TailwindCSS", category: "Styling" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "GraphQL", category: "API" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Firebase", category: "Backend" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Figma", category: "Design" },
  { name: "Flutter", category: "Mobile" },
  { name: "React Native", category: "Mobile" },
];

// Duplicate the array for continuous scrolling effect
const duplicatedTechStack = [...techStack, ...techStack];

const TechStack = () => {
  return (
    <section className="py-20 bg-secondary overflow-hidden" id="tech-stack">
      <div className="container mb-10">
        <h2 className="text-3xl font-bold text-center mb-2">
          Our <span className="text-gradient">Tech Stack</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          We leverage cutting-edge technologies to deliver high-performance,
          scalable solutions.
        </p>
      </div>

      <div className="relative">
        {/* First row - left to right */}
        <div className="flex overflow-hidden mb-8">
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [0, -1920] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTechStack.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm px-8 py-4 rounded-lg border border-border min-w-[180px]"
              >
                <span className="font-bold text-lg">{tech.name}</span>
                <span className="text-xs text-muted-foreground">
                  {tech.category}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second row - right to left */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [-1920, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {duplicatedTechStack.reverse().map((tech, index) => (
              <div
                key={`${tech.name}-reverse-${index}`}
                className="flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm px-8 py-4 rounded-lg border border-border min-w-[180px]"
              >
                <span className="font-bold text-lg">{tech.name}</span>
                <span className="text-xs text-muted-foreground">
                  {tech.category}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
