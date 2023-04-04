//API Key
const apiKeypoint = "u9cmCnSsfUhrFr3YGVWsk7bfZltSXv7WMttc60ap";

//Getting All the Inputs from the HTML 
let searchBtn = document.getElementById("searchBtn");
let output = document.getElementById("output");
let imageData = document.getElementById("image-data");
let date = document.getElementById("date").value;

//get the data from the localStorage
let dateStore = JSON.parse(localStorage.getItem("dateStore") || "[]");

//=================================================== saveSearch Function ======================================================//
//1.store the data from the search date in the local storage.
//2.get the image and data related to search date after clicking the search button and shown the data in the image container.  
//3.if the date input is not specified then we informed that please enter the date in input field.
function saveSearch() {
let dateStore = JSON.parse(localStorage.getItem("dateStore") || "[]");

    searchBtn.addEventListener('click', (e) => {
        let date = document.getElementById("date").value;
        e.preventDefault();

        //if the date input is not specified then we informed that please enter the date in input field.
        if(date == '')
        {
            document.getElementById('error').innerHTML = "Please enter the date";
        }

        //store the data from the search date in the local storage.
        let dateList = date;
        dateStore.push(dateList);

        localStorage.setItem("dateStore" , JSON.stringify(dateStore));
        //get the image and data related to search date after clicking the search button and shown the data in the image container.
        getImageOfTheDay(date);
    });
};

saveSearch();
//==================================================== End Of saveSearch Function ================================================ //

//=================================================== getCurrentImageOfTheDay Function ======================================================//
function getCurrentImageOfTheDay() {
    //get the today date date automatically before mentioning any specific date in date input field 
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
};

getCurrentImageOfTheDay();
//=================================================== End Of getCurrentImageOfTheDay Function ======================================================//

//=================================================== getImageOfTheDay Function ======================================================//
function getImageOfTheDay(dateStore) {
    //fetching the date from api and add some specific data related to apikey and specific date.
    fetch(`https://api.nasa.gov/planetary/apod?date=${dateStore}&api_key=${apiKeypoint}`)
    .then((response) => response.json())
    .then((data) => {     
        imageData.innerHTML = 
            `
                <img src="${data.url}" alt="${data.title}">
                <h3>${data.title}</h3>
                <p>${data.explanation}</p>
            `;
        });
};

getImageOfTheDay(dateStore);
//=================================================== End Of getImageOfTheDay Function ======================================================//

//=================================================== addSearchToHistory Function ======================================================//
//1.get the data from local storage where we stored the data in object name of dataStore.
//2.create a listItem "li" inside the "ul" and add the local storage data inside the "li".
//3.by clicking the date which is added in the "ul" accroding to that date the data and image shown in the image-data. 
function addSearchToHistory() {
    //get the data from local storage where we stored the data in object name of dataStore.
    let dateStore = JSON.parse(localStorage.getItem("dateStore") || "[]");

    output.innerHTML = "";
    for (let i=0; i<dateStore.length; i++) 
    {
        //create a listItem "li" inside the "ul" and add the local storage data inside the "li".
        const listItem = document.createElement("li");
        listItem.textContent = dateStore[i];
        //by clicking the date which is added in the "ul" accroding to that date the data and image shown in the image-data. 
        listItem.addEventListener("click", () => {
            getImageOfTheDay(dateStore[i]);
          });
        output.appendChild(listItem);
      }
};

addSearchToHistory();
//=================================================== End Of addSearchToHistory Function ======================================================//
