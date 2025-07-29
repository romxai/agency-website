"use client";

import { motion } from "framer-motion";

// Sample client data (placeholder)
const clients = [
  { name: "TechCorp", logo: "/placeholder-logo-1.svg" },
  { name: "InnovateSoft", logo: "/placeholder-logo-2.svg" },
  { name: "DataSystems", logo: "/placeholder-logo-3.svg" },
  { name: "GlobalTech", logo: "/placeholder-logo-4.svg" },
  { name: "FutureWave", logo: "/placeholder-logo-5.svg" },
  { name: "CodeMasters", logo: "/placeholder-logo-6.svg" },
];

const ClientsSection = () => {
  return (
    <section className="py-16 bg-background" id="clients">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted By <span className="text-gradient">Industry Leaders</span>
        </h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center h-24 bg-card rounded-lg border border-border p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Placeholder for client logo */}
              <div className="w-full h-full flex items-center justify-center bg-secondary/30 rounded">
                <span className="font-medium text-center">{client.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
