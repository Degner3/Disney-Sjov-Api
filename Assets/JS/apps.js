
let myPage = 1;
const myAppElement = document.getElementById('myApp');

// Entry point / on load
loadingScreen();
setUpShowAllButton();
setupSearchForm();
fetchOneCharacter(4703);


function fetchOneCharacter(myId) {
    let URI = `https://api.disneyapi.dev/characters/${myId}`

        fetch(URI)
        .then((Response) => {
            console.log(Response);
            if (Response.ok) {
                return Response.json();
            }
            else {
                alert("Api error")
                fetchOneCharacter(4703);
            }
        })
        .then((data) => {
            console.log(data);
            showCharacter(data)
        })
        .catch();
}


function showCharacter(myData) {
    // myAppElement

    console.log(myData.name);

    let myFilms = '<h3>Films</h3>';
    myData.films.map((film) => {
        myFilms += `${film}, `
    })

    let myTShows = '<h3>TV Shows</h3>';
    myData.tvShows.map((show) => {
        myTShows += `${show}, `
    })

    let myVideoGames = '<h3>VideoGames</h3>';
    myData.videoGames.map((videoGames) => {
        myVideoGames += `${videoGames}, `
    })

    let myParkAttractions = '<h3>ParkAttractions</h3>';
    myData.parkAttractions.map((parkAttractions) => {
        myParkAttractions += `${parkAttractions}, `
    })


    let myHTML = `<h2>${myData.name}</h2>
    <img src="${myData.imageUrl}">
    <p>${myFilms}</p>
    <p>${myTShows}</p>
    <p>${myVideoGames}</p>
    <p>${myParkAttractions}</p>`;
    myAppElement.innerHTML = myHTML;

}

// Loading screen kaldes når vi henter data
function loadingScreen() {

    myAppElement.innerHTML = "<h2>Loading...</h2>";
    
}



// find input element med id=searchInput og kknap med id=searchButton
// Add addEventListner der validerer value på searchInput og kalder fetch( name string) eller alerter bruger om indtastning
function setUpShowAllButton() {

    let showAllButton = document.getElementById('showAllButton');
    showAllButton.addEventListener('click', (e) => {
        
        myPage = 1;

        fetchCharacterPage()

    })
    
}

// find vis alle knappen i DOM med id=showAllButton og reset myPage til 1
// add addEventListner skal kalde fetchCharacterPage()
function setupSearchForm() {
    
    let searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', (e) =>{
            e.preventDefault();
            let searchInput = document.getElementById('searchInput');
            let myValue = searchInput.value;

            if (myValue) {
                console.log(' vi har string');
            }
            else {
                alert(' indtast i søge felt')
            }

    });

}

// kald på loadindScreen()
// fetch fra api på myPage URI https://api.disneyapi.dev/characters?page=
// myPage husk at bygge som Template string
// kald showCharacterPage(data) med det data vi har fået
// Hvis ikke så vis bruger showError("Fejl 404")
function fetchCharacterPage() {
    console.log('fetchCharacterPage');


}



// create elemet til begge knapper
// Add addEventListner til elementer der enten ligger 1 til eller trækker 1 fra myPage
// og kald fetchCarachterPage() og append knapper til myAPp
// function setUpNavButton() {}

// kald setUpNavButton() kvæver array med dataobjecter
// map array vis navn og billede med template string.
// showCharacterPage(array) {}


// kald loadingScreen() kræver en string
// bruger API endpoint filter character med URI https://api.disneyapi.dev/character?name= mySearchString
// fetchByName(mySearchString) {} 



// Kvæver array med dataobjekter
// map array vis navn og billede med template string
// showSearchResult(array)