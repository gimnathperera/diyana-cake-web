"use client";

import Image from "next/image";
import { useEdgeStore } from "@/libs/edgestore";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  const { edgestore } = useEdgeStore();

  const handleFileChange = async (ev) => {
    const files = ev.target.files;
    if (files?.length !== 1) return;

    toast.promise(edgestore.myPublicImages.upload({ file: files[0] }), {
      loading: "Uploading image...",
      success: (res) => {
        if (res.url) {
          setLink(res.url);
          return "Image uploaded successfully!";
        }
        return "Image upload failed.";
      },
      error: "Image upload failed.",
    });
  };

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
