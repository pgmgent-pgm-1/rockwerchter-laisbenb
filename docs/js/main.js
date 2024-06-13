function loadWebsite() {
    getHeader();
    updateClock();
    getLineupCards();
};

/*
===
HEADER NAVIGATION
===
*/

function getHeader() {
    let nav = document.getElementById("navigation");
    let name = "";
    for (const element of header) {
        if (element.type === `external`) {
            name += `<li><a href="${element.link}" target="_blank">${element.name}</a></li>`
        } else {
            name += `<li><a href="${element.link}">${element.name}</a></li>`;
        };
    };
    nav.innerHTML = name;
};

/*
===
COUNTDOWN CLOCK
===
*/

function getClock() {
    const clock = document.getElementById("countdown");
    const endTime = 1720087200000;
    let now = new Date();
    let countdown = endTime - now;
    let date = new Date(countdown);

    let d = Math.floor(date / 1000 / 60 / 60 / 24);
    let h = getTwoDigits(date.getHours(), 2);
    let m = getTwoDigits(date.getMinutes(), 2);
    let s = getTwoDigits(date.getSeconds(), 2);

    
    clock.innerHTML = `<h1>${d}days ${h}h ${m}m ${s}s</h1>
    <p>till next edition</p>`;
};

function updateClock() {
    getClock();
    setInterval(getClock, 1000);
};

/*
===
LINEUP CARDS
===
*/

function getLineupCards() {
    let card = document.getElementById("lineup");
    let image = "";
    for (const cards of lineup) {
        image += `<div id="${cards.artist.name}" class="card"><img src="${cards.artist.image}" alt="${cards.artist.name}">
        <h2>${cards.artist.name}</h2>
        <p>${cards.stage} | ${getDate(cards.from)}-${getDate(cards.to).substring(5)}</p></div>`;
    };
    card.innerHTML = image;
    for (const cards of lineup) {
        let cardDescription = document.getElementById(cards.artist.name);
        cardDescription.addEventListener("click", function() {document.getElementById("card-description").innerHTML = getDescription(cards);
        document.getElementById("card-description").classList.add("transform")
        document.getElementById("escape-button").addEventListener("click", function() {let escBtn = document.getElementById("escape-button");
        document.getElementById("card-description").classList.remove("transform")})});
        
    };
};

function getDate(date) {
    let dateNow = "";
    date = new Date(date);
    const d = getTwoDigits(date.getDate(), 2);
    const month = getTwoDigits(date.getMonth(), 2);
    const hour = getTwoDigits(date.getHours(), 2);
    const min = getTwoDigits(date.getMinutes(), 2);

    dateNow = `${d}/${month} ${hour}.${min}`;
    return dateNow;
};

function getTwoDigits(number, nmbrOfDigits) {
    for (i = number.toString().length; i < nmbrOfDigits; i++ ) {
        number = "0" + number;
    };
    return number;
};

/*Description*/

function getDescription(artist) {
    let description = "";
    description = `<div class="description-container">
    <div id="escape-button"><h1>X</h1></div>
    <div class="description-content">
    <img class="image" src="${artist.artist.image}" alt="${artist.artist.name} photo"> <div class="details"><h2>${getDate(artist.from)}-${getDate(artist.to).substring(5)} <br>
    ${artist.artist.name}</h2>
    <div class="socials">${getSocials(artist.artist.socials)}</div>
    <p>${artist.artist.description}</p></div></div></div>`;
    return description;
};

function getSocials(socials) {
    let link = "";
    for (const property in socials) {
        if (socials[property] !== "") {
            link += `<li><a href="${socials[property]}"><img src="images/${property}.svg" alt="${property}"></a></li>`;
        };
    };

    return link;
};

loadWebsite();