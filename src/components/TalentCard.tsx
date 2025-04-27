import { Link } from "react-router-dom";

interface TalentCardProps {
  image: string;
  title: string;
  content: string;
  creator: string;
  category: string;
  avatarUrl: string;
  profileLink: string; // New prop for the profile link
}

const TalentCard = ({ image, title, content, creator, category, avatarUrl, profileLink }: TalentCardProps) => {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{category}</p>
        <p className="mt-2 text-sm">{content}</p>
        <div className="flex items-center mt-4">
          <Link to={profileLink} className="flex items-center">
            <img
              src={avatarUrl}
              alt={creator}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-primary hover:underline">{creator}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
