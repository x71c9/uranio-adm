export default {
	storage: 'aws',
	connect_on_init: true,
	service: {
		platform: 'express',
		dev:{
			protocol: 'http',
			domain: 'localhost',
			port: 7777,
		},
		protocol: 'http',
		domain: 'localhost',
		port: 7777,
	},
	prefix_api: '/uranio/api',
	prefix_log: '/log',
	lambda: 'netlify',
	fetch: 'axios',
}
