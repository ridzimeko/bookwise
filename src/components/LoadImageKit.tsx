import config from "@/lib/config";
import { Image, ImageKitProvider, Video } from "@imagekit/next";
import React from "react";

interface Props {
  url: string;
  type: "image" | "video";
  alt?: string;
  width?: number;
  height?: number;
}

function LoadImageKit({ url, alt, type, width = 500, height = 500 }: Props) {
  return (
    <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
      {type === "video" && (
        <Video
          src={url}
          controls
          width={width}
          height={height}
          className="rounded-xl object-contain w-full"
        />
      )}

      {type === "image" && (
        <Image
          src={url}
          alt={alt || "Image"}
          width={width}
          height={height}
          className="rounded-xl object-contain w-full"
        />
      )}
    </ImageKitProvider>
  );
}

export default LoadImageKit;
