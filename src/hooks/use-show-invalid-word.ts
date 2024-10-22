import { useGameSelector } from "@/lib/state/machine";
import { useEffect } from "react";
import { toast } from "sonner";

export const useShowInvalidWord = () => {
	const gameState = useGameSelector((state) => state.value);

	useEffect(() => {
		if (gameState === "invalidWord") {
			toast.info("A palavra não é válida");
		}
	}, [gameState]);
};
