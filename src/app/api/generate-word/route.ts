import prisma from "@/lib/prisma";
import { google } from "@ai-sdk/google";
import type { Prisma } from "@prisma/client";
import { generateObject } from "ai";
import dayjs from "dayjs";
import { z } from "zod";

export const dynamic = "force-dynamic";
export async function GET() {
	try {
		const generatedWords = await generateObject({
			model: google("gemini-1.5-flash-latest"),
			prompt: `
		        Gere uma lista de 7 palavras para um jogo de "wordle" com as seguintes regras:
		        - As palavras devem ter 5 letras
		        - As palavras devem ser diferentes entre si
		        - As palavras devem ser comuns
		    `,
			schema: z.array(z.string()),
		});

		const lastGame = await prisma.games.findFirst({
			orderBy: { id: 'desc' },
		});

		const targetDate = dayjs(
			lastGame?.targetDate ?? dayjs().subtract(1, "day"),
		);

		const transformedWords = generatedWords.object.map((word, index) => {
			return {
				word,
				targetDate: targetDate.add(index + 1, "day").format("YYYY-MM-DD"),
			} as Prisma.gamesCreateInput;
		});

		await prisma.games.createMany({
			data: transformedWords
		});
		return Response.json(transformedWords);
	} catch (error) {
		return Response.json({ error: error }, { status: 500 });
	}
}
