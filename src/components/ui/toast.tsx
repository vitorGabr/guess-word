import { forwardRef } from "react";
import * as StyledToast from "./styled/toast";
import { createToaster } from "./styled/toast";

// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface ToastProps {}

export const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {

    return (
		<StyledToast.Toaster ref={ref} toaster={toaster}>
			{(toast) => (
				<StyledToast.Root key={toast.id}>
					<StyledToast.Title>{toast.title}</StyledToast.Title>
				</StyledToast.Root>
			)}
		</StyledToast.Toaster>
	);
});

export const toaster = createToaster({
	placement: "top",
	overlap: true,
	gap: 24,
});