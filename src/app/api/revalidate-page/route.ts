import { validateAuth } from "@/lib/auth/validate-auth";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

export const dynamic = "force-dynamic";
export const GET = verifySignatureAppRouter(async (request: NextRequest) => {
	const authError = validateAuth(request);
	if (authError) return authError;
	revalidatePath("/");
	return Response.json({ success: true });
});
