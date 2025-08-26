import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import lottie from 'lottie-web';
import Icons from './Icon.json';

const Icon = () => {
	const animationContainer = useRef(null);

	useEffect(() => {
		const anim = lottie.loadAnimation({
			container: animationContainer.current,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: Icons,
		});
		return () => anim.destroy();
	}, []);

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8 }}
		>
			{/* ✅ Lottie animation positioned top-right */}
			<div
				ref={animationContainer}
				className="absolute top-10 right-5 w-[700px] h-[700px] z-10"
			/>
		</motion.section>
	);
};

export default Icon;
