import { validateAuth } from "@/lib/auth/validate-auth";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
	const authError = validateAuth(request);
	if (authError) return authError;
	revalidatePath("/");
	return Response.json({ success: true });
}
