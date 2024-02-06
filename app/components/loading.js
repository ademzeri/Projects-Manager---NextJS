const LoadingAnimation = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce"></div>
      <div
        className="w-4 h-4 bg-blue-700 rounded-full animate-bounce"
        style={{ animationDelay: "-0.3s" }}
      ></div>
      <div
        className="w-4 h-4 bg-blue-700 rounded-full animate-bounce"
        style={{ animationDelay: "-0.5s" }}
      ></div>
    </div>
  );
};
export default LoadingAnimation;
