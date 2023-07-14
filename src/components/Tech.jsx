import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';

import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import groqData from '../utils/data';
import { textVariant } from '../utils/motion';

const Tech = () => {
	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		groqData('technologies').then((data) => setData(data));
	}, []);

	return (
		<>
			<motion.div
				variants={textVariant()}
				className='flex flex-col justify-center items-center mb-8'>
				<p className={`${styles.sectionSubText} `}>
					What tech stack do I use?
				</p>
				<h2 className={`${styles.sectionHeadText}`}>Technologies.</h2>
			</motion.div>

			<div className='flex flex-row flex-wrap justify-center gap-10'>
				{data?.map((technology) => (
					<div className='w-28 h-28' key={technology.name}>
						<BallCanvas icon={technology.url} />
					</div>
				))}
			</div>
		</>
	);
};

export default SectionWrapper(Tech, '');
