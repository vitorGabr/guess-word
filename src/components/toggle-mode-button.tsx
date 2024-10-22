import { useThemeSwitch } from "@/hooks/use-theme-switch";
import { styled } from "@/styled-system/jsx";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";

export function ToggleModeButton() {
	const { iconText, toggleTheme } = useThemeSwitch();

	const renderIcon = () => {
		switch (iconText) {
			case "Light":
				return <Sun size="24" />;
			case "Dark":
				return <Moon size="24" />;
			default:
				return <Sun size="24" />;
		}
	};

	return (
		<styled.button
			color="fg.subtle"
			onClick={toggleTheme}
			aria-label={`Toggle ${iconText} mode`}
			cursor="pointer"
			outline="none"
		>
			{renderIcon()}
		</styled.button>
	);
}
