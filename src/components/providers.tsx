"use client";

import { GameProvider } from "@/lib/machine";
import { loadGameForToday } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

export function Providers({
	children,
	targetWord,
}: PropsWithChildren<{ targetWord: string }>) {
	return (
		<ThemeProvider>
			<GameProvider
				options={{
					snapshot: loadGameForToday() as any,
					input: targetWord,
				}}
			>
				{children}
			</GameProvider>
		</ThemeProvider>
	);
}
