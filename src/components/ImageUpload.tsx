"use client";

import config from "@/lib/config";
import { uploadHandler } from "@/lib/uploadHandler";
import { Image, ImageKitProvider, UploadResponse } from "@imagekit/next";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface Props {
  accept?: string;
  onFileUpload: (filePath: string) => void;
  maxFileSizeMB?: number;
  folder?: string;
  value?: string;
}

const {
  env: {
    apiEndpoint,
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${apiEndpoint}/api/auth/imagekit`);

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

function ImageUpload({
  accept,
  folder,
  maxFileSizeMB,
  onFileUpload,
  value,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<{ filePath: string}>({ filePath: value || "" });
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
      setFile({ filePath: result.filePath || "" });
      onFileUpload(result.filePath || "");
      toast.success("File uploaded successfully!");
      return result;
    } catch (err: any) {
      setError(err.message || "Upload failed");
      toast.error(err.message || "Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const validateFile = (file: File) => {
    if (maxFileSizeMB && file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`File size exceeds the limit of ${maxFileSizeMB} MB`);
      toast.error(error);
      return false;
    }
    return true;
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      await uploadFile(file);
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input
        ref={inputRef}
        accept={accept}
        type="file"
        onChange={handleChange}
        className="hidden"
      />
      <Button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
        className="form-input cursor-pointer"
      >
        <Upload className="mr-2" size={16} />
        {uploading
          ? `Uploading... ${Math.round(progress)}%`
          : "Upload University Card"}
      </Button>
      {file.filePath && !uploading && (
        <Image
          urlEndpoint={urlEndpoint}
          src={file.filePath}
          alt="Uploaded card preview"
          width={150}
          height={100}
          className="mt-2 rounded-md border"
          />
      )}
      {error && <span className="ml-2 text-sm text-red-600">{error}</span>}
    </ImageKitProvider>
  );
}

export default ImageUpload;
