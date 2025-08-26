import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const Design = () => {
	const particlesInit = useCallback(async (engine) => {
		await loadSlim(engine);
	}, []);

	const particlesLoaded = useCallback(async (container) => {
		console.log('Particles Loaded:', container);
	}, []);

	return (
		<div
			className="absolute top-0 left-0 w-full h-full -z-10"
			style={{
				backgroundImage:
					' linear-gradient(135deg, #393b41ff, #0f3d3e, #35404a)',
			}}
		>
			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={{
					background: { color: 'transparent' }, // transparent so gradient shows
					fpsLimit: 30,
					interactivity: {
						events: {
							onClick: { enable: true, mode: 'push' },
							onHover: { enable: true, mode: 'repulse' },
							resize: true,
						},
						modes: {
							push: { quantity: 5 },
							repulse: { distance: 120, duration: 0.6 },
						},
					},
					particles: {
						color: { value: ['#f0f0f1ff', '#9cd2c0', '#a5a3a1'] },
						links: {
							enable: true,
							color: '#94a3b8',
							distance: 70,
							opacity: 0.3,
							width: 1,
						},
						move: {
							enable: true,
							speed: 1.5,
							random: true,
							outModes: { default: 'bounce' },
						},
						number: { value: 40 },
						opacity: { value: 0.6, random: true },
						shape: { type: ['circle', 'triangle', 'square', 'star'] },
						size: { value: { min: 10, max: 12 }, random: true },
					},
					detectRetina: true,
				}}
			/>
		</div>
	);
};

export default Design;
