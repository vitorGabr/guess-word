"use client";

import { GameProvider } from "@/lib/state/machine";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { loadGameForToday } from "@/lib/db/persist-data";
import { Toaster } from "../toaster";

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
