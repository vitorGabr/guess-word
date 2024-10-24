import prisma from "@/lib/db/prisma";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import dayjs from "dayjs";
import { z } from "zod";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

const REQUIRED_WORD_LENGTH = 5;
const REQUIRED_WORDS_COUNT = 7;

export const dynamic = "force-dynamic";

export const POST = verifySignatureAppRouter(async () => {
	try {
		const generatedWords = await generateObject({
			model: google("gemini-1.5-flash-latest"),
			prompt: `
				Ajude-me a criar um jogo similar ao jogo da forca, onde os usuários identificam palavras. Siga estas regras:

				As palavras devem ter exatamente ${REQUIRED_WORD_LENGTH} letras, caso contrário, escolha outra.
				Forneça um array de ${REQUIRED_WORDS_COUNT} palavras.
				As palavras não podem conter caracteres especiais e devem ser em português.
				Garanta que cada palavra tem ${REQUIRED_WORD_LENGTH} letras antes de responder.
				Exemplo de resposta: ["gatos", "ratos", "bolos", "leite", "bolas", "linda", "lenda" ]
			`,
			schema: z.array(z.string()),
		});

		const lastGame = await prisma.games.findFirst({
			orderBy: { id: "desc" },
		});

		const baseDate = dayjs(lastGame?.targetDate ?? dayjs().subtract(1, "day"));

		const transformedWords = generatedWords.object.map((word, index) => ({
			word,
			targetDate: baseDate.add(index + 1, "day").format("YYYY-MM-DD"),
		}));

		await prisma.games.createMany({
			data: transformedWords,
		});

		return Response.json(transformedWords);
	} catch (error) {
		return Response.json(
			{ error: error instanceof Error ? error.message : "Unknown error" },
			{ status: 500 },
		);
	}
});
