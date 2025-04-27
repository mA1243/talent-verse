import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { v4 as uuidv4 } from "uuid"; // Import UUID library for generating random strings

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          console.error("User not logged in");
          navigate("/login");
          return;
        }

        setUserId(user.id);

        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("name, bio, avatar")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfile({
          name: profileData.name || "",
          bio: profileData.bio || "",
          avatar: profileData.avatar,
        });
      } catch (error: any) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);

    if (file && userId) {
      // Update the profile.avatar field with the file path
      const filePath = `${userId}/${file.name}`;
      setProfile((prev) => ({ ...prev, avatar: filePath }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userId) {
        console.error("User not logged in");
        navigate("/login");
        return;
      }

      let avatarPublicUrl = profile.avatar;

      // Upload avatar file if a new file is selected
      if (avatarFile) {
        // Generate a random file name using UUID
        const randomFileName = `${uuidv4()}-${avatarFile.name}`;
        const filePath = `${userId}/${randomFileName}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadError) {
          console.error("Error uploading avatar:", uploadError.message);
          alert("Failed to upload profile picture. Please try again.");
          return; // Stop form submission if upload fails
        }

        // Generate the public URL for the uploaded file
        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        if (!publicUrlData) {
          console.error("Error generating public URL: Unable to generate public URL");
          alert("Failed to generate public URL for the avatar. Please try again.");
          return; // Stop form submission if public URL generation fails
        }

        avatarPublicUrl = publicUrlData.publicUrl; // Save the public URL
      }

      // Update the profile in the database
      const { error } = await supabase
        .from("profiles")
        .update({
          name: profile.name,
          bio: profile.bio,
          avatar: avatarPublicUrl, // Save the public URL in the database
        })
        .eq("id", userId);

      if (error) {
        throw error;
      }

      navigate(`/profile/${userId}`);
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      alert("Failed to save changes. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-12">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-medium">Profile Picture</label>
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={
                      avatarFile
                        ? URL.createObjectURL(avatarFile) // Show preview of selected file
                        : profile.avatar
                    }
                    alt="Profile"
                    className="h-32 w-32 rounded-full border"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => navigate(`/profile/${userId}`)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;