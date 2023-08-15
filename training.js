document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.getElementById("dog-bar");
    const dogInfo = document.getElementById("dog-info");
    const filterButton = document.getElementById("good-dog-filter");
  
    let filterGoodDogs = false; // Flag to track filter state
  
    // Fetch data from API and populate the dog bar
    fetch("http://localhost:3000/pups")
      .then(response => response.json())
      .then(data => {
        data.forEach(dog => {
          const dogSpan = document.createElement("span");
          dogSpan.textContent = dog.name;
  
          dogSpan.addEventListener("click", () => {
            displayDogInfo(dog);
          });
  
          dogBar.appendChild(dogSpan);
        });
      });
  
    // Display detailed dog info in the dog info section
    function displayDogInfo(dog) {
      dogInfo.innerHTML = `
        <img src="${dog.image}" />
        <h2>${dog.name}</h2>
        <button id="good-dog-button">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
      `;
  
      const goodDogButton = document.getElementById("good-dog-button");
      goodDogButton.addEventListener("click", () => {
        toggleGoodness(dog);
      });
    }
  
    // Toggle the goodness status of a dog
    function toggleGoodness(dog) {
      dog.isGoodDog = !dog.isGoodDog;
  
      // Update the button text
      const goodDogButton = document.getElementById("good-dog-button");
      goodDogButton.textContent = dog.isGoodDog ? "Good Dog!" : "Bad Dog!";
  
      // Update the dog's goodness status in the database (API)
      fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isGoodDog: dog.isGoodDog
        })
      });
    }
  
    // Toggle the filter for displaying good dogs
    filterButton.addEventListener("click", () => {
      filterGoodDogs = !filterGoodDogs;
      filterButton.textContent = `Filter good dogs: ${filterGoodDogs ? "ON" : "OFF"}`;
  
      // Clear the dog bar and re-populate based on filter
      dogBar.innerHTML = "";
      fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(data => {
          data.forEach(dog => {
            if (!filterGoodDogs || dog.isGoodDog) {
              const dogSpan = document.createElement("span");
              dogSpan.textContent = dog.name;
  
              dogSpan.addEventListener("click", () => {
                displayDogInfo(dog);
              });
  
              dogBar.appendChild(dogSpan);
            }
          });
        });
    });
  });
  