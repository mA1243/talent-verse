import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenLine, Plus, Trash2 } from "lucide-react"; // Import the Trash icon
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get the user ID from the route params
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        // Fetch the profile data from Supabase
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("id, name, avatar, bio, posts(id, title, created_at)")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Supabase error:", error.message);
          throw error;
        }

        setProfile(profileData);

        // Check if the logged-in user is the owner of the profile
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsOwner(user?.id === userId);
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);

      if (error) {
        throw error;
      }

      // Update the UI by removing the deleted post
      setProfile((prevProfile: any) => ({
        ...prevProfile,
        posts: prevProfile.posts.filter((post: any) => post.id !== postId),
      }));
    } catch (error: any) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      navigate("/login");
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-12">Loading...</div>;
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-12 py-12 text-3xl font-bold text-black">
          Profile not found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-12">
        <Card className="max-w-4xl mx-auto shadow-lg border border-border bg-background">
          <CardHeader className="flex flex-col sm:flex-row items-center sm:justify-between bg-primary/10 p-6 rounded-t-lg gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-white">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="bg-muted text-foreground">
                  {profile.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-primary">{profile.name}</h1>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
            </div>
            {isOwner && (
              <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                <Button
                  onClick={() => navigate("/profile/edit")}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  <PenLine className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">My Posts</h2>
              {isOwner && (
                <Button
                  onClick={() => navigate("/posts/create")}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              )}
            </div>
            <div className="grid gap-4">
              {profile.posts.map((post: any) => (
                <Card
                  key={post.id}
                  className="transition-colors border border-border"
                >
                  <CardContent
                    className="flex justify-between items-center py-4 px-6"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Posted on {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {isOwner && (
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => navigate(`/posts/edit/${post.id}`)}
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:bg-primary/10"
                        >
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeletePost(post.id)}
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {isOwner && (
                <Button
                  onClick={handleSignOut}
                  className="w-1/4 mx-auto bg-red-500 text-white hover:bg-red-600 mt-12"
                >
                  Sign Out
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Profile;