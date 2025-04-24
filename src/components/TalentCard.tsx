
import { Badge } from "@/components/ui/badge";

interface TalentCardProps {
  image: string;
  title: string;
  creator: string;
  category: string;
  avatarUrl: string;
}

const TalentCard = ({ image, title, creator, category, avatarUrl }: TalentCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          <Badge className="bg-talent-purple hover:bg-talent-purple">{category}</Badge>
        </div>
        <div className="flex items-center">
          <img 
            src={avatarUrl} 
            alt={creator} 
            className="w-8 h-8 rounded-full mr-3"
          />
          <span className="text-sm text-muted-foreground">{creator}</span>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
