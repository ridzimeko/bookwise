import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { AuthResponse } from "@imagekit/next/server";
import config from "@/lib/config"

interface UploadOptions {
  file: File;
  folder?: string;
  authenticator: () => Promise<AuthResponse>;
  abortController?: AbortController;
  onProgress?: (progress: number) => void;
}

export async function uploadHandler({
  file,
  folder,
  authenticator,
  abortController,
  onProgress,
}: UploadOptions) {
  try {
    const { signature, expire, token } = await authenticator();

    return await upload({
      expire,
      token,
      signature,
      file,
      folder,
      publicKey: config.env.imagekit.publicKey,
      fileName: file.name,
      onProgress: (event) => {
        if (onProgress) onProgress((event.loaded / event.total) * 100);
      },
      abortSignal: abortController?.signal,
    });
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      throw new Error("Upload aborted: " + error.reason);
    } else if (error instanceof ImageKitInvalidRequestError) {
      throw new Error("Invalid request: " + error.message);
    } else if (error instanceof ImageKitUploadNetworkError) {
      throw new Error("Network error: " + error.message);
    } else if (error instanceof ImageKitServerError) {
      throw new Error("Server error: " + error.message);
    } else {
      throw error;
    }
  }
}
