import config from "@/lib/config";
import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

const imagekit = getUploadAuthParams({
  publicKey: config.env.imagekit.publicKey,
  privateKey: config.env.imagekit.privateKey,
  expire: Math.floor(Date.now() / 1000) + 60, // Expires in 1 minute
});

export async function GET() {
    return NextResponse.json(imagekit)
}