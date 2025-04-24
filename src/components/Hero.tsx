
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="hero-gradient pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Share Your Talent With The World
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Showcase your skills, connect with like-minded people, and build your portfolio on the platform made for talent sharing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="cta-button">Get Started</Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-talent-purple transition-colors">
                Explore Talents
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-talent-blue rounded-full opacity-20 animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-talent-green rounded-full opacity-20 animate-float" style={{ animationDelay: "1.5s" }}></div>
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Talents collaborating" 
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="bg-white rounded-lg shadow-lg py-6 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
          <div>
            <div className="text-talent-purple font-bold text-2xl md:text-4xl">500+</div>
            <div className="text-gray-600 text-sm md:text-base">Talents Shared</div>
          </div>
          <div>
            <div className="text-talent-purple font-bold text-2xl md:text-4xl">1,200+</div>
            <div className="text-gray-600 text-sm md:text-base">Active Users</div>
          </div>
          <div>
            <div className="text-talent-purple font-bold text-2xl md:text-4xl">50+</div>
            <div className="text-gray-600 text-sm md:text-base">Categories</div>
          </div>
          <div>
            <div className="text-talent-purple font-bold text-2xl md:text-4xl">4.8</div>
            <div className="text-gray-600 text-sm md:text-base">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
