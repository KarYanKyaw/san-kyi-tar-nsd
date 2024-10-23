import DashboardControlSheet from "@/components/dashboard/DashboardControlSheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ModalBox from "@/components/ModalBox.components";
import { client, databases } from "@/lib/appwrite";
import React, { useEffect, useRef, useState } from "react";
import { Storage } from "appwrite";

const ReviewDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    status: false,
    msg: "",
  });

  const closeRef = useRef(null);
  const [formData, setFormData] = useState({
    photo: null,
    name: "",
    position: "",
    organization: "",
    review: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const fetchData = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_REVIEWS_COLLECTION_ID,
        []
      );
      setData(response.documents);
      setLoading(false);
      setError({
        status: false,
        msg: "",
      });
    } catch (error) {
      setLoading(false);
      setError({
        status: true,
        msg: "Something Went Wrong",
      });
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const storage = new Storage(client);

  const uploadPhoto = async (file) => {
    try {
      const response = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        "unique()",
        file
      );

      const fileUrl = `${import.meta.env.VITE_API_BASE_URL}/storage/buckets/${
        response.bucketId
      }/files/${response.$id}/view?project=${client.config.project}`;

      setError({
        status: false,
        msg: "",
      });
      return fileUrl;
    } catch (error) {
      setError({
        status: true,
        msg: "Something Went Wrong",
      });
      console.error("Error uploading photo:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData?.photo) {
        const fileUrl = await uploadPhoto(formData.photo);

        const documentData = {
          name: formData.name,
          position: formData.position,
          organization: formData.organization,
          message: formData.review,
          photo: fileUrl,
        };

        await databases.createDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_REVIEWS_COLLECTION_ID,
          "unique()",
          documentData
        );
      } else {
        const documentData = {
          name: formData.name,
          position: formData.position,
          organization: formData.organization,
          message: formData.review,
        };

        await databases.createDocument(
          import.meta.env.VITE_DATABASE_ID,
          import.meta.env.VITE_REVIEWS_COLLECTION_ID,
          "unique()",
          documentData
        );
      }

      setLoading(false);
      closeRef.current.click();
      setFormData({
        photo: null,
        name: "",
        position: "",
        organization: "",
        review: "",
      });
      setError({
        status: false,
        msg: "",
      });
      fetchData();
    } catch (error) {
      setLoading(false);
      setError({
        status: true,
        msg: "Something Went Wrong",
      });
      console.error("Error submitting data:", error);
    }
  };

  const drop = async (id) => {
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_REVIEWS_COLLECTION_ID,
        id
      );

      setData(data.filter((item) => item.$id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="pb-4">
      <div className="pb-4 flex justify-between items-center">
        <div className="space-y-2">
          <p className="font-normal text-lg">Your Clients' Reviews</p>
        </div>
        <DashboardControlSheet closeRef={closeRef}>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Photo</Label>
              <Input type="file" name="photo" onChange={handleChange} />
            </div>
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-3">
              <div className="space-y-1.5">
                <Label>Position</Label>
                <Input
                  required
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Organization</Label>
                <Input
                  required
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Review</Label>
              <Textarea
                name="review"
                value={formData.review}
                onChange={handleChange}
              />
            </div>
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
            {error.status && (
              <p className="text-sm text-red-700">{error.msg}</p>
            )}
          </form>
        </DashboardControlSheet>
      </div>

      <hr className="py-3" />

      {loading ? (
        <div className="grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="bg-white rounded space-y-4 p-8">
              <div className="w-[100px] h-[100px] mx-auto rounded-lg bg-secondary animate-pulse"></div>
              <div className="space-y-3">
                <div className="text-base font-medium">
                  <div className="animate-pulse h-3 bg-secondary"></div>
                  <div className="animate-pulse h-3 bg-secondary"></div>
                </div>
                <div className="animate-pulse h-3 bg-secondary"></div>
                <div className="animate-pulse h-3 bg-secondary"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {data?.map(
            ({ photo, name, message, organization, position, $id }, index) => (
              <div key={index} className="bg-white rounded space-y-4 p-8">
                <div className="flex justify-end">
                  <ModalBox run={() => drop($id)} />
                </div>
                <div>
                  <img
                    className="mx-auto rounded-lg w-[100px] shadow-lg object-cover h-[100px]"
                    src={photo}
                    alt="client"
                  />
                </div>
                <div className="space-y-3">
                  <div className="text-base font-medium">
                    <p className="text-lg">{name}</p>
                    <p className="text-sm font-normal">
                      <span className="font-light">{position}</span> of{" "}
                      <i>{organization}</i>
                    </p>
                  </div>
                  <p className="text-xs text-black/70">{message}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewDashboard;
