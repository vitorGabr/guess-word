import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const POST = verifySignatureAppRouter(async () => {
	revalidatePath("/");
	return Response.json({ success: true });
});
