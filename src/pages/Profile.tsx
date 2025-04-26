
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenLine, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  // Temporary mock data - will be replaced with real data later
  const profile = {
    name: "John Doe",
    avatar: "/placeholder.svg",
    bio: "Passionate about creating amazing content",
    posts: [
      {
        id: 1,
        title: "My First Post",
        content: "This is my first post content",
        createdAt: "2024-04-26"
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
          </div>
          <Button onClick={() => navigate("/profile/edit")}>
            <PenLine className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Posts</h2>
            <Button onClick={() => navigate("/posts/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </div>
          <div className="grid gap-4">
            {profile.posts.map((post) => (
              <Card key={post.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="flex justify-between items-center py-4" onClick={() => navigate(`/posts/edit/${post.id}`)}>
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">Posted on {post.createdAt}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <PenLine className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
