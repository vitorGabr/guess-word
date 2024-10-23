import type { GameFeedback } from "@/lib/db/schema";
import { Flex, styled } from "@/styled-system/jsx";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareGameProps {
	feedback: GameFeedback[][];
}

const EMOJI_MAP = {
	correct: "🟩",
	present: "🟨",
	absent: "⬛",
} as const;

export function ShareGame({ feedback }: ShareGameProps) {
	const lastWordIndex = feedback.findLastIndex((word) =>
		word.some(({ letter }) => letter.length > 0),
	);

	const completedWords = feedback.slice(0, lastWordIndex + 1);

	const generateShareText = () => {
		const score = `${completedWords.length}/6`;
		const pattern = completedWords
			.map((word) =>
				word
					.map(
						({ status }) => (status && EMOJI_MAP[status]) || EMOJI_MAP.absent,
					)
					.join(""),
			)
			.join("\n");

		return `Joguei Quizle!\n${score} 🎯\n\n${pattern}`;
	};

	const handleShare = async () => {
		try {
			const shareText = generateShareText();
			await navigator.clipboard.writeText(shareText);
			toast.success("Resultado compartilhado com sucesso!");
		} catch (error) {
			const errorMessage = "Não foi possível compartilhar o resultado";
			toast.error(errorMessage);
		}
	};

	return (
		<styled.button
			w="95%"
			bgColor={"accent.default"}
			rounded="lg"
			p={2}
			py="4"
			fontSize="lg"
			onClick={handleShare}
			cursor={"pointer"}
			aria-label="Compartilhar resultado do jogo"
			_hover={{
				opacity: 0.9,
				transform: "scale(1.01)",
			}}
			transition="all 0.2s"
			color="bg.default"
		>
			<Flex gap="2" alignItems="center" justifyContent="center">
				<Share2 size={18} aria-hidden="true" />
				Compartilhar
			</Flex>
		</styled.button>
	);
}
