import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export function GET(request: NextRequest) {
	const authHeader = request.headers.get("authorization");
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response("Unauthorized", {
			status: 401,
		});
	}
	revalidatePath("/");
	return Response.json({ success: true });
}
