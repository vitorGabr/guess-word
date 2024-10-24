import type { GameFeedback } from "@/lib/db/schema";
import { css, cx } from "@/styled-system/css";
import { Flex, Stack, styled } from "@/styled-system/jsx";
import { word as wordRecipe } from "@/styled-system/recipes";
import { Info, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, Heading, Icon } from "./ui";
import { Text } from "./ui/text";

export function HowToPlay() {
	const [isOpen, setIsOpen] = useState(false);

	function showInstructions() {
		const result = localStorage.getItem("showInstructions");
		if (!result) {
			setIsOpen(true);
			localStorage.setItem("showInstructions", "true");
		}
	}

	useEffect(() => {
		showInstructions();
	}, []);

	return (
		<>
			<styled.button
				onClick={() => setIsOpen(true)}
				cursor={"pointer"}
				aria-label="Botão de instruções de como jogar"
			>
				<Icon color="fg.subtle">
					<Info />
				</Icon>
			</styled.button>
			<Dialog.Root
				trapFocus={false}
				open={isOpen}
				onOpenChange={(e) => setIsOpen(e.open)}
			>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content overflow={"hidden"}>
						<Stack
							px="8"
							py="8"
							gap="6"
							alignItems="flex-start"
							h="90vh"
							overflowY={"auto"}
							scrollbarWidth={"thin"}
						>
							<Stack gap="0">
								<Heading
									as="h1"
									fontSize={["2xl", "3xl", "3xl"]}
									fontWeight="bold"
								>
									Como jogar
								</Heading>
								<Text fontSize={["sm", "lg", "lg"]} fontWeight="light">
									Adivinhe a palavra do dia em 6 tentativas.
								</Text>
							</Stack>
							<ul
								className={css({
									fontSize: "sm",
									listStyleType: "disc",
									ml: "6",
								})}
							>
								<li>Cada palpite deve ser uma palavra válida de 5 letras.</li>
								<li>
									A cor dos blocos mudará para mostrar o quão próximo seu
									palpite estava da palavra.
								</li>
							</ul>

							<Stack>
								<Heading>Exemplos</Heading>
								<WordExplanation
									word="TURMA"
									feedback={{ letter: "T", status: "correct" }}
									explanation="faz parte da palavra e está na posição correta."
								/>
								<WordExplanation
									word="VIOLA"
									feedback={{ letter: "O", status: "present" }}
									explanation="faz parte da palavra mas em outra posição."
								/>
								<WordExplanation
									word="PULGA"
									feedback={{ letter: "G", status: "absent" }}
									explanation="não faz parte da palavra."
								/>
							</Stack>

							<Stack fontSize="sm" gap="1">
								<Text>
									Os acentos são preenchidos automaticamente, e não são
									considerados nas dicas.
								</Text>
								<Text>As palavras podem possuir letras repetidas.</Text>
								<Text>Uma palavra nova aparece a cada dia.</Text>
							</Stack>
						</Stack>
						<Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
							<button
								aria-label="Fechar modal"
								type="button"
								className={css({
									outline: "none",
									p: "2",
									color: "fg.subtle",
									cursor: "pointer",
								})}
							>
								<XIcon />
							</button>
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</>
	);
}

function WordExplanation({
	word,
	feedback,
	explanation,
}: {
	word: string;
	feedback: GameFeedback;
	explanation: string;
}) {
	const wordSplit = word.split("");

	return (
		<>
			<Flex gap="2">
				{wordSplit.map((letter, index) => {
					const status = letter === feedback.letter && feedback.status;
					return (
						<styled.div
							key={`${index}`}
							className={cx(
								wordRecipe(),
								css({
									w: "10",
									h: "10",
									fontSize: "md",
								}),
							)}
							data-feedback={status}
						>
							{letter}
						</styled.div>
					);
				})}
			</Flex>
			<Text>
				<Text as="span" fontWeight="bold" textTransform="uppercase">
					{feedback.letter}
				</Text>{" "}
				{explanation}
			</Text>
		</>
	);
}
