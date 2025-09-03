import config from "@/lib/config";
import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

const imagekit = getUploadAuthParams({
  publicKey: config.env.imagekit.publicKey,
  privateKey: config.env.imagekit.privateKey
});

export async function GET() {
    return NextResponse.json(imagekit)
}