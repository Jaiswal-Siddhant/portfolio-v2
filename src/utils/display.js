const clgData = () => {
	window.onload = () => {
		function log() {
			console.clear();
			let styles =
				'font-size:17px;font-weight:bold;padding:5px;color:violet;';
			console.group(
				'%c 👋🏻 Yo, Sid here thanks for checking out my Portfolio! You can checkout my other profiles below 👀',
				styles
			);
			styles =
				'font-size:12px;font-weight:semi-bold;padding:5px;color:#2ad083;';
			let styles2 = 'font-size:12px;font-weight:semi-bold;padding:5px;';
			console.log(
				'%c📂 GitHub  - %chttps://github.com/Jaiswal-Siddhant',
				styles,
				styles2
			);
			styles =
				'font-size:12px;font-weight:semi-bold;padding:5px;color:#f4d845;';
			styles2 = 'font-size:12px;font-weight:semi-bold;padding:5px;';
			console.log(
				'%c📝 Contact - %cjaiswalsiddhant2001@gmail.com',
				styles
			);

			console.groupEnd();
		}

		setTimeout(() => {
			log();
		}, 1000);
		setInterval(() => {
			log();
		}, 10000);
	};
};

export default clgData;
