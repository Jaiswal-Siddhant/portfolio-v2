import React from 'react';
import Tilt from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import groqData from '../utils/data';

const ProjectCard = ({
	index,
	name,
	description,
	tags,
	image,
	source_code_link,
}) => {
	const colors = [
		'blue-text-gradient',
		'green-text-gradient',
		'pink-text-gradient',
		'text-violet-300',
		'text-yellow-300',
		'text-lime-300',
		'text-fuchsia-400',
		'text-indigo-500',
	];
	return (
		<motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
			<Tilt
				options={{
					max: 45,
					scale: 1,
					speed: 450,
				}}
				className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'>
				<div className='relative w-full h-[230px]'>
					<img
						src={image}
						alt='project_image'
						className='w-full h-full object-cover rounded-2xl'
					/>

					<div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
						<div
							onClick={() =>
								window.open(source_code_link, '_blank')
							}
							className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'>
							<img
								src={github}
								alt='source code'
								className='w-1/2 h-1/2 object-contain'
							/>
						</div>
					</div>
				</div>

				<div className='mt-5'>
					<h3 className='text-white font-bold text-[24px]'>{name}</h3>
					<p className='mt-2 text-secondary text-[14px]'>
						{description}
					</p>
				</div>

				<div className='mt-4 flex flex-wrap gap-2'>
					{tags.map((tag, n) => (
						<p
							key={`${name}-${tag}`}
							className={`text-[14px] ${
								colors[n % colors.length]
							}`}>
							{tag ? `#${tag}` : null}
						</p>
					))}
				</div>
			</Tilt>
		</motion.div>
	);
};

const Works = () => {
	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		groqData('projects').then((data) => setData(data));
	}, []);

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className={`${styles.sectionSubText} `}>My work</p>
				<h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
			</motion.div>

			<div className='w-full flex'>
				<motion.p
					variants={fadeIn('', '', 0.1, 1)}
					className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'>
					Following projects showcases my skills and experience
					through real-world examples of my work. Each project is
					briefly described with links to code repositories and live
					demos in it. It reflects my ability to solve complex
					problems, work with different technologies, and manage
					projects effectively.
				</motion.p>
			</div>

			<div className='mt-20 flex flex-wrap gap-7'>
				{data.map((project, index) => (
					<ProjectCard
						key={`project-${index}`}
						index={index}
						name={project.title}
						description={project.description}
						tags={project.tags}
						image={project.url}
						source_code_link={project.projectUrl}
					/>
				))}
			</div>
		</>
	);
};

export default SectionWrapper(Works, '');
