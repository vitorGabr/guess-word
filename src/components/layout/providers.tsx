"use client";

import { persistData } from "@/lib/db/persist-data";
import { gameMachine, GameProvider } from "@/lib/state/machine";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { Toast, toaster } from "../ui";

type ProvidersProps = PropsWithChildren<{ targetWord: string }>;

export function Providers({ children, targetWord }: ProvidersProps) {
	
	return (
			<ThemeProvider
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<GameProvider
					logic={gameMachine.provide({
						actions: {
							onToastMessage: (_, { message }) => {
								toaster.create({ title: message });
							},
						},
					})}
					options={{
						snapshot: persistData.loadGameForToday() as any,
						input: targetWord,
					}}
				>
					{children}
				</GameProvider>
				<Toast />
			</ThemeProvider>
	);
}