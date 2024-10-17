"use client";

import { GameProvider } from "@/lib/state-machines/game";
import { loadGameForToday } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export function Providers({
	children,
	targetWord,
}: PropsWithChildren<{ targetWord: string }>) {
	return (
		<GameProvider
			options={{
				snapshot: loadGameForToday() as any,
				input: targetWord,
			}}
		>
			{children}
		</GameProvider>
	);
}
