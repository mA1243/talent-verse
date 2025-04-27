interface AlertProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const borderColor = type === "success" ? "border-green-400" : "border-red-400";

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md border ${bgColor} ${borderColor}`}
    >
      <div className="flex items-center justify-between">
        <span className={`font-medium ${textColor}`}>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Alert;