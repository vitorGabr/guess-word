"use client";

import { GameProvider } from "@/lib/machine";
import { loadGameForToday } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { Toaster } from "./ui/toaster";

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
