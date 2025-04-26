
import { useState } from "react";
import { Search, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TalentCard from "@/components/TalentCard";

// Sample data - in a real app this would come from an API
const talents = [
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    title: "Web Development",
    creator: "Alex Johnson",
    category: "Development",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    title: "Digital Marketing",
    creator: "Sarah Williams",
    category: "Marketing",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Mobile App Development",
    creator: "Michael Chen",
    category: "Development",
    avatarUrl: "https://randomuser.me/api/portraits/men/52.jpg"
  },
  {
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    title: "Video Production",
    creator: "Emma Rodriguez",
    category: "Media",
    avatarUrl: "https://randomuser.me/api/portraits/women/67.jpg"
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    title: "UI/UX Design",
    creator: "David Kim",
    category: "Design",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    title: "Content Writing",
    creator: "Lisa Chen",
    category: "Writing",
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg"
  }
];

const ExploreTalents = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTalents = talents.filter(talent => 
    talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    talent.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    talent.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-center">Explore Talents</h1>
          
          {/* Search and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search talents..."
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={isGridView ? "default" : "outline"}
                onClick={() => setIsGridView(true)}
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={!isGridView ? "default" : "outline"}
                onClick={() => setIsGridView(false)}
              >
                <LayoutList className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          {/* Talents Grid */}
          <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredTalents.map((talent, index) => (
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

          {filteredTalents.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              No talents found matching your search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExploreTalents;
