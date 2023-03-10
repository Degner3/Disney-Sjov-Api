
let myPage = 1;
let searchString = "";
const myAppElement = document.getElementById('myApp');


// Entry Point / On Load
loadingScreen();
fetchOneCharacter(4703);
setupSearchForm();
setUpShowAllButton();


// Loading screen kaldes når vi henter data
function loadingScreen() {

    myAppElement.innerHTML = "<h2>Loading...</h2>";
    
}


// kald på loadindScreen()
// fetch fra api på myPage URI https://api.disneyapi.dev/characters?page=
// Hvis ikke så vis bruger showError("Fejl 404")
function fetchOneCharacter(myId, mySender) {

    let URI = `https://api.disneyapi.dev/characters/${myId}`

        fetch(URI)
        .then((response) => {
            // console.log(response);
            if (response.ok) {
                return response.json();
            }
            else {
                alert("Api error")
                fetchOneCharacter(4703);
            }
        })
        .then((data) => {
            // console.log(data);
            showCharacter(data, mySender);
        })
        .catch((error) => {
            console.error(error.message);
        });
}


// myPage husk at bygge som Template string
// kald showCharacterPage(data) med det data vi har fået
function showCharacter(myData, mySender) {
    
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


    switch (mySender) {
        case "showAll":
            let myReturnButton = document.createElement('button');
            myReturnButton.innerText = 'Tilbage';

            myReturnButton.addEventListener('click', (e) => {
                fetchAllCharacters();

            });

            myAppElement.appendChild(myReturnButton);
            break;

        case "searchResult":
            let myReturnSearch = document.createElement('button');
            myReturnSearch.innerText = 'Tilbage'

            myReturnSearch.addEventListener('click', (e) => {
                fetchSearch(searchString);

            });

            myAppElement.appendChild(myReturnSearch);
            break;
    
        default:

            break;
    }

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

                searchString = myValue;
                fetchSearch(myValue);
            }
            else {
                alert(' indtast i søge felt')
            }

    

    });

}


// find input element med id=searchInput og kknap med id=searchButton
// Add addEventListner der validerer value på searchInput og kalder fetch( name string) eller alerter bruger om indtastning
function setUpShowAllButton() {

    let showAllButton = document.getElementById('showAllButton');
    showAllButton.addEventListener('click', (e) => {

        myPage = 1;

        fetchAllCharacters();

        

    })
}

// kald loadingScreen() kræver en string
// bruger API endpoint filter character med URI https://api.disneyapi.dev/character?name= mySearchString
function fetchSearch(myName) {
   
    let URI = `https://api.disneyapi.dev/character?name=${myName}`

    fetch(URI)
    .then((response) => {
        // console.log(response);

        if (response.ok) {
            return response.json();
        }
        else {
            alert("Api Error")
            fetchOneCharacter(4703);
        }
    })
    .then((data) => {
        // console.log(data);
        showSearch(data.data);
    })
    .catch((error) => {
        console.error(error.message);
    });
}


function showSearch(myData) {

    myAppElement.innerHTML = "";


    myData.map((myCharacter => {

        // console.log('id: ' + myCharacter._id);

        let myCard = document.createElement('article');

        let myHTML = `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}">`;
        myCard.innerHTML = myHTML;

        myCard.addEventListener('click', (e) => {

            // console.log('click: ' + e.currentTarget);
            // console.log('id: ' + myCharacter._id);
            fetchOneCharacter(myCharacter._id, "showAll");
            

        });

        myAppElement.appendChild(myCard);

    }))

    /*
    let myHTML = "";

    myData.map((myCharacter) => {
        myHTML += `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}"></br>`;
    });

    myAppElement.innerHTML = myHTML;
    */
}


function fetchAllCharacters() {

    let URI = `https://api.disneyapi.dev/characters?page=${myPage}`

    fetch(URI)
    .then((response) => {
        // console.log(response);

        if (response.ok) {
            return response.json();
        }
        else {
            alert("Api Error");
            fetchOneCharacter(4703);
        }
    })
    .then((data) => {
        // console.log(data);
        showAll(data.data);
    })
    .catch((error) => {
        console.error(error.message);
    });

}


// kald setUpNavButton() kvæver array med dataobjecter
// map array vis navn og billede med template string.
function showAll(myData) {
    // myAppElement

    myAppElement.innerHTML = "";

    makePageButton();


    myData.map((myCharacter => {

        // console.log('id: ' + myCharacter._id);

        let myCard = document.createElement('article');

        let myHTML = `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}">`;
        myCard.innerHTML = myHTML;

        myCard.addEventListener('click', (e) => {

            // console.log('click: ' + e.currentTarget);
            // console.log('id: ' + myCharacter._id);
            fetchOneCharacter(myCharacter._id, "showAll");
            

        });

        myAppElement.appendChild(myCard);

    }))


    makePageButton();


    /*
    let myHTML = "";

    myData.map((myCharacter) => {
        myHTML += `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}"></br>`
    });

    myAppElement.innerHTML += myHTML;
    */
}


// create elemet til begge knapper
// Add addEventListner til elementer der enten ligger 1 til eller trækker 1 fra myPage
// og kald fetchAllCharacters() og append knapper til myApp
function makePageButton() {
    
    let myNav = document.createElement('nav');

    let prevButton = document.createElement('button');
    prevButton.innerText = 'Prev';

    prevButton.addEventListener('click', (e) => {
        myPage--;

        if (myPage < 1) {
            myPage = 1;
        }
        else {
            fetchAllCharacters();
        }
    });

    let nextButton = document.createElement('button');
    nextButton.innerText = 'Next';

    nextButton.addEventListener('click', (e) => {
        myPage++;

        if (myPage > 149) {
            myPage = 149;
        }
        else {
            fetchAllCharacters();
        }
    })

    myNav.appendChild(prevButton);
    myNav.appendChild(nextButton);

    myAppElement.appendChild(myNav);

}




// Kvæver array med dataobjekter
// map array vis navn og billede med template string
// showSearchResult(array)


