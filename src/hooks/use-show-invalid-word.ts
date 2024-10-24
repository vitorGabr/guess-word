import { toaster } from "@/components/ui";
import { useGameSelector } from "@/lib/state/machine";
import { useEffect } from "react";

export const useShowInvalidWord = () => {
	const gameState = useGameSelector((state) => state.value);

	useEffect(() => {
		if (gameState === "invalidWord") {
			toaster.create({
				title: "Palavra inválida",
			});
		}
	}, [gameState]);
};
