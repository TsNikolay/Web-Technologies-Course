// Select main DOM elements for the game interface
const gameContainer = document.querySelector(".game-container");  
const scoreElement = document.querySelector(".score");            
const triesElement = document.querySelector(".tries");            
const winMessage = document.querySelector(".win-message");        

// Function to start or restart the game with a given number of cells
function gameRestart(numberOfCells) {
    if(numberOfCells % 2 !== 0) return // If the number of cells is odd, exit the function, as not all cells will have pairs.

    clearDOM();                                // Clear the game container of previous cells
    winMessage.style.visibility = "hidden";    // Hide the win message if visible
    const numbers = fillArrayWithDigits(numberOfCells);  // Generate random pairs of numbers
    fillGameDOM(numbers);                      // Populate the game grid with generated numbers
    runGame(numberOfCells);                    // Initialize game logic and interactivity
}

// Function to clear all elements from the game container
function clearDOM() {
    gameContainer.innerHTML = "";              
}

// Function to create an array of paired digits randomly placed within a given number of cells
function fillArrayWithDigits(numberOfCells) {
    const numbers = new Array(numberOfCells).fill(undefined);  
    const numberOfUniqueDigits = numbers.length / 2;           

    // Place each digit twice at random indices in the array to create pairs
    for (let digit = 1; digit <= numberOfUniqueDigits; digit++) {      
        numbers[findRandomEmptyIndex(numbers)] = digit;
        numbers[findRandomEmptyIndex(numbers)] = digit;
    }
    return numbers;
}

// Helper function to find a random empty index in the array
function findRandomEmptyIndex(numbers) {
    let index;
    do {
        index = Math.floor(Math.random() * numbers.length);  
    } while (numbers[index] != undefined);                   
    return index;                                            
}

// Function to populate the game grid in the DOM with cells containing each number
function fillGameDOM(numbers) {
    numbers.forEach(digit => {
        const div = document.createElement("div");   
        const h1 = document.createElement("h1");     

        h1.textContent = digit;                      
        h1.classList.add("digit");                   
        div.appendChild(h1);                         
        div.classList.add("cell");                   
        gameContainer.appendChild(div);              
    });
}

// Main function to handle game logic (click events, matching, and score updates)
function runGame(numberOfCells) {
    let revealedNumber1, revealedNumber2;    // Stores numbers of the two revealed cells
    let revealedCell1, revealedCell2;        // Stores references to the two revealed cells
    let isClickAllowed = true;               // Controls if clicks are currently allowed
    let tries = 0;                           
    let score = 0;                           

    updateScore();                           // Initialize the score display
    updateTries();                           // Initialize the tries display

    const cellsList = gameContainer.childNodes;  // List of all cell elements in the grid

    // Add a click event listener to each cell
    cellsList.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });

    // Function to handle clicks on cells
    function handleClick(event) {
        const cell = event.currentTarget;     

        // Ignore click if action is not allowed now, cell is already matched, or it’s the same cell
        if (!isClickAllowed || cell.style.background === "green" || cell === revealedCell1) return;
                    
        cell.firstChild.style.visibility = "visible";   // Show the cell's number
        cell.style.background = "lightblue";            // Highlight cell 

        // Store the revealed number and cell references for the first and second clicks
        if (revealedNumber1 === undefined) {
            revealedNumber1 = cell.textContent;
            revealedCell1 = cell;
        } else if (revealedNumber2 === undefined) {
            revealedNumber2 = cell.textContent;
            revealedCell2 = cell;
        } 

        // If both cells are not yet revealed, do nothing further
        if (!revealedNumber1 || !revealedNumber2) return;

        isClickAllowed = false;   // Temporarily disallow clicks during the match check. So that while two cells are open on the screen, you can't click on other cells

        // Check if the two revealed numbers match
        if (revealedNumber1 === revealedNumber2) {
            fixCell(revealedCell1);  // Mark cells as matched
            fixCell(revealedCell2);  
            revealedNumber1 = undefined; // Reset revealed numbers 
            revealedNumber2 = undefined;
            isClickAllowed = true;  // Allow clicks again
            tries++;                
            score++;                
            updateScore();             
        } else {
            // If no match, hide cells after a delay (1 second), so the player can remember the digits
            setTimeout(() => {
                hideCell(revealedCell1);
                hideCell(revealedCell2);
                isClickAllowed = true;  // Allow clicks again after hiding cells
            }, 1000);

            revealedNumber1 = undefined;  // Reset revealed numbers 
            revealedNumber2 = undefined;
            tries++;               
        }   

        updateTries();             
        checkWinCondition();       
    }

    // Function to check if all pairs are matched (win condition)
    function checkWinCondition() {
        if (score === numberOfCells / 2) {   
            winMessage.style.visibility = "visible";  
        }
    }

    // Function to update the score display
    function updateScore() {
        scoreElement.textContent = `Score: ${score} |`; 
    }
    
    // Function to update the tries display
    function updateTries() {
        triesElement.textContent = `Tries: ${tries}`;    
    }

    // Function to hide a cell's number and reset its background
    function hideCell(cell) {
        cell.firstChild.style.visibility = "hidden";     
        cell.style.background = "#455be8d7";             
    }

    // Function to mark a cell as matched (fix its state)
    function fixCell(cell) {
        cell.style.background = "green";                 
        cell.removeEventListener("click", handleClick);  // Remove click event listener for matched cell
    } 
}

// Start the game with 20 cells (10 pairs)
gameRestart(20);
