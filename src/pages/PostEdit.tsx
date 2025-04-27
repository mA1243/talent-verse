import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/ui/loader";
import Alert from "@/components/ui/alert";

const PostEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      setIsLoading(true);
      try {
        // Fetch the user from the session
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error("User not logged in");
        }

        setUserId(user.id); // Set the user ID from the session

        // Fetch the post data
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        setPost({
          title: data.title,
          content: data.content,
          image: data.image,
          category: data.category,
        });
      } catch (error: any) {
        console.error("Error fetching post or user:", error.message);
        setAlert({ type: "error", message: "Failed to load post. Please try again." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndUser();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPost((prev) => ({ ...prev, image: previewUrl })); // Set preview URL for the image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("posts")
        .update({
          title: post.title,
          content: post.content,
          image: post.image,
          category: post.category,
        })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setAlert({ type: "success", message: "Post updated successfully!" });
      navigate(`/profile/${userId}`); // Redirect to the user's profile page
    } catch (error: any) {
      console.error("Error updating post:", error.message);
      setAlert({ type: "error", message: "Failed to update post. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-12"><Loader /></div>;
  }

  return (
    <>
      <Navbar />
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <div className="container mx-auto px-4 py-8 mt-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Post</CardTitle>
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
                  {isSubmitting ? <Loader /> : "Update Post"}
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

export default PostEdit;