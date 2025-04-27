import { useState, useEffect } from "react";
import { Search, LayoutGrid, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TalentCard from "@/components/TalentCard";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const ExploreTalents = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [talents, setTalents] = useState<any[]>([]); // State to store talents from the database
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTalents = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, content, image, category, creator, avatar_url, user_id");

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

  const filteredTalents = talents.filter(
    (talent) =>
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
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
            {isLoading ? (
              <div className="text-center py-12">Loading talents...</div>
            ) : (
              <div
                className={`grid gap-6 ${
                  isGridView
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {filteredTalents.map((talent) => (
                  <TalentCard
                    key={talent.id}
                    image={talent.image}
                    title={talent.title}
                    content={talent.content}
                    creator={talent.creator}
                    category={talent.category}
                    avatarUrl={talent.avatar_url}
                    profileLink={`/profile/${talent.user_id}`} // Link to the creator's profile
                  />
                ))}
              </div>
            )}

            {!isLoading && filteredTalents.length === 0 && (
              <div className="text-center text-muted-foreground py-12">
                No talents found matching your search.
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ExploreTalents;
