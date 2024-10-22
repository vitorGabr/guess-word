"use client";

import { GameProvider } from "@/lib/machine";
import { loadGameForToday } from "@/lib/persist-data";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { Toaster } from "./ui";

export function Providers({
	children,
	targetWord,
}: PropsWithChildren<{ targetWord: string }>) {
	return (
		<ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
			<GameProvider
				options={{
					snapshot: loadGameForToday() as any,
					input: targetWord,
				}}
			>
				{children}
			</GameProvider>
			<Toaster />
		</ThemeProvider>
	);
}
