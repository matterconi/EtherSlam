const BlockListSkeleton = () => {
    return (
      <div className="animate-pulse">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-gray-300 rounded-md p-4 mb-4">
            <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
            <div className="grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 bg-gray-400 rounded w-full"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default BlockListSkeleton;