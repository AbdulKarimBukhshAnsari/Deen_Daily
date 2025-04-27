import React from "react";
import { ClipboardCheck, Lightbulb } from "lucide-react";
import FeatureBox from "../ui/FeatureBox";

function FeatureSection() {
  // list of feature and its details
  const featureDetails = [
    {
      title: "Ibadah Tracker",
      details:
        "Keep track of your daily prayers, Quran recitation, dhikr, and other good deeds. Build consistent habits and visualize your spiritual progress over time.",
      featureList: [
        "Track daily prayers with reminders",
        "Record Quran reading progress",
        "Monitor voluntary good deeds",
      ],
      Icon: ClipboardCheck,
      buttonText: "Explore Ibadah Tracker",
    },
    {
      title: "Personalized Guidance",
      details:
        "Share your current spiritual state, challenges, or goals, and receive personalized recommendations for 3-4 beneficial deeds tailored to your situation.",
      featureList: [
        "Receive custom recommendations",
        "Learn new beneficial actions",
        "Connect spiritual advice to your needs",
      ],
      Icon: Lightbulb,
      buttonText: "Get Recommendations",
    },
  ];
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4E1F00] mb-4">
            Strengthen Your Faith Journey
          </h2>
          <p className="text-lg text-[#74512D] max-w-2xl mx-auto">
            DeenDaily provides two powerful features to help you maintain and
            grow your Islamic practice
          </p>
        </div>

        <div className="flex md:flex-nowrap flex-wrap gap-8 md:gap-12">
          {/* This is for the 1st section which is basically for the Salah Tracker  */}
          <FeatureBox
            key={1}
            title={featureDetails[0].title}
            details={featureDetails[0].details}
            buttonText={featureDetails[0].buttonText}
            featureList={featureDetails[0].featureList}
            Icon={featureDetails[0].Icon}
            link= '/tracker'
          />

          {/* This is for the second one which is for the Customize reflection */}
          <FeatureBox
            key={2}
            title={featureDetails[1].title}
            details={featureDetails[1].details}
            buttonText={featureDetails[1].buttonText}
            featureList={featureDetails[1].featureList}
            Icon={featureDetails[1].Icon}
            link= '/reflections'
          />
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
