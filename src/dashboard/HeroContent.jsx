import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen } from "@phosphor-icons/react";
import { Client, Databases } from "appwrite";
import React, { useEffect, useState } from "react";

const HeroContent = () => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const client = new Client();
  client
    .setEndpoint(import.meta.env.VITE_API_BASE_URL)
    .setProject(import.meta.env.VITE_PROJECT_ID);

  const databases = new Databases(client);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_CONTENT_COLLECTION_ID,
        []
      );
      setData(response.documents);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async () => {
    if (data.length === 0) return;

    try {
      const documentId = data[0].$id;
      await databases.updateDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_HERO_CONTENT_COLLECTION_ID,
        documentId,
        {
          smallTitle: data[0].smallTitle,
          mainTitle: data[0].mainTitle,
          heroText: data[0].heroText,
        }
      );
      setEdit(false);
      fetchData(); // Refresh data after save
    } catch (error) {
      setError("Error saving data");
      console.error("Error saving data:", error);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    fetchData(); // Reset data to original state
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3 items-center">
        <p className="text-lg font-medium">Title</p>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Pen />
        </Button>
      </div>
      <div className={`bg-white ${edit ? "space-y-3" : "space-y-0.5"} p-5`}>
        {data.length > 0 && (
          <>
            {edit ? (
              <Input
                type="text"
                value={data[0]?.smallTitle}
                onChange={(e) =>
                  setData([{ ...data[0], smallTitle: e.target.value }])
                }
              />
            ) : (
              <p className="font-light text-sm">{data[0]?.smallTitle}</p>
            )}
          </>
        )}
        {data.length > 0 && (
          <>
            {edit ? (
              <Input
                type="text"
                value={data[0]?.mainTitle}
                onChange={(e) =>
                  setData([{ ...data[0], mainTitle: e.target.value }])
                }
              />
            ) : (
              <p className="font-medium text-lg">{data[0]?.mainTitle}</p>
            )}
          </>
        )}
        {data.length > 0 && (
          <>
            {edit ? (
              <Input
                type="text"
                value={data[0]?.heroText}
                onChange={(e) =>
                  setData([{ ...data[0], heroText: e.target.value }])
                }
              />
            ) : (
              <p className="font-base text-xs">{data[0]?.heroText}</p>
            )}
          </>
        )}
      </div>
      {edit && (
        <div className="flex gap-2">
          <Button onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeroContent;
