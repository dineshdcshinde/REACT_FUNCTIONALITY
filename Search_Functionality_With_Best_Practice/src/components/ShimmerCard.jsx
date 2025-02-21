const ShimmerCard = () => {
    return (
      <div className="imageCard shadow-lg rounded-md p-4 w-full bg-[#707070] bg-opacity-55 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 animate-pulse">
        <div className="imageSection flex justify-center">
          <div className="h-60 w-full bg-gray-300 rounded-md"></div>
        </div>
        <div className="author flex justify-center items-center mt-2">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="downloadBtn flex justify-center mt-2">
          <div className="h-10 w-40 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    );
  };
  
  export default ShimmerCard;
  