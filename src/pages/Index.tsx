
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import TalentCard from "@/components/TalentCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";

const Index = () => {
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

  // Sample data for talent cards
  const talentCards = [
    {
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Website Development & Design",
      creator: "Alex Johnson",
      category: "Development",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Digital Marketing Strategy",
      creator: "Sarah Williams",
      category: "Marketing",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Mobile App Development",
      creator: "Michael Chen",
      category: "Development",
      avatarUrl: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Video Production & Editing",
      creator: "Emma Rodriguez",
      category: "Media",
      avatarUrl: "https://randomuser.me/api/portraits/women/67.jpg"
    }
  ];

  // Sample data for testimonials
  const testimonials = [
    {
      quote: "TalentVerse helped me showcase my design skills to a broader audience. I've received multiple job offers since joining!",
      author: "Jessica K.",
      role: "Graphic Designer",
      avatarUrl: "https://randomuser.me/api/portraits/women/63.jpg"
    },
    {
      quote: "As a freelance developer, this platform has been invaluable for finding new clients and showcasing my portfolio.",
      author: "David M.",
      role: "Full Stack Developer",
      avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    {
      quote: "The connections I've made through TalentVerse have transformed my career. It's more than just a platform, it's a community.",
      author: "Sophia L.",
      role: "Content Creator",
      avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg"
    }
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      number: "01",
      title: "Create an Account",
      description: "Sign up for free and start your talent-sharing journey."
    },
    {
      number: "02",
      title: "Build Your Profile",
      description: "Add your details, skills, and portfolio to showcase who you are."
    },
    {
      number: "03",
      title: "Share Your Talents",
      description: "Post your skills with detailed descriptions and images."
    },
    {
      number: "04",
      title: "Connect & Grow",
      description: "Discover other talents, collaborate, and expand your network."
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
      
      {/* How It Works Section */}
      <section id="how-it-works" className="bg-gray-50 py-16 md:py-24">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Getting started on TalentVerse is simple. Follow these easy steps to begin your journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-talent-purple opacity-20">{step.number}</div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 w-full h-1 border-t-2 border-dashed border-gray-200 -translate-y-1/2 z-0" />
                )}
                <div className="absolute top-0 right-4 w-8 h-8 bg-talent-purple rounded-full hidden lg:flex items-center justify-center text-white z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Talents Section */}
      <section id="talents" className="section-container">
        <h2 className="section-title">Explore Talents</h2>
        <p className="section-subtitle">
          Discover a variety of skills and talents from our community members.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {talentCards.map((talent, index) => (
            <TalentCard 
              key={index}
              image={talent.image}
              title={talent.title}
              creator={talent.creator}
              category={talent.category}
              avatarUrl={talent.avatarUrl}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="bg-talent-purple hover:bg-talent-purple-dark text-white">
            Explore All Talents
          </Button>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="section-container">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Hear from our community members who have found success on TalentVerse.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatarUrl={testimonial.avatarUrl}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Your Talent?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto">
            Join thousands of talented individuals who are showcasing their skills and connecting with opportunities worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="cta-button">Get Started For Free</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-talent-purple transition-colors">
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
