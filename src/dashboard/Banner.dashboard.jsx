import DashboardControlSheet from "@/components/dashboard/DashboardControlSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Client, Databases, Storage } from "appwrite";
import React, { useEffect, useRef, useState } from "react";
import HeroContent from "./HeroContent";
import { Pencil } from "@phosphor-icons/react";
import { client, databases } from "@/lib/appwrite";

const Banner = () => {
  const inputRef = useRef();
  const openSheet = useRef();
  const closeRef = useRef();

  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors

  const storage = new Storage(client);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response1 = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_SLIDES1_COLLECTION_ID,
        []
      );

      const response2 = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_SLIDES2_COLLECTION_ID,
        []
      );

      const response3 = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_SLIDES3_COLLECTION_ID,
        []
      );

      setData([
        ...response1.documents,
        ...response2.documents,
        ...response3.documents,
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadPhoto = async (file) => {
    try {
      const response = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        "unique()", // Replace with actual unique ID logic
        file
      );

      const fileUrl = `${import.meta.env.VITE_API_BASE_URL}/storage/buckets/${
        response.bucketId
      }/files/${response.$id}/view?project=${client.config.project}`;

      return fileUrl;
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fileUrl = await uploadPhoto(inputRef.current.files[0]);

      const documentData = {
        image: fileUrl,
      };

      if (currentEdit) {
        await databases.updateDocument(
          import.meta.env.VITE_DATABASE_ID,
          currentEdit.$collectionId,
          currentEdit.$id,
          documentData
        );
      }

      setIsAdding(false);
      setCurrentEdit(null);
      fetchData();
      setLoading(false);
      setError(null); // Clear error state on success

      closeRef.current.click();
    } catch (error) {
      console.error("Error submitting data:", error);
      setLoading(false);
      setError("Failed to submit data. Please try again."); // Set error state on failure
    }
  };

  const handleEdit = (document) => {
    setIsAdding(true);
    setCurrentEdit(document);
    openSheet.current.click();
  };

  return (
    <div className="pb-4">
      <div className="pb-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <p className="font-normal text-lg">Landing page</p>
        </div>
        <div>
          <DashboardControlSheet
            isHidden={true}
            closeRef={closeRef}
            openSheet={openSheet}
          >
            <form onSubmit={handleSubmit} action="">
              <Input required ref={inputRef} type="file" />
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
      </div>
      <hr className="py-3" />

      <HeroContent />

      <div className="mt-3 space-y-3">
        <p className="text-lg font-medium">Background Photos of landing page</p>
        <div className="flex gap-3 w-full overflow-auto">
          {data.map((el, index) => (
            <div key={index} className="relative p-3">
              <img
                src={el.image}
                className="w-[500px] h-[400px] object-cover"
              />
              <div className="z-50 top-3 p-3 right-3 absolute">
                <Button
                  onClick={() => handleEdit(el)}
                  variant="outline"
                  size="sm"
                >
                  <Pencil />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
