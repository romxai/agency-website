"use client";

import { useState, useEffect } from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { motion } from "framer-motion"; // Import motion

const ClientsSection = () => {
  // Set this boolean to true to disable fading and keep on Set 1 elements
  const disableFading = true; // Change to true to disable fading

  // Client logos with SVG representations
  const clientLogos = [
    // Set 1 - Initial display
    [
      {
        name: "Apple",
        logo: "/svgs/apple-173-svgrepo-com.svg",
      },
      {
        name: "Google",
        logo: "/svgs/google-178-svgrepo-com.svg",
      },
      {
        name: "Microsoft",
        logo: "/svgs/microsoft-150-svgrepo-com.svg",
      },
      {
        name: "Amazon",
        logo: "/svgs/amazon-svgrepo-com.svg",
      },
      {
        name: "Netflix",
        logo: "/svgs/netflix-svgrepo-com.svg",
      },
      {
        name: "Tesla",
        logo: "/svgs/tesla-svgrepo-com.svg",
      },
    ],
    // Set 2
    [
      {
        name: "Meta",
        logo: "/svgs/meta-177-svgrepo-com.svg",
      },
      {
        name: "Twitter",
        logo: "/svgs/twitter-178-svgrepo-com.svg",
      },
      {
        name: "Adobe",
        logo: "/svgs/adobe-179-svgrepo-com.svg",
      },
      {
        name: "Spotify",
        logo: "/svgs/spotify-180-svgrepo-com.svg",
      },
      {
        name: "Uber",
        logo: "/svgs/uber-181-svgrepo-com.svg",
      },
      {
        name: "Airbnb",
        logo: "/svgs/airbnb-182-svgrepo-com.svg",
      },
    ],
    // Set 3
    [
      {
        name: "GitHub",
        logo: "/svgs/github-183-svgrepo-com.svg",
      },
      {
        name: "Slack",
        logo: "/svgs/slack-184-svgrepo-com.svg",
      },
      {
        name: "Dropbox",
        logo: "/svgs/dropbox-185-svgrepo-com.svg",
      },
      {
        name: "Zoom",
        logo: "/svgs/zoom-186-svgrepo-com.svg",
      },
      {
        name: "Discord",
        logo: "/svgs/discord-187-svgrepo-com.svg",
      },
      {
        name: "Figma",
        logo: "/svgs/figma-188-svgrepo-com.svg",
      },
    ],
    // Set 4
    [
      {
        name: "Shopify",
        logo: "/svgs/shopify-189-svgrepo-com.svg",
      },
      {
        name: "PayPal",
        logo: "/svgs/paypal-190-svgrepo-com.svg",
      },
      {
        name: "LinkedIn",
        logo: "/svgs/linkedin-191-svgrepo-com.svg",
      },
      {
        name: "Pinterest",
        logo: "/svgs/pinterest-192-svgrepo-com.svg",
      },
      {
        name: "Reddit",
        logo: "/svgs/reddit-193-svgrepo-com.svg",
      },
      {
        name: "TikTok",
        logo: "/svgs/tiktok-194-svgrepo-com.svg",
      },
    ],
  ];

  const [currentSet, setCurrentSet] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (disableFading) {
      // If fading is disabled, ensure it's always on the first set and visible
      setCurrentSet(0);
      setIsVisible(true);
      return; // Stop the effect here
    }

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentSet((prev) => (prev + 1) % clientLogos.length);
        setIsVisible(true);
      }, 1000); // Slower fade out
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [clientLogos.length, disableFading]); // Add disableFading to dependency array

  return (
    <section
      id="clients"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black" // Consistent background and padding
    >
      {/* Background overlay similar to SolutionsSection */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-primary/5 to-accent/10"></div>
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16" // Consistent margin-bottom
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // Matched transition duration
        >
          <GradientHeading
            size="lg"
            weight="semi"
            variant="accent3" // Use the same variant for consistency
            className="font-monesta-semibold leading-none mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl" // Consistent font and spacing
          >
            Trusted By Industry Leaders
          </GradientHeading>
          <p className="text-base sm:text-lg text-zinc-500 font-red-hat-display max-w-2xl mx-auto px-4">
            Partnering with innovative companies worldwide
          </p>
        </motion.div>

        {/* Client Logos Grid */}
        <div className="relative">
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12 md:gap-y-16 transition-all duration-1000 ease-out ${
              // Apply fading classes only if fading is enabled
              !disableFading && isVisible
                ? "opacity-100 transform translate-y-0"
                : !disableFading && "opacity-0 transform translate-y-4"
            }`}
          >
            {clientLogos[currentSet].map((client, index) => (
              <div
                key={`${currentSet}-${index}`}
                className="flex items-center justify-center p-2 sm:p-4 transition-all duration-300" // Removed hover:scale-125
              >
                {/* SVG Logo from file */}
                <img
                  src={client.logo}
                  alt={client.name}
                  // Updated classes for golden color and opacity change on hover
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain text-[#FFED99] opacity-75 hover:opacity-100 transition-opacity duration-300"
                  style={{ fill: "currentColor" }} // Ensures SVG uses the text color
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
