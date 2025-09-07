import config from "@/lib/config";
import { ImageKitProvider, Video } from "@imagekit/next";
import React from "react";

function BookVideo({ videoUrl }: { videoUrl: string }) {
  return (
    <ImageKitProvider urlEndpoint={config.env.imagekit.urlEndpoint}>
      <Video
        src={videoUrl}
        controls
        height={400}
        className="rounded-xl object-contain w-full"
      />
    </ImageKitProvider>
  );
}

export default BookVideo;
