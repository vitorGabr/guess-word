import { useThemeSwitch } from "@/hooks/use-theme-switch";
import { styled } from "@/styled-system/jsx";
import { Moon, Sun } from "lucide-react";

export function ToggleModeButton() {
	const { iconText, toggleTheme } = useThemeSwitch();
	function renderIcon() {
		switch (iconText) {
			case "Dark":
				return <Moon />;
			case "Light":
				return <Sun />;
			default:
				return null;
		}
	}

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
