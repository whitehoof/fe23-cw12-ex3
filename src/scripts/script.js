//		 ПОКРАЩУЮ cw12 excercise 3 — ЗРОБИТИ МЕНШЕ ЗАПИТІВ ДО АПІ.

// в інспекторі фільтрую вкладку "Network" кнопкою "XHR" — бачу лише два запити, vehicles та films.

const vehicles = "https://ajax.test-danit.com/api/swapi/vehicles";
const films = "https://ajax.test-danit.com/api/swapi/films";
const container = document.querySelector(".container");

// тягну з сервера дані про тачки:
axios.get(vehicles).then(({ data }) => {
	// створюю порожній обʼєкт, куди закину айдішники та назви фільмів:
	const filmsObj = {};

	// тягну з сервера дані про фільми, розпаковую їх в змінну "filmList":
	axios.get(films).then(({ data: filmList }) => {
		// перебираю фільми, розпакувавши тіки те, шо потрібно (id, name),
		// переназиваю обидва ключі (бо "name" вже є в тачках):
		filmList.forEach(({ id: filmId, name: filmName }) => {
			filmsObj[filmId] = filmName;
		});

		// прикольно, шо вся декомпозиція займає однин атрибут форіча,
		// тому другим атрибутом index можна користуватися:
		// index не вимагається у завданні, але я його використаю
		// для нумерації карток з тачками, because I can:
		data.forEach(({ name, model, films }, index) => {
			const card = document.createElement("div");
			const ul = document.createElement("ul");
			card.classList.add("card");
			container.append(card);

			// перебираю 
			films.forEach(f => {
				// витягую з кожного посилання на кіно айдішнік кіна, 
				// це буде залишок рядка ПІСЛЯ останнього (lastIndexOf) слеша, 
				// але без самого слеша, тому плюс один,
				// напочатку унарний плюс, шоб отримати number:
				const a = +f.substring(f.lastIndexOf('/') + 1);

				// додаю LI з назвою кіна в кінець UL:
				ul.insertAdjacentHTML('beforeend', `<li>${filmsObj[a]}</li>`);
			});

			// створюю картку:
			card.innerHTML = 
`<p class="index">${index + 1}</p>
<p class="name">${name}</p>
<p class="model">Model: ${model}</p>`;

			// додаю картку в DOM:
			card.append(ul);
		});
	})
});
