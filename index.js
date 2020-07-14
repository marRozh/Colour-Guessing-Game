let colorsSet = [];
let selectedCards = 0;
let clickedOn = [];
let currentMode = 'difficultmode';
let cardIdsDifficult = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6'];
let cardIdsEasy = ['card1', 'card2', 'card3'];

// ************************************   HELPER FUNCTIONS  ************************************

// GENERATE RANDOM RGB COLOR
let getRandomColour = () => {
    let r = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    let g = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    let b = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
    rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
};

// FUNCTION TO SHUFFLE ARRAYS
let shuffle = (arr) => {
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
    return arr;
};

// FUNCTION TO RANDOMLY SHUFFLE AN ARRAY AND ASSIGN COLOURS TO DIFFERENT CARDS
let assignColours = (arr, arr2) => {
    
    console.log(`colors array before: ${arr2}`);
    let newColoursSet = shuffle(arr2);
    console.log(`colors array after: ${newColoursSet}`);

    for(let i = 0; i < arr.length; i++) {
        document.getElementById(arr[i]).style.backgroundColor = newColoursSet[i];
        document.getElementById(arr[i]).value = newColoursSet[i];
    };

};

// FUNCTION TO CHECK VALUE THAT IS LEFT OUT OF THE ARRAY
let checkLeftColour = (arr1, arr2) => {
    let notIncluded;
    for(let i = 0; i < arr1.length; i++) {
        if(arr2.includes(arr1[i]) == true) {
            console.log(`included: ${notIncluded}`);
        } else {
            notIncluded = arr1[i];
            console.log(`not included: ${notIncluded}`);
        };
    };
    return notIncluded;
};

let playEasyGame = () => {
    currentMode = 'easymode';
    console.log(`GAME MODE: ${currentMode}`);

    document.getElementById('difficultmode').style.backgroundColor = 'white';
    document.getElementById('easymode').style.backgroundColor = '#7EA8BE';
    
    document.getElementById('card4').style.backgroundColor = '#F6F0ED';
    document.getElementById('card4').style.cursor = 'default';
    document.getElementById('card4').style.pointerEvents = 'none';
    document.getElementById('card5').style.backgroundColor = '#F6F0ED';
    document.getElementById('card5').style.cursor = 'default';
    document.getElementById('card5').style.pointerEvents = 'none';
    document.getElementById('card6').style.backgroundColor = '#F6F0ED';
    document.getElementById('card6').style.cursor = 'default';
    document.getElementById('card6').style.pointerEvents = 'none';
    
    colorsSet = [];
    // GENERATE RANDOM CORRECT 
    let correctColor = getRandomColour();
    console.log(`correct color: ${correctColor}`);
    colorsSet.push(correctColor);
    
    // SET HEADING TEXT TO RGB VALUE
    document.getElementById('rgbcode').innerHTML = correctColor.toUpperCase();

    // GENERATE OTHER 2 IN EASY MODE
    let createIncorrectColours = () => {
        for(let i = 0; i < 2; i++) {
            let color = getRandomColour();
            colorsSet.push(color);
        };
    };
    
    createIncorrectColours();
    colorsSet.forEach(item => console.log(`easy mode: ${item}`));

    // ASSIGN ALL COLOURS TO RANDOM SQUARES
    assignColours(cardIdsEasy, colorsSet);

    document.querySelectorAll('.card').forEach(function(card) {
        card.onclick = function() {
            selectedCards++;
            console.log(`easy mode selected cards: ${selectedCards}`);

            // if guessing first card
            if(selectedCards == 1) {
                let selectedColour = this.value;
                let selectedId = this.id;
                clickedOn.push(selectedId);

                // if clicked on wrong colour
                if(selectedColour != correctColor){
                    document.getElementById(selectedId).style.backgroundColor = '#F6F0ED';
                    document.getElementById(selectedId).style.cursor = 'default';
                    document.getElementById(selectedId).style.pointerEvents = 'none';

                // if clicked on correct colour  == game won
                } else {
                    document.getElementById(selectedId).style.cursor = 'default';
                    document.getElementById(selectedId).style.pointerEvents = 'none';
                    document.getElementById('success').style.display = 'inline';

                    // change background of header to correct colour:
                    document.querySelector('.header').style.backgroundColor = correctColor;

                    // change text to play again
                    document.getElementById('newcolors').style.display = 'none';
                    document.getElementById('playagain').style.display = 'inline';

                    for(let i = 0; i < cardIdsEasy.length; i++) {
                        if(selectedId != cardIdsEasy[i]){
                            document.getElementById(cardIdsEasy[i]).style.backgroundColor = correctColor;
                            document.getElementById(cardIdsEasy[i]).style.cursor = 'default';
                            document.getElementById(cardIdsEasy[i]).style.pointerEvents = 'none';
                        };
                    };
                };
            // if clicked on previous to last card on screen
            } else if(selectedCards == 2) {
                let selectedColour = this.value;
                let selectedId = this.id;
                clickedOn.push(selectedId);

                let lastColour = checkLeftColour(cardIdsEasy, clickedOn);

                //if clicked card is wrong == game lost
                if(selectedColour != correctColor){
                    document.getElementById(selectedId).style.backgroundColor = '#F6F0ED';
                    document.getElementById(selectedId).style.cursor = 'default';
                    document.getElementById(selectedId).style.pointerEvents = 'none';
                    document.getElementById('tryagain').style.display = 'inline';

                    // change text to play again
                    document.getElementById('newcolors').style.display = 'none';
                    document.getElementById('playagain').style.display = 'inline';

                    document.getElementById(lastColour).style.cursor = 'default';
                    document.getElementById(lastColour).style.pointerEvents = 'none';
                //if clicked card is right == game won
                } else {
                    document.getElementById(selectedId).style.cursor = 'default';
                    document.getElementById(selectedId).style.pointerEvents = 'none';
                    document.getElementById('success').style.display = 'inline';

                    // change background of header to correct colour:
                    document.querySelector('.header').style.backgroundColor = correctColor;

                    // change text to play again
                    document.getElementById('newcolors').style.display = 'none';
                    document.getElementById('playagain').style.display = 'inline';

                    document.getElementById(lastColour).style.cursor = 'default';
                    document.getElementById(lastColour).style.pointerEvents = 'none';
                    for(let i = 0; i < cardIdsEasy.length; i++) {
                        if(selectedId != cardIdsEasy[i]){
                            document.getElementById(cardIdsEasy[i]).style.backgroundColor = correctColor;
                            document.getElementById(cardIdsEasy[i]).style.cursor = 'default';
                            document.getElementById(cardIdsEasy[i]).style.pointerEvents = 'none';
                        };
                    };
                };
            };
        };
    });
};

let playDifficultGame = () => {
    currentMode = 'difficultmode';
    console.log(`GAME MODE: ${currentMode}`);

    document.getElementById('easymode').style.backgroundColor = 'white';
    document.getElementById('difficultmode').style.backgroundColor = '#7EA8BE';
    
    document.getElementById('card4').style.cursor = 'pointer';
    document.getElementById('card4').style.pointerEvents = 'auto';
    document.getElementById('card5').style.cursor = 'pointer';
    document.getElementById('card5').style.pointerEvents = 'auto';
    document.getElementById('card6').style.cursor = 'pointer';
    document.getElementById('card6').style.pointerEvents = 'auto';

    colorsSet = [];

    // GENERATE RANDOM CORRECT 
    let correctColor = getRandomColour();
    console.log(`correct color: ${correctColor}`);
    colorsSet.push(correctColor);

    // SET HEADING TEXT TO RGB VALUE
    document.getElementById('rgbcode').innerHTML = correctColor.toUpperCase();

    // GENERATE OTHER 5 RANDOM COLORS IN HARD MODE 
    let createIncorrectColours = () => {
        for(let i = 0; i < 5; i++) {
            let color = getRandomColour();
            colorsSet.push(color);
        };
    };

    createIncorrectColours();
    colorsSet.forEach(item => console.log(item));

    // ASSIGN ALL COLOURS TO RANDOM SQUARES
    assignColours(cardIdsDifficult, colorsSet);

    document.querySelectorAll('.card').forEach(function(card) {
        card.onclick = function() {
            selectedCards++;

            // if guessing first 4 cards
            if(selectedCards < 5) {
                let selectedColour = this.value;
                let selectedId = this.id;
                clickedOn.push(selectedId);

                // if clicked on wrong colour
                if(selectedColour != correctColor){
                    document.getElementById(selectedId).style.backgroundColor = '#F6F0ED';
                    document.getElementById(selectedId).style.cursor = 'default';
                    document.getElementById(selectedId).style.pointerEvents = 'none';

                // if clicked on correct colour  == game won
                } else {
                    document.getElementById(selectedId).style.cursor = 'default';
                    document.getElementById(selectedId).style.pointerEvents = 'none';
                    document.getElementById('success').style.display = 'inline';

                    // change background of header to correct colour:
                    document.querySelector('.header').style.backgroundColor = correctColor;

                    // change text to play again
                    document.getElementById('newcolors').style.display = 'none';
                    document.getElementById('playagain').style.display = 'inline';

                    for(let i = 0; i < cardIdsDifficult.length; i++) {
                        if(selectedId != cardIdsDifficult[i]){
                            document.getElementById(cardIdsDifficult[i]).style.backgroundColor = correctColor;
                            document.getElementById(cardIdsDifficult[i]).style.cursor = 'default';
                            document.getElementById(cardIdsDifficult[i]).style.pointerEvents = 'none';
                        };
                    };
                };
            // if clicked on previous to last card on screen
            } else if(selectedCards == 5) {
                let selectedColour = this.value;
                let selectedId = this.id;
                clickedOn.push(selectedId);

                let lastColour = checkLeftColour(cardIdsDifficult, clickedOn);

                //if clicked card is wrong == game lost
                if(selectedColour != correctColor){
                    document.getElementById(selectedId).style.backgroundColor = '#F6F0ED';
                    document.getElementById(selectedId).style.cursor = 'default';
                    document.getElementById(selectedId).style.pointerEvents = 'none';
                    document.getElementById('tryagain').style.display = 'inline';

                    // change text to play again
                    document.getElementById('newcolors').style.display = 'none';
                    document.getElementById('playagain').style.display = 'inline';

                    document.getElementById(lastColour).style.cursor = 'default';
                    document.getElementById(lastColour).style.pointerEvents = 'none';
                //if clicked card is right == game won
                } else {
                    document.getElementById(selectedId).style.cursor = 'default';
                    document.getElementById(selectedId).style.pointerEvents = 'none';
                    document.getElementById('success').style.display = 'inline';

                    // change background of header to correct colour:
                    document.querySelector('.header').style.backgroundColor = correctColor;

                    // change text to play again
                    document.getElementById('newcolors').style.display = 'none';
                    document.getElementById('playagain').style.display = 'inline';

                    document.getElementById(lastColour).style.cursor = 'default';
                    document.getElementById(lastColour).style.pointerEvents = 'none';
                    for(let i = 0; i < cardIdsDifficult.length; i++) {
                        if(selectedId != cardIdsDifficult[i]){
                            document.getElementById(cardIdsDifficult[i]).style.backgroundColor = correctColor;
                            document.getElementById(cardIdsDifficult[i]).style.cursor = 'default';
                            document.getElementById(cardIdsDifficult[i]).style.pointerEvents = 'none';
                        };
                    };
                };
            };
        };
    });
};

let resetAll = (cardsArr) => {
    for(let i = 0; i < cardsArr.length; i++) {
        document.getElementById(cardsArr[i]).style.cursor = 'pointer';
        document.getElementById(cardsArr[i]).style.pointerEvents = 'auto';
    };
    document.getElementById('playagain').style.display = 'none';
    document.getElementById('newcolors').style.display = 'inline';
    document.getElementById('tryagain').style.display = 'none';
    document.getElementById('success').style.display = 'none';
    selectedCards = 0;
    clickedOn = [];
    document.querySelector('.header').style.backgroundColor = '#7EA8BE';
};


// ************************************   HELPER FUNCTIONS  ************************************



// DEFAULT MODE - DIFFICULT MODE

if(currentMode == 'difficultmode') {
    resetAll(cardIdsDifficult);
    playDifficultGame();

    document.getElementById('newcolors').onclick = () => {
        resetAll(cardIdsDifficult);
        playDifficultGame();
    };
    document.getElementById('playagain').onclick = () => {
        resetAll(cardIdsDifficult);
        playDifficultGame();
    };
} else if(currentMode == 'easymode') {
resetAll(cardIdsEasy);
    playEasyGame();

    document.getElementById('newcolors').onclick = () => {
        resetAll(cardIdsEasy);
        playEasyGame();
    };
    document.getElementById('playagain').onclick = () => {
        resetAll(cardIdsEasy);
        playEasyGame();
    };
};

// SWITCH TO EASY MODE 

document.getElementById('easymode').onclick = () => {
resetAll(cardIdsEasy);
    playEasyGame();

    document.getElementById('newcolors').onclick = () => {
        resetAll(cardIdsEasy);
        playEasyGame();
    };
    document.getElementById('playagain').onclick = () => {
        resetAll(cardIdsEasy);
        playEasyGame();
    };
};
document.getElementById('difficultmode').onclick = () => {
resetAll(cardIdsDifficult);
    playDifficultGame();

    document.getElementById('newcolors').onclick = () => {
        resetAll(cardIdsDifficult);
        playDifficultGame();
    };
    document.getElementById('playagain').onclick = () => {
        resetAll(cardIdsDifficult);
        playDifficultGame();
    };
};


