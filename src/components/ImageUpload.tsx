"use client";

import config from "@/lib/config";
import { uploadHandler } from "@/lib/uploadHandler";
import { ImageKitProvider } from "@imagekit/next";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const {
  env: {
    apiEndpoint,
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${apiEndpoint}/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function ImageUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const result = await uploadHandler({
        file,
        authenticator,
        onProgress: setProgress,
      });
      return result;
    } catch (err: any) {
      setError(err.message || "Upload failed");
      toast.error(err.message || "Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const res = await uploadFile(file);
      console.log("Uploaded:", res);
      toast.success("File uploaded successfully!");
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input ref={inputRef} type="file" onChange={handleChange} className="hidden" />
      <Button type="button" onClick={(e) => {
        e.preventDefault();
        inputRef.current?.click()
      }}
      className="form-input cursor-pointer"
      >
        <Upload className="mr-2" size={16} />
        Upload A File
      </Button>
    </ImageKitProvider>
  );
}

export default ImageUpload;
