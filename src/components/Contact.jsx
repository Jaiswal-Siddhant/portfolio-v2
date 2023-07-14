import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { fadeIn, slideIn } from '../utils/motion';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
	const formRef = useRef();
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [recaptcha, setRecaptcha] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isCaptchaVisible, setIsCaptchaVisible] = useState(false);
	const handleChange = (e) => {
		const { target } = e;
		const { name, value } = target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		emailjs
			.send(
				import.meta.env.VITE_EMAILJS_SERVICE_KEY,
				import.meta.env.VITE_EMAILJS_TEMPLATE_KEY,
				{
					from_name: form.name,
					to_name: 'Siddhant Jaiswal',
					from_email: form.email,
					to_email: 'jaiswalsiddhant2001@gmail.com',
					message: form.message,
				},
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY
			)
			.then(
				() => {
					setLoading(false);
					alert(
						'Thank you. I will get back to you as soon as possible.'
					);

					setForm({
						name: '',
						email: '',
						message: '',
					});
				},
				(error) => {
					setLoading(false);
					console.error(error);

					alert('Ahh, something went wrong. Please try again.');
				}
			);
	};

	return (
		<div
			className={` xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden -z-10`}>
			<motion.div
				onFocus={() => {
					if (!isCaptchaVisible) setIsCaptchaVisible(true);
					console.log('object');
				}}
				variants={slideIn('left', 'tween', 0.2, 1)}
				className='flex-[0.75] bg-black-100 p-8 rounded-2xl h-fit'>
				<p className={styles.sectionSubText}>Get in touch</p>
				<h3 className={styles.sectionHeadText}>Contact.</h3>

				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className='mt-12 flex flex-col gap-8 '>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>
							Your Name
						</span>
						<input
							type='text'
							name='name'
							value={form.name}
							onChange={handleChange}
							placeholder="What's your good name?"
							className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
						/>
					</label>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>
							Your email
						</span>
						<input
							type='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							placeholder="What's your email address?"
							className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
						/>
					</label>
					<label className='flex flex-col'>
						<span className='text-white font-medium mb-4'>
							Your Message
						</span>
						<textarea
							rows={7}
							name='message'
							value={form.message}
							onChange={handleChange}
							placeholder='What you want to say?'
							className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
						/>
					</label>
					<motion.div
						variants={fadeIn('right', 'tween', 0.2, 2)}
						onFocus={() => {
							setIsCaptchaVisible(true);
							console.log('object');
						}}
						className={`${
							!isCaptchaVisible ? 'hidden' : 'visible'
						}`}>
						<ReCAPTCHA
							sitekey={import.meta.env.VITE_RECAPTCHA_PUBLIC_KEY}
							onChange={(val) => {
								setRecaptcha(val);
							}}
						/>
					</motion.div>
					<button
						disabled={!recaptcha || loading ? true : false}
						type='submit'
						className={`bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary ${
							!recaptcha || loading ? '' : 'cursor-pointer'
						}`}>
						{loading ? 'Sending...' : 'Send'}
					</button>
				</form>
			</motion.div>

			<motion.div
				variants={slideIn('right', 'tween', 0.2, 1)}
				className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
				<EarthCanvas />
			</motion.div>
		</div>
	);
};

export default SectionWrapper(Contact, 'contact');