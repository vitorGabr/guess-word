import { revalidatePath } from "next/cache";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

export const dynamic = "force-dynamic";
export const POST = verifySignatureAppRouter(async () => {
	revalidatePath("/");
	return Response.json({ success: true });
});
