"use client";

import { GameProvider } from "@/lib/state/machine";
import { ThemeProvider } from "next-themes";
import { use, type PropsWithChildren } from "react";
import { Toaster } from "../toaster";
import { persistData } from "@/lib/db/persist-data";

export function Providers({
	children,
	targetWord,
}: PropsWithChildren<{ targetWord: string }>) {

	return (
		<ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
			<GameProvider
				options={{
					snapshot: persistData.loadGameForToday() as any,
					input: targetWord,
				}}
			>
				{children}
			</GameProvider>
			<Toaster />
		</ThemeProvider>
	);
}
