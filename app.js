const form = document.querySelector('#searchForm');
const imageList = document.getElementById('imageList')
form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const searchTerm = form.elements.query.value;
	const config = { params: { q: searchTerm } };
	const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
	if (searchTerm === '') {
		alert('Sorry, Please enter a search term');
	}
	makeImages(res.data);
	form.elements.query.value = '';
});

const makeImages = (shows) => {
	for (let result of shows) {
		if (result.show.image) {
			const card = document.createElement('div');
            const cardImg = document.createElement('div');
            const img = document.createElement('img');
            const span = document.createElement('span');
            const cardContent = document.createElement('div');
			const cardTitle = document.createElement('h6');
            const cardSummary = document.createElement('div')
			card.classList.add('card', 'medium');
			cardImg.classList.add('card-image');	
            cardContent.classList.add('card-content');
			img.src = result.show.image.medium;
			span.textContent = result.show.name;
			cardTitle.textContent = result.show.name;
            cardSummary.innerHTML = result.show.summary
			card.append(cardImg);
			cardImg.append(img);
			cardImg.append(span);
            imageList.append(card);
            cardContent.append(cardTitle)			
            cardContent.append(cardSummary)
			card.append(cardContent);
		}
	}
};