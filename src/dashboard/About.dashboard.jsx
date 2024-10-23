import DashboardControlSheet from "@/components/dashboard/DashboardControlSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { client, databases } from "@/lib/appwrite";
import { Client, Databases, Storage } from "appwrite";
import React, { useEffect, useRef, useState } from "react";

const AboutDashboard = () => {
  const closeRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [error, setError] = useState(null); // State for handling errors

  const storage = new Storage(client);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_ABOUT_US_COLLECTION_ID,
        []
      );
      setData(response.documents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadFile = async (file) => {
    try {
      const response = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        "unique()",
        file
      );

      const endpoint = import.meta.env.VITE_API_BASE_URL;
      const fileUrl = `${endpoint}/storage/buckets/${response.bucketId}/files/${response.$id}/view?project=${client.config.project}`;

      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fileInput = e.target.elements.file;
      if (fileInput.files.length === 0) {
        setError("Please select a file.");
        setLoading(false);
        return;
      }

      const file = fileInput.files[0];
      const fileUrl = await uploadFile(file);

      const documentData = {
        url: fileUrl,
        type: mediaType,
      };

      if (data.length > 0) {
        await databases.updateDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_ABOUT_US_COLLECTION_ID,
          data[0].$id,
          documentData
        );
      } else {
        await databases.createDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_ABOUT_US_COLLECTION_ID,
          "unique()",
          documentData
        );
      }
      closeRef.current.click();
      fetchData();
      setLoading(false);
      setError(null); // Clear error state on success
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoading(false);
      setError("Failed to submit data. Please try again."); // Set error state on failure
    }
  };

  return (
    <div className="pb-4">
      <div className="pb-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <p className="font-normal text-lg">Media of About Us section</p>
          <Popover>
            <PopoverTrigger className="text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#030202"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"></path>
              </svg>
            </PopoverTrigger>
            <PopoverContent className="text-sm">
              About us section can display only one photo or video. When you add
              new, the current one will be deleted!
            </PopoverContent>
          </Popover>
        </div>
        <DashboardControlSheet closeRef={closeRef}>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center">
              <label className="mr-2">Type:</label>
              <input
                type="radio"
                value="image"
                checked={mediaType === "image"}
                onChange={() => setMediaType("image")}
              />
              <label className="mr-2 ml-2">Image</label>
              <input
                type="radio"
                value="video"
                checked={mediaType === "video"}
                onChange={() => setMediaType("video")}
              />
              <label className="mr-2 ml-2">Video</label>
            </div>
            <Input type="file" className=" mt-3" name="file" />
            {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
            {/* Display error message if there's an error */}
            <div className="flex mb-1.5 justify-between items-center mt-8">
              <Button
                onClick={() => closeRef.current.click()}
                className="text-black"
                type="button"
                variant="link"
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                className="bg-black hover:bg-black/90"
                size="sm"
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DashboardControlSheet>
      </div>
      <hr className="py-3" />
      {data.map(({ url, type }, index) => (
        <div key={index}>
          {type === "image" ? (
            <img src={url} alt="About Us Media" />
          ) : (
            <video controls>
              <source src={url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default AboutDashboard;
