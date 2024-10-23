import ModalBox from "@/components/ModalBox.components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { databases } from "@/lib/appwrite";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";

const ContactDashboard = () => {
  const inputRef = useRef();
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [error, setError] = useState(null); // State for handling errors

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_CONTACT_COLLECTION_ID,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const documentData = {
        title: type,
        type: type,
        data: inputRef.current.value,
      };

      await databases.createDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_CONTACT_COLLECTION_ID,
        "unique()", // use unique() for auto-generated document ID
        documentData
      );
      setIsAdding(false);
      fetchData(); // Refetch data after successful creation
      setError(null); // Clear error state on success
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Failed to submit data. Please try again."); // Set error state on failure
    }
  };

  const drop = async (id) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_CONTACT_COLLECTION_ID,
        id
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="pb-4">
      <div className="pb-4 flex justify-between items-center">
        <div className="space-y-2">
          <p className="font-normal text-lg">Your Contact Data</p>
        </div>
      </div>
      <hr className="py-3" />
      {loading ? (
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white rounded space-y-4 p-8">
            <div className="space-y-3 ">
              <div className="text-base font-medium">
                <div className="animate-pulse h-3 bg-secondary"></div>
                <div className="animate-pulse h-3 bg-secondary"></div>
              </div>
              <div className="animate-pulse h-3 bg-secondary"></div>
              <div className="animate-pulse h-3 bg-secondary"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white w-1/3 rounded space-y-4 p-8">
          <div className="space-y-3">
            <div className=" flex justify-between items-center">
              <p className="text-lg font-medium">Phone</p>
              <Button
                onClick={() => {
                  setIsAdding(!isAdding);
                  setType("phone");
                  setError(null); // Clear error state when opening the form
                }}
                variant="ghost"
              >
                {isAdding && type == "phone" ? "Cancel" : <Plus />}
              </Button>
            </div>
            {data
              .filter(({ type }) => type.toLowerCase() == "phone")
              .map(({ data: number, $id }, index) => (
                <div className="flex gap-3 items-center" key={index}>
                  <p>{number}</p>
                  {data.filter(({ type }) => type.toLowerCase() == "phone")
                    .length !== 1 && <ModalBox run={() => drop($id)} />}
                </div>
              ))}
            {isAdding && type == "phone" && (
              <form onSubmit={handleSubmit}>
                <div className=" gap-3 flex">
                  <Input required ref={inputRef} type="text" />
                  <Button className="bg-black hover:bg-black/90">
                    <PlusIcon />
                  </Button>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
                {/* Display error message if there's an error */}
              </form>
            )}
          </div>
          <hr />
          <div className="space-y-3">
            <div className=" flex justify-between items-center">
              <p className="text-lg font-medium">Email</p>
              <Button
                onClick={() => {
                  setIsAdding(!isAdding);
                  setType("email");
                  setError(null); // Clear error state when opening the form
                }}
                variant="ghost"
              >
                {isAdding && type == "email" ? "Cancel" : <Plus />}
              </Button>
            </div>
            {data
              .filter(({ type }) => type.toLowerCase() == "email")
              .map(({ data: mail, $id }, index) => (
                <div className="flex gap-3 items-center" key={index}>
                  <p>{mail}</p>
                  {data.filter(({ type }) => type.toLowerCase() == "email")
                    .length !== 1 && <ModalBox run={() => drop($id)} />}
                </div>
              ))}
            {isAdding && type == "email" && (
              <form onSubmit={handleSubmit}>
                <div className=" gap-3 flex">
                  <Input required ref={inputRef} type="text" />
                  <Button className="bg-black hover:bg-black/90">
                    <PlusIcon />
                  </Button>
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}{" "}
                {/* Display error message if there's an error */}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDashboard;
