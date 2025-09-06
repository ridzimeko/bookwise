import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import config from "@/lib/config"

const {
  env: {
    apiEndpoint,
  },
} = config;

interface UploadOptions {
  file: File | Blob | string;
  fileName: string;
  folder?: string;
  abortController?: AbortController;
  onProgress?: (progress: number) => void;
}

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

export async function uploadHandler({
  file,
  fileName,
  folder,
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
      fileName,
      publicKey: config.env.imagekit.publicKey,
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
