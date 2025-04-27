import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid"; // For generating unique file names
import Loader from "@/components/ui/loader";
import Alert from "@/components/ui/alert";

const PostCreate = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [creator, setCreator] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const checkSessionAndFetchProfile = async () => {
      setIsLoading(true);
      try {
        // Fetch the user from the session
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/register"); // Redirect to register page if not logged in
          return;
        }

        setUserId(user.id); // Set the user ID from the session

        // Fetch the creator's name and avatar filename from the profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("name, avatar")
          .eq("id", user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        setCreator(profile.name || "Unknown Creator"); // Set creator name

        // Generate the public URL for the avatar
        if (profile.avatar) {
          setAvatarUrl(profile.avatar); // Directly use the avatar URL
        } else {
          setAvatarUrl("https://revvlhwlkhaganofsbwj.supabase.co/storage/v1/object/public/avatars/placeholder.svg"); // Default avatar
        }
      } catch (error: any) {
        console.error("Error fetching session or profile:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkSessionAndFetchProfile();
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPost((prev) => ({ ...prev, image: previewUrl })); // Set preview URL for the image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loader during submission
    try {
      if (!userId) {
        console.error("User not logged in");
        navigate("/register");
        return;
      }

      let imageUrl = "https://revvlhwlkhaganofsbwj.supabase.co/storage/v1/object/public/talents/talents/default.jpg";

      // Upload image file if a new file is selected
      if (imageFile) {
        const fileName = `${uuidv4()}-${imageFile.name}`;
        const filePath = `talents/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from("talents")
          .upload(filePath, imageFile, { upsert: true });

        if (uploadError) {
          console.error("Error uploading image:", uploadError.message);
          setAlert({ type: "error", message: "Failed to upload image. Please try again." });
          setIsSubmitting(false);
          return; // Stop form submission if upload fails
        }

        // Generate public URL for the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from("talents")
          .getPublicUrl(filePath);

        if (!publicUrlData || !publicUrlData.publicUrl) {
          console.error("Error generating public URL");
          setAlert({ type: "error", message: "Failed to generate image URL. Please try again." });
          setIsSubmitting(false);
          return;
        }

        imageUrl = publicUrlData.publicUrl; // Use the generated public URL
      }

      const { error } = await supabase
        .from("posts")
        .insert({
          title: post.title,
          content: post.content,
          image: imageUrl, // Save the generated image URL
          category: post.category,
          creator: creator,
          avatar_url: avatarUrl,
          user_id: userId, // Associate the post with the logged-in user
        });

      if (error) {
        throw error;
      }

      setAlert({ type: "success", message: "Post updated successfully!" });
      navigate(`/profile/${userId}`); // Redirect to the user's profile page
    } catch (error: any) {
      console.error("Error creating post:", error.message);
      setAlert({ type: "error", message: "Failed to create post. Please try again." });
    } finally {
      setIsSubmitting(false); // Hide loader after submission
    }
  };

  if (isLoading) {
    return <div className="text-center mt-12"><Loader /></div>; // Show loader while checking session
  }

  return (
    <>
      <Navbar />
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <div className="container mx-auto px-4 py-8 mt-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-medium">Image</label>
                <div className="flex flex-col items-center space-y-4">
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Preview"
                      className="h-48 w-full object-cover rounded-md border"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={post.category}
                  onChange={(e) => setPost({ ...post, category: e.target.value })}
                  placeholder="Enter category"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  placeholder="Enter post content"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => navigate(`/profile/${userId}`)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader /> : "Create Post"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default PostCreate;
