const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');

admin.initializeApp();



exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, 
            {
                admin : true
            });
    }).then(() => {
        return {
            message : `Success ${data.email} is now an admin!`
        }
    });
});


exports.preRender = exports.preRender = functions.https.onRequest((request, response) => {
    const db = admin.firestore();
    
    const userAgent = request.headers['user-agent'].toLowerCase();
	let indexHTML = fs.readFileSync('./web/index.html').toString();
	const path = request.path ? request.path.split('/') : request.path;
    const ogPlaceholder = '<meta name="functions-insert-dynamic-og">';
    
    const isBot = userAgent.includes('googlebot') ||
		userAgent.includes('yahoou') ||
		userAgent.includes('bingbot') ||
		userAgent.includes('baiduspider') ||
		userAgent.includes('yandex') ||
		userAgent.includes('yeti') ||
		userAgent.includes('yodaobot') ||
		userAgent.includes('gigabot') ||
		userAgent.includes('ia_archiver') ||
		userAgent.includes('facebookexternalhit') ||
		userAgent.includes('twitterbot') ||
		userAgent.includes('developers\.google\.com') ? true : false;
    
    if (isBot && (path && path.length > 1 && path[1] === 'article')) {
		const slug = path[2];
        const docRef = db.collection('posts').doc(slug);
        docRef.get().then(doc => {
            if (doc.exists) {
                articleData = doc.data();
			    indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph(articleData, slug));
			    response.status(200).send(indexHTML);
            } 
        })
        .catch(err => {
            console.log('Error getting document', err);
            response.status(404).send("not found");
        }); 
		return;
	}
        
	indexHTML = indexHTML.replace(ogPlaceholder, getOpenGraph());
    response.status(200).send(indexHTML);
    return;
});

const defaultDesc = 'Hi! My name is Robert and I write about programming, tech, art and life in general. Come check it out!';
const defaultTitle = 'Master of Some - A programmer journey';
const defaultLogo = 'https://cdn.pixabay.com/photo/2020/12/18/16/56/laptop-5842509_1280.jpg';

const getOpenGraph = (org,id) => {
	let og = `<meta property="og:type" content="website" />`;

	if (!org) {
		og += `<meta property="og:title" content="${defaultTitle}" />`;
		og += `<meta property="og:description" content="${defaultDesc}" />`;
		og += `<meta property="og:image" content="${defaultLogo}" />`;
		og += `<meta property="og:url" content="https://masterofso.me" />`;
		return og;
	}
	og += `<meta property="og:title" content="${org.title || defaultTitle}" />`;
	og += `<meta property="og:description" content="${org.description || defDesc}" />`;
	og += `<meta property="og:image" content="${org.thumbnail || defLogo}" />`;
	og += `<meta property="og:url" content="https://masterofso.me/article/${id}" />`;
	return og;
};