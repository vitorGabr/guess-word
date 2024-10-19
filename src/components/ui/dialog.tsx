import { Box, type BoxProps } from "@/styled-system/jsx";
import { motion } from "framer-motion";
import { useEffect } from "react";

type DialogProps = BoxProps & {
	isOpen: boolean;
};

export function Dialog({ isOpen, children, ...rest }: DialogProps) {
	useEffect(() => {
		const body = document.body;
		body.style.overflow = "hidden";
		return () => {
			body.style.overflow = "auto";
		};
	}, []);

	if (!isOpen) {
		return null;
	}

	return (
		<Box
			w="full"
			h="full"
			bgColor="rgba(0, 0, 0, 0.5)"
			position="fixed"
			top="0"
			left="0"
			zIndex="modal"
			display="flex"
			justifyContent="center"
			alignItems="center"
			backdropFilter="blur(3px)"
			{...rest}
		>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 260, damping: 20 }}
			>
				<Box
					bgColor="bg.default"
					alignItems="center"
					justifyContent="center"
					py="8"
					px="10"
					gap="8"
					rounded="xl"
					mdDown={{
						px: "5",
						py: "6",
					}}
				>
					{children}
				</Box>
			</motion.div>
		</Box>
	);
}
