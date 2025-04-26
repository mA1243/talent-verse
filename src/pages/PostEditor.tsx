
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save post logic will be added later
    navigate("/profile");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Post" : "Create Post"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                placeholder="Enter post title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                placeholder="Write your post content here..."
                className="min-h-[200px]"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => navigate("/profile")}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostEditor;
