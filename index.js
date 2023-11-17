const ROW = 4;
const COLUMN = 60;
const EMPTY = ' ';
const DELAY = 90;
const GOAL_TIME = 1900;
const goal = [
    " ____   _  _____  _    _  ____ ___                             ",
    "|  _ \\ / \\|_   _|/ \\  | ||_  /|  _]                            ",
    "| |_) / _ \\ | | / _ \\ | | / /_|  _]                            ",
    "|____/_/ \\_\\|_|/_/ \\_\\|_|/____|___]                            "
];

let values = Array.from({ length: ROW }, () => 
    Array.from({ length: COLUMN }, () => EMPTY.charCodeAt(0)));

function addValues() {
    let isComplete = true;
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COLUMN; c++) {
            let goalValue = goal[r][c].charCodeAt(0);
            let currentValue = values[r][c];

            if (currentValue != goalValue) {
                isComplete = false;
                currentValue += getIncrementToGoalPerEachRepeat(goalValue);
                if (currentValue > goalValue) {
                    currentValue = goalValue;
                }
                values[r][c] = currentValue;
            }
        }
    }
    return isComplete;
}

function print() {
    const asciiAnimationElement = document.getElementById('asciiAnimation');
    asciiAnimationElement.textContent = values.map(string => string.map(value => String.fromCharCode(value)))
            .map(row => row.join(''))
            .join('\n');
}

function getIncrementToGoalPerEachRepeat(value) {
    return (value - EMPTY.charCodeAt(0)) * DELAY / GOAL_TIME;
}

let intervalId = setInterval(() => {
    let isComplete = addValues();
    print();
    if (isComplete) {
        clearInterval(intervalId);
        
    }
}, DELAY);
