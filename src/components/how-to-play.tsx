import { Flex, Stack, styled } from "@/styled-system/jsx";
import { Text } from "./ui/text";
import * as Dialog from "./ui/dialog";
import { word } from "@/styled-system/recipes";
import { css, cx } from "@/styled-system/css";
import { useEffect, useState } from "react";

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
		<Dialog.Root
			trapFocus={false}
			open={isOpen}
			onOpenChange={(e) => setIsOpen(e.open)}
		>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content overflow={"hidden"}>
					<Stack
						p="4"
						gap="6"
						alignItems="flex-start"
						maxW={"lg"}
						h={"80vh"}
						overflowY={"auto"}
					>
						<Text as="h3" fontSize="md" fontWeight="semibold">
							Descubra a palavra certa em 6 tentativas. Depois de cada
							tentativa, as peças mostram o quão perto você está da solução.
						</Text>
						<Flex gap="2">
							{["T", "U", "R", "M", "A"].map((letter, index) => {
								const status = index === 0 && "correct";
								return (
									<styled.div
										key={`${index}`}
										className={word()}
										data-feedback={status}
									>
										{letter}
									</styled.div>
								);
							})}
						</Flex>
						<Flex gap="1" alignItems="center">
							<Text>A letra</Text>
							<styled.div
								className={cx(
									word(),
									css({
										w: "8",
										h: "8",
										fontSize: "sm",
										rounded: "lg",
									}),
								)}
								data-feedback={"correct"}
							>
								T
							</styled.div>
							<Text>faz parte da palavra e está na posição correta.</Text>
						</Flex>
						<Flex gap="2">
							{["V", "I", "O", "L", "A"].map((letter, index) => {
								const status = letter === "L" && "present";
								return (
									<styled.div
										key={`${index}`}
										className={word()}
										data-feedback={status}
									>
										{letter}
									</styled.div>
								);
							})}
						</Flex>
						<Flex gap="1" alignItems="center">
							<Text>A letra</Text>
							<styled.div
								className={cx(
									word(),
									css({
										w: "8",
										h: "8",
										fontSize: "sm",
										rounded: "lg",
									}),
								)}
								data-feedback={"present"}
							>
								O
							</styled.div>
							<Text> faz parte da palavra mas em outra posição.</Text>
						</Flex>
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
	);
}
