document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')

    addToDogBar()

    function renderPup(pup){
        dogInfo.innerHTML = `
        <img src="${pup.image}"</img>
        <h2>${pup.name}</h2>
        <button id="goodDogButton">${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
        `
        const goodDogButton = document.getElementById('goodDogButton')
        goodDogButton.addEventListener('click', () => {
            toggleGoodness(pup, goodDogButton)
        })
    }

    function toggleGoodness(pup, button) {
            pup.isGoodDog = !pup.isGoodDog
            button.innerText = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
            fetch(`http://localhost:3000/pups/${pup.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    isGoodDog:pup.isGoodDog
                })
            })
    }
    

    function addToDogBar() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(pupData => {
        pupData.forEach(pup => {
            const pupSpan = document.createElement('span')
            pupSpan.innerText = pup.name

            pupSpan.addEventListener('click', () => {
                console.log(pup)
                renderPup(pup)
            })

            dogBar.appendChild(pupSpan)
        })
    })
    }
})