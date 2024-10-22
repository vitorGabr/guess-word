import { Flex, Stack, styled } from "@/styled-system/jsx";
import { Text } from "./ui/text";
import * as Dialog from "./ui/dialog";
import { word as wordRecipe } from "@/styled-system/recipes";
import { css, cx } from "@/styled-system/css";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import type { GameFeedback } from "@/lib/schema";

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
				color="fg.subtle"
				onClick={() => setIsOpen(true)}
				cursor={"pointer"}
			>
				<Info />
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
							px="6"
							py="6"
							gap="6"
							alignItems="flex-start"
							maxW={"lg"}
							h={["60vh", "70vh", "90vh"]}
							overflowY={"auto"}
							scrollbarWidth={"thin"}
						>
							<Text>
								Descubra a palavra certa em 6 tentativas. Depois de cada
								tentativa, as peças mostram o quão perto você está da solução.
							</Text>
							<WordExplanation
								word="TURMA"
								feedback={{ letter: "T", status: "correct" }}
								explanation={[
									"A letra",
									"faz parte da palavra e está na posição correta.",
								]}
							/>
							<WordExplanation
								word="VIOLA"
								feedback={{ letter: "O", status: "present" }}
								explanation={[
									"A letra",
									"faz parte da palavra mas em outra posição.",
								]}
							/>

							<Stack>
								<Text>
									Os acentos são preenchidos automaticamente, e não são
									considerados nas dicas.
								</Text>
								<Text>As palavras podem possuir letras repetidas.</Text>
								<Text>Uma palavra nova aparece a cada dia.</Text>
							</Stack>
						</Stack>
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
	explanation: [string, string];
}) {
	const wordSplit = word.split("");

	return (
		<>
		
			<Flex gap="2">
				{wordSplit.map((letter, index) => {
					const status =
						letter === feedback.letter ? feedback.status : "absent";
					return (
						<styled.div
							key={`${index}`}
							className={cx(wordRecipe(),css({
								mdDown: {
									w: "10",
									h: "10",
									fontSize: "md",
								}
							}))}
							data-feedback={status}
						>
							{letter}
						</styled.div>
					);
				})}
			</Flex>
			<Text>
				{explanation[0]}{" "}
				<Text
					as="span"
					className={cx(
						wordRecipe(),
						css({
							w: "8",
							h: "8",
							fontSize: "sm",
							rounded: "lg",
							textTransform: "uppercase",
						}),
					)}
					data-feedback={feedback.status}
				>
					{feedback.letter}
				</Text>{" "}
				{explanation[1]}
			</Text>
		</>
	);
}
