import { useEffect, useRef, useState } from "react";

const pledgeData = [
  { title: "Reduce, Reuse, Recycle", content: ["Carry reusable bags, bottles, and containers instead of relying on single-use plastics.", "Donate or repurpose items before throwing them away.", "Repair broken items whenever possible to extend their life.", "Practice proper waste segregation (organic, recyclable, hazardous).", "Support local recycling programs and encourage others to participate."] },
  { title: "Save Energy & Water", content: ["Switch off lights and appliances when not in use.", "Use energy-efficient appliances and LED bulbs.", "Avoid wasting water and fix leaking taps."] },
  { title: "Support Sustainable Choices", content: ["Choose eco-friendly, reusable, and locally sourced products.", "Prefer products with minimal packaging.", "Support sustainable businesses and brands."] },
  { title: "Responsible Disposal & E-Waste", content: ["Dispose of electronic waste through authorized recycling centers.", "Never throw batteries or electronics into regular waste.", "Donate working electronics instead of discarding them."] },
  { title: "Promote Awareness & Leadership", content: ["Educate others about sustainable living.", "Encourage your family, friends, and community to adopt green practices.", "Lead by example through responsible daily choices."] },
  { title: "Continuous Improvement & Accountability", content: ["Regularly review your environmental impact.", "Set realistic sustainability goals and track your progress.", "Take responsibility for improving your environmental habits."] }
];

export default function PledgeType() {
  const [activeTab, setActiveTab] = useState("individual");
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setVisible(true);
            });
          });
        } else {
          setVisible(false);
        }
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen  mx-auto bg-[#f7fbf9] px-10 pt-16 md:px-10 lg:px-25 ${visible ? "animate-[fadeUp_0.9s_ease-out_forwards]" : "opacity-0"}`}
    >
      <div>
        <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.25em] text-[#079e99]">
          Pledge Type
        </p>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h1 className="max-w-md text-4xl font-bold leading-[1.05] text-[#111827] md:text-5xl">
            Who are you pledging as?
          </h1>

          <div className="flex w-full max-w-xl rounded-full border border-[#b8d9cf] bg-[#e5f3ef] p-1">
            <button
              onClick={() => setActiveTab("individual")}
              className={`w-1/2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${activeTab === "individual" ? "bg-[#3aaa95] text-white shadow-sm" : "text-[#111827]"}`}
            >
              As Individuals
            </button>

            <button
              onClick={() => setActiveTab("business")}
              className={`w-1/2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${activeTab === "business" ? "bg-[#3aaa95] text-white shadow-sm" : "text-[#111827]"}`}
            >
              As Businesses / Organizations
            </button>
          </div>
        </div>

        <p className="mt-8 max-w-6xl text-[18px] leading-6 text-gray-600">
          I / We pledge to act for a sustainable future by adopting practices
          that protect our planet, uplift our communities, and promote
          long-term responsibility.
        </p>

        <div className="mt-8 border-t border-[#c8ddd7]">
          {pledgeData.map((item, index) => (
            <div key={item.title} className="border-b border-[#c8ddd7]">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="text-base font-bold text-[#111827] md:text-lg">
                  {index + 1}. {item.title}
                </span>

                <span className="text-xl font-light text-[#3aaa95]">
                  {openIndex === index ? "⌃" : "⌄"}
                </span>
              </button>

              {openIndex === index && (
                <div className="pb-8 pr-8">
                  <div className="space-y-3 text-[15px] leading-5 text-gray-600">
                    {item.content.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}