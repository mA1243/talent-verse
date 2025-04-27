import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import TalentCard from "@/components/TalentCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import { useNavigate} from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Index = () => {
  // State to store talents from the database
  const [talents, setTalents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTalents = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, content, image, category, creator, avatar_url, user_id")
          .order("created_at", { ascending: false }) // Order by most recent
          .limit(4); // Fetch only the first 3 talents

        if (error) {
          throw error;
        }

        setTalents(data || []); // Set fetched talents
      } catch (error: any) {
        console.error("Error fetching talents:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTalents();
  }, []);

  // Sample data for features
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Create Your Profile",
      description: "Build a professional profile showcasing your name, location, bio, and portfolio to let others know about your talents."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Share Your Skills",
      description: "Post your talents with detailed descriptions, images, and categories to help users find exactly what they're looking for."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Discover Talents",
      description: "Explore a diverse range of skills from users all around the world. Filter by categories, locations, and more."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Connect & Collaborate",
      description: "Directly message and collaborate with talented individuals. Build your network and create amazing projects together."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="section-container">
        <h2 className="section-title">Unleash Your Potential</h2>
        <p className="section-subtitle">
          TalentVerse provides all the tools you need to showcase your skills, connect with others, and grow your personal brand.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
      
      {/* Talents Section */}
      <section id="talents" className="section-container mt-0 pt-0">
        <h2 className="section-title">Explore Talents</h2>
        <p className="section-subtitle">
          Discover a variety of skills and talents from our community members.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {isLoading ? (
            <div className="text-center col-span-full">Loading talents...</div>
          ) : (
            talents.map((talent) => (
              <TalentCard 
                key={talent.id}
                image={talent.image}
                title={talent.title}
                creator={talent.creator}
                content={talent.content}
                category={talent.category}
                avatarUrl={talent.avatar_url}
                profileLink={`/profile/${talent.user_id}`} // Link to the creator's profile
              />
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button onClick={() => navigate("/explore")}  className="bg-talent-purple hover:bg-talent-purple-dark text-white px-8 py-6">
            Explore All Talents
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
