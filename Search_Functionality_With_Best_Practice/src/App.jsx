import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ShimmerCard from "./components/ShimmerCard";

function App() {
  const [photos, setPhotos] = useState([]);
  const [photoLimit, setPhotoLimit] = useState(10);
  const [loading, setloading] = useState(false);

  const getPhotos = async () => {
    try {
      setloading(true);
      let response = await axios.get(
        `https://picsum.photos/v2/list?page=1&limit=${photoLimit}`
      );
      setPhotos(response.data);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getPhotos();
    }, 500);

    return () => {
      clearInterval(debounceTimer);
    };
  }, [photoLimit]);

  const downloadImage = async (imageUrl, author, id) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `image-${author}-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <>
      <div className="wrapper min-h-screen w-full bg-gray-800 text-white">
        <header className="flex justify-between items-center p-4 bg-indigo-600">
          <h2 className="text-3xl font-semibold">Image Gallery</h2>
          <div className="flex items-center">
            <label htmlFor="photoLimit" className="mr-2">
              Number of Images:
            </label>
            <input
              type="number"
              id="photoLimit"
              className="text-black rounded px-2 py-1"
              value={photoLimit}
              onChange={(e) => setPhotoLimit(e.target.value)}
              min="1"
            />
          </div>
        </header>

        <main className="p-4">
          <div className="imageContainer flex flex-wrap justify-around gap-4">
            {loading === true
              ? photos.map((photo) => <ShimmerCard />)
              : photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="imageCard shadow-lg rounded-md p-4 w-full bg-[#707070]
                bg-opacity-55 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                  >
                    <div className="imageSection flex justify-center">
                      <img
                        className="h-60 w-full object-cover object-center rounded-md"
                        src={photo.download_url}
                        alt={photo.author}
                      />
                    </div>
                    <div className="author flex justify-center items-center mt-2">
                      <p className="">
                        Author: <strong>{photo.author}</strong>
                      </p>
                    </div>
                    <div className="downloadBtn flex justify-center mt-2">
                      <button
                        onClick={() =>
                          downloadImage(
                            photo.download_url,
                            photo.author,
                            photo.id
                          )
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        Download Now
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
