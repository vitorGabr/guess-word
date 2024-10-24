import prisma from "@/lib/db/prisma";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import dayjs from "dayjs";
import { z } from "zod";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

type WordWithTargetDate = {
	word: string;
	targetDate: string;
};

const REQUIRED_WORD_LENGTH = 5;
const REQUIRED_WORDS_COUNT = 7;

const wordsArraySchema = z.array(z.string());

const generateWordsPrompt = (): string => {
	return `
        Você é meu auxiliar para construir um jogo onde os usuários indentificam palvras, como se fosse o jogo forca.
        Vou especificar as regras que você deve seguir para me dar as palvras em tópicos:

        - As palavras TEM que ter exatamente ${REQUIRED_WORD_LENGTH} letras, do contrário você deve pensar em outra palavra.
        - Você deve me responder fornecendo um array de ${REQUIRED_WORDS_COUNT} palavras.
        - As palavras não podem ter caracteres especiais.
        - Antes de me responder conte os caracteres da palavra, e me garanta que ela tem ${REQUIRED_WORD_LENGTH} letras.
        - As palavras devem ser em português.

        Por último, vou deixar um exemplo de como você deve me responder:
        [
            "gatos",
            "ratos",
            "bolos",
            "leite",
            "bolas",
            "linda",
            "lenda"
        ]
    `;
};

const transformWordsWithDates = (
	words: string[],
	baseDate: dayjs.Dayjs,
): WordWithTargetDate[] => {
	return words.map((word, index) => ({
		word,
		targetDate: baseDate.add(index + 1, "day").format("YYYY-MM-DD"),
	}));
};

export const dynamic = "force-dynamic";

export const POST = verifySignatureAppRouter(async () => {
	try {
		const generatedWords = await generateObject({
			model: google("gemini-1.5-flash-latest"),
			prompt: generateWordsPrompt(),
			schema: wordsArraySchema,
		});

		const lastGame = await prisma.games.findFirst({
			orderBy: { id: "desc" },
		});

		const baseDate = dayjs(lastGame?.targetDate ?? dayjs().subtract(1, "day"));

		const transformedWords = transformWordsWithDates(
			generatedWords.object,
			baseDate,
		);

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
