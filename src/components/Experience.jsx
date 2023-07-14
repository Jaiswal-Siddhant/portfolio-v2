import React from 'react';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import groqData from '../utils/data';
import moment from 'moment';

const ExperienceCard = ({ experience }) => {
	return (
		<VerticalTimelineElement
			contentStyle={{
				background: '#1d1836',
				color: '#fff',
			}}
			contentArrowStyle={{ borderRight: '7px solid  #232631' }}
			date={
				moment(experience.date_from).format('MMM YYYY') +
				' - ' +
				moment(experience.date_to).format('MMM YYYY')
			}
			iconStyle={{ background: '#383E56' }}
			icon={
				<div className='flex justify-center items-center w-full h-full'>
					<img
						src={experience.url}
						alt={experience.company}
						className='w-[95%] h-[95%] rounded-full object-cover'
					/>
				</div>
			}>
			<div>
				<h3 className='text-white text-[24px] font-bold'>
					{experience.position}
				</h3>
				<p
					className='text-secondary text-[16px] font-semibold'
					style={{ margin: 0 }}>
					{experience.company}
				</p>
			</div>

			<ul className='mt-5 list-disc ml-5 space-y-2'>
				{experience.points.map((point, index) => (
					<li
						key={`experience-point-${index}`}
						className='text-white-100 text-[14px] pl-1 tracking-wider'>
						{point}
					</li>
				))}
			</ul>
		</VerticalTimelineElement>
	);
};

const Experience = () => {
	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		groqData('experience').then((data) => setData(data));
	}, []);

	return (
		<>
			<motion.div variants={textVariant()}>
				<p className={`${styles.sectionSubText} text-center`}>
					What I have done so far
				</p>
				<h2 className={`${styles.sectionHeadText} text-center`}>
					Work Experience.
				</h2>
			</motion.div>

			<div className='mt-20 flex flex-col'>
				<VerticalTimeline>
					{data.map((experience, index) => (
						<ExperienceCard
							key={`experience-${index}`}
							experience={experience}
						/>
					))}
				</VerticalTimeline>
			</div>
		</>
	);
};

export default SectionWrapper(Experience, 'work');
