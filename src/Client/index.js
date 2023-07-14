import { createClient } from '@sanity/client';

export default createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // find this at manage.sanity.io or in your sanity.json
	dataset: import.meta.env.VITE_SANITY_PROJECT_DATASET, // this is from those question during 'sanity init'
});
