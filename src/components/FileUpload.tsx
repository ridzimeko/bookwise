"use client";

import config from "@/lib/config";
import { uploadHandler } from "@/lib/uploadHandler";
import { Image, ImageKitProvider, UploadResponse, Video } from "@imagekit/next";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  type: "image" | "video";
  onFileChange: (filePath: string) => void;
  accept: string;
  placeholder: string;
  maxFileSizeMB?: number;
  variant: "dark" | "light";
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

function FileUpload({
  type,
  accept,
  placeholder,
  folder,
  variant,
  maxFileSizeMB,
  onFileChange,
  value,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<{ filePath: string }>({
    filePath: value || "",
  });
  const inputRef = React.useRef<HTMLInputElement>(null);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 hover:bg-light-100 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

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
      onFileChange(result.filePath || "");
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
    const MAX_IMAGE_SIZE = maxFileSizeMB ?? 20; // 20 MB default
    const MAX_VIDEO_SIZE = maxFileSizeMB ?? 50; // 50 MB default

    if (type === "image" && file.size > MAX_IMAGE_SIZE * 1024 * 1024) {
      setError(`File size exceeds the limit of ${MAX_IMAGE_SIZE} MB`);
      toast.error(error);
      return false;
    }
    if (type === "video" && file.size > MAX_VIDEO_SIZE * 1024 * 1024) {
      setError(`File size exceeds the limit of ${MAX_VIDEO_SIZE} MB`);
      toast.error(error);
      return false;
    }

    return true;
  };

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
        className={cn("upload-btn overflow-hidden", styles.button)}
      >
        <p className="flex items-center">
          <Upload className="mr-2" size={16} />
          {uploading
            ? `Uploading... ${Math.round(progress)}%`
            : placeholder || "Upload a File"}
        </p>
        {file.filePath && <p className="upload-filename">{file.filePath}</p>}
      </Button>
      {file.filePath && !uploading && (
        <div className="flex flex-row justify-center w-full">
          {type === "image" && (
            <Image
              urlEndpoint={urlEndpoint}
              src={file.filePath}
              alt="Uploaded card preview"
              width={300}
              height={200}
              className="mt-2 rounded-md border object-contain"
            />
          )}
          {type === "video" && (
            <Video
              urlEndpoint={urlEndpoint}
              src={file.filePath}
              controls
              height={400}
              className="mt-2 rounded-md border object-contain w-full"
            />
          )}
        </div>
      )}
      {error && <span className="ml-2 text-sm text-red-600">{error}</span>}
    </ImageKitProvider>
  );
}

export default FileUpload;
