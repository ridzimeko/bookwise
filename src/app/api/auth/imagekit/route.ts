import config from "@/lib/config";
import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4} from "uuid"


export async function GET() {
  const token = uuidv4()

  const imagekit = getUploadAuthParams({
  publicKey: config.env.imagekit.publicKey,
  privateKey: config.env.imagekit.privateKey,
  expire: Math.floor(Date.now() / 1000) + (60 * 30), // Expires in 30 minute
  token
});

    return NextResponse.json(imagekit)
}