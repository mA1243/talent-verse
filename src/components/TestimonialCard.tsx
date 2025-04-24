
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}

const TestimonialCard = ({ quote, author, role, avatarUrl }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="text-talent-orange text-3xl">"</div>
      </div>
      <p className="text-gray-700 mb-6 italic">{quote}</p>
      <div className="flex items-center">
        <img 
          src={avatarUrl} 
          alt={author} 
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <div className="font-medium">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
