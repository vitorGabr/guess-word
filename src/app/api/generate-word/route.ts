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
		       Você é meu auxiliar para construir um jogo onde os usuários indentificam palvras, como se fosse o jogo forca.
			   Vou especificar as regras que você deve seguir para me dar as palvras em tópicos:

			   - As palavras TEM que ter exatamente 5 letras, do contrário você deve pensar em outra palavra.
			   - Você deve me responder fornecendo um array de 7 palavras.
			   - As palavras não podem ter caracteres especiais.
			   - Antes de me responder conte os caracteres da palavra, e me garanta que ela tem 5 letras.
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
		    `,
			schema: z.array(z.string()),
		});

		const lastGame = await prisma.games.findFirst({
			orderBy: { id: "desc" },
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
			data: transformedWords,
		});
		return Response.json(transformedWords);
	} catch (error) {
		return Response.json({ error: error }, { status: 500 });
	}
}
