"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const ClientsSection = () => {
  // Using free stock images for clients/companies
  const clientImages = [
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center", // tech startup
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center", // business meeting
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center", // teamwork
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop&crop=center", // office building
    "https://images.unsplash.com/photo-1554774853-b415df9eeb92?w=400&h=300&fit=crop&crop=center", // data analytics
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop&crop=center", // tech conference
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&crop=center", // business handshake
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop&crop=center", // modern office
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop&crop=center", // startup environment
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center", // corporate building
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center", // tech workspace
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center", // business success
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center", // collaboration
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop&crop=center", // innovation
    "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop&crop=center", // business growth
    "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop&crop=center", // tech solutions
    "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop&crop=center", // creative workspace
    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop&crop=center", // team collaboration
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop&crop=center", // business strategy
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center", // tech workspace
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=center", // business success
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center", // collaboration
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop&crop=center", // innovation
    "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop&crop=center", // business growth
    "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400&h=300&fit=crop&crop=center", // tech solutions
    "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop&crop=center", // creative workspace
    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop&crop=center", // team collaboration
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop&crop=center", // business strategy
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center", // creative workspace
    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop&crop=center", // team collaboration
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop&crop=center", // business strategy
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center", // creative workspace
    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop&crop=center", // team collaboration
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop&crop=center", // business strategy
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center", // creative workspace

    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop&crop=center", // team collaboration
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop&crop=center", // business strategy
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center", // modern technology
    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop&crop=center", // team collaboration
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop&crop=center", // business strategy
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=400&h=300&fit=crop&crop=center", // team collaboration
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop&crop=center", // business strategy
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=center",
  ];

    return (
    <section className="py-16 bg-background" id="clients">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-10">
          Trusted By <span className="text-gradient">Industry Leaders</span>
        </h2>
      </div>
      
      <div >
        <ThreeDMarquee images={clientImages} />
      </div>
    </section>
  );
};

export default ClientsSection;
