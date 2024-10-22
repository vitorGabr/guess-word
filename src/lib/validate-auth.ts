import type { NextRequest } from "next/server";

export function validateAuth(request: NextRequest): Response | null {
	const CRON_SECRET = process.env.CRON_SECRET;
	if (!CRON_SECRET) {
		return new Response("Missing CRON_SECRET environment variable", {
			status: 500,
		});
	}

	const authHeader = request.headers.get("authorization");
	if (authHeader !== `Bearer ${CRON_SECRET}`) {
		return new Response("Unauthorized", {
			status: 401,
		});
	}

	return null;
}
