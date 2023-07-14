// try {
// 	const fetchData = async () => {
// 		let data = await fetch(
// 			'https://7hcpnl26.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == $type]&$type="hero"'
// 		);

// 		data = await data.json();
// 		setHeroData(data.result[0]);
// 	};
// 	fetchData();
// } catch (error) {
// }

import sanityClient from '../Client';

const groqData = async (type) => {
	let query;
	switch (type) {
		case 'hero':
			query = `*[_type == 'hero']{
                    name,
                    description
                }`;
			break;
		case 'about':
			query = `*[_type == 'about']{
				description,
				skills[]{
					title,
					"url":icon.asset->url
				} 
			}`;
			break;
		case 'experience':
			query = `*[_type == 'experience']{
                company,
                position,
                date_from,
                date_to,
                points,
                "url":icon.asset->url
            }`;
			break;
		case 'technologies':
			query = `*[_type == 'technologies']{
                "name":technology,
                "url": icon.asset->url
            }`;
			break;
		case 'projects':
			query = `*[_type == 'projects']{
                title,
                description,
                "projectUrl":url,
                "url":img.asset->url,
                tags
            }`;
			break;
		default:
			throw new Error('Enter a valid type');
	}
	let data = await sanityClient.fetch(query);
	return data;
};

export default groqData;
