import moment from 'moment';

export default async function handler(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/xml');

	// Instructing the Vercel edge to cache the file
	res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

	// generate sitemap here
	let xml = '<?xml version="1.0" encoding="UTF-8"?>';
	xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

	let pages = [
		'/',
		'/statistiche-giocatori',
		'/fasce-asta',
		'/calcola-potenziale',
		'/compara-giocatori',
	];
	let lastMod = moment().format('YYYY[-]MM[-]DD');

	pages.map(function (el) {
		xml += '<url>';
		xml += '<loc>https://www.fantastats.net' + el + '</loc>';
		xml += '<lastmod>' + lastMod + '</lastmod>';
		xml += '</url>';
	});

	const response = await fetch(
		'https://api.fantastats.net/api/v2/player-stats-data/?page=1&perPage=1000'
	);
	const players = await response.json();
	const data = players.data;

	data.forEach((element, k) => {
		pages.map(function (el) {
			xml += '<url>';
			xml +=
				'<loc>https://www.fantastats.net/giocatore/' +
				element.fid +
				'</loc>';
			xml += '<lastmod>' + lastMod + '</lastmod>';
			xml += '</url>';
		});
	});

	xml += '</urlset>';

	res.end(xml);
}
