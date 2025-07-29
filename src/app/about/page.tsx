import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | DevAgency",
  description: "Learn about our agency, our mission, values, and team.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="container py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          About <span className="text-gradient">DevAgency</span>
        </h1>

        <div className="max-w-3xl">
          <p className="text-lg mb-8 text-muted-foreground">
            This is a placeholder for the About Us page. According to the PRD,
            this page will contain information about the agency's origin story,
            team members, and mission/values.
          </p>

          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
            <p>
              Ut in nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              Mauris iaculis porttitor posuere.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="mb-4">
              Team member photos and bios will be displayed here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-secondary rounded-full mb-4"></div>
                  <h3 className="font-bold">Team Member {i}</h3>
                  <p className="text-muted-foreground text-sm">Position</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-bold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We embrace new technologies and approaches to solve complex
                    problems.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-bold">Quality</h3>
                  <p className="text-muted-foreground">
                    We deliver exceptional work that exceeds expectations.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-bold">Collaboration</h3>
                  <p className="text-muted-foreground">
                    We work closely with our clients to ensure their vision
                    becomes reality.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
