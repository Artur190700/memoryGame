let size = {
    width: 6,
    height: 6,
    fontSize: "60px"
}
const sizeConfigs = [
    { width: 4, height: 3, fontSize: "80px" },
    { width: 4, height: 4, fontSize: "80px" },
    { width: 5, height: 4, fontSize: "70px" },
    { width: 6, height: 4, fontSize: "68px" },
    { width: 6, height: 5, fontSize: "68px" },
    { width: 6, height: 6, fontSize: "60px" },
    { width: 7, height: 6, fontSize: "55px" }];
let id = 1;
let wonCell = false;
let cellId = 1;
let sum = 0;
let acc = 0;
let picturesNumbers = [];
let clicked = true;
let emojis = [
    { img: "🍏", imgNumber: 1 },
    { img: "🍋", imgNumber: 2 },
    { img: "🍇", imgNumber: 3 },
    { img: "🥝", imgNumber: 4 },
    { img: "🥑", imgNumber: 5 },
    { img: "🌮", imgNumber: 6 },
    { img: "🌭", imgNumber: 7 },
    { img: "🧁", imgNumber: 8 },
    { img: "🍰", imgNumber: 9 },
    { img: "🍺", imgNumber: 10 },
    { img: "🎮", imgNumber: 11 },
    { img: "🎲", imgNumber: 12 },
    { img: "🗿", imgNumber: 13 },
    { img: "🛸", imgNumber: 14 },
    { img: "💻", imgNumber: 15 },
    { img: "🧬", imgNumber: 16 },
    { img: "❤️", imgNumber: 17 },
    { img: "💃", imgNumber: 18 },
    { img: "💩", imgNumber: 19 },
    { img: "👽", imgNumber: 20 },
    { img: "🤖", imgNumber: 21 },
    { img: "🎩", imgNumber: 22 },
    { img: "🥷🏻", imgNumber: 23 },
    { img: "🧔🏿‍♂️", imgNumber: 24 },
    { img: "🐨", imgNumber: 25 },
    { img: "🏀", imgNumber: 26 },
    { img: "🚕", imgNumber: 27 },
    { img: "🎵", imgNumber: 28 },
    { img: "🌄", imgNumber: 29 },
    { img: "🛬", imgNumber: 30 },
    { img: "🌃", imgNumber: 31 },
    { img: "⚗️", imgNumber: 32 },
    { img: "🌍", imgNumber: 33 },
    { img: "🚀", imgNumber: 34 },
    { img: "🌎", imgNumber: 35 },
    { img: "🏰", imgNumber: 36 },
    { img: "💵", imgNumber: 37 },
    { img: "📱", imgNumber: 38 },
    { img: "🏅", imgNumber: 39 },
    { img: "🐷", imgNumber: 40 },
    { img: "🍀", imgNumber: 41 },
    { img: "🍫", imgNumber: 42 },

];

function start() {
    id = 1;
    let board = document.getElementById('square');
    sum = 0;
    let haveIt = [];
    for (let g = 0; g < size.width * size.height / 2; g++) {
        let random = Math.floor(Math.random() * emojis.length);
        if (!haveIt.includes(random)) {
            haveIt.push(random);
            haveIt.push(random);
        } else {
            g--
        }
    }
    haveIt = shuffleArray(haveIt);
    // console.log(haveIt);
    // let newHaveIt = haveIt.filter(x => x == +x);
    // newHaveIt = shuffleArray(newHaveIt);
    for (let i = 0; i < size.height; i++) {
        let columns = document.createElement("div");
        // columns.classList.add("row");
        // board.appendChild(columns);
        columns.id = "row" + id;
        for (let j = 0; j < size.width; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            board.appendChild(cell);
            cell.id = cellId;
            cell.style.fontSize = size.fontSize;
            let text = '1fr '
            let gridTemplateColumns = text.repeat(size.width);
            document.getElementById("square").style.gridTemplateColumns = gridTemplateColumns;


            // let random = Math.floor(Math.random() * emojis.length);`
            // console.log(newHaveIt);
            let img = emojis[haveIt[sum]];

            cell.addEventListener("click", (e) => {

                if (clicked) {
                    timeStart();
                    document.getElementById("top").style.visibility = "visible";
                    document.getElementById('moves').innerHTML = ++acc + " " + "Moves";
                    cell.style.backgroundColor = 'white';
                    cell.innerHTML = img.img;
                    // console.log(haveIt);
                    let selected = e.target;
                    if (e.target) {
                        if (!picturesNumbers.includes(selected)) {
                            picturesNumbers.push(selected);
                            console.log(picturesNumbers)
                        }
                    }
                    if (picturesNumbers.length >= 2) {
                        if (picturesNumbers[0].innerHTML === picturesNumbers[1].innerHTML) {
                            document.getElementById(picturesNumbers[0].id).classList.add('cellMatched');
                            document.getElementById(picturesNumbers[0].id).type = "true"
                            document.getElementById(picturesNumbers[1].id).classList.add('cellMatched');
                            document.getElementById(picturesNumbers[1].id).type = "true"
                            checkGameEnd();
                            picturesNumbers = [];

                        } else {
                            clicked = false;

                            setTimeout(callBack, 1000);

                        }
                    }

                }
            })



            cellId = cellId + 1;
            sum = sum + 1;
        }
        id = id + 1;

        let allCell = document.querySelectorAll(".cell");
        for (let id = 0; id < allCell.length; id++) {
            const element = allCell[id];
            let height = getComputedStyle(element);
            element.style.height += height.width;

        }


    }
    let bottomDiv = document.getElementById('configDiv');
    bottomDiv.innerHTML = '';

    for (let i = 0; i < sizeConfigs.length; i++) {
        const sizeConfig = sizeConfigs[i];
        let button = document.createElement('button');
        button.classList.add("button-56")
        button.innerHTML = sizeConfig.width + "x" + sizeConfig.height
        bottomDiv.appendChild(button);
        button.onclick = function () { onResizeClick(sizeConfig) };


    }

}
start();
function reload() {
    document.getElementById('square').innerHTML = '';
    acc = 0;
    document.getElementById('moves').innerHTML = acc + " " + "Moves";
    sum = 0;
    document.getElementById("end").style.visibility = 'hidden'


    start();
    timeReset();
    timePaused();
}
function generateUniqueRandom(maxNr) {
    //Generate random number
    let random = (Math.random() * maxNr).toFixed();

    //Coerce to number by boxing
    random = Number(random);

    if (!haveIt.includes(random)) {
        haveIt.push(random);
        return random;
    } else {
        if (haveIt.length < maxNr) {
            //Recursively generate number
            return generateUniqueRandom(maxNr);
        } else {
            console.log('No more numbers available.')
            // return false;
        }
    }
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number 
        var j = Math.floor(Math.random() * (i + 1));

        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function callBack() {
    document.getElementById(picturesNumbers[0].id).innerHTML = '';
    document.getElementById(picturesNumbers[1].id).innerHTML = '';
    document.getElementById(picturesNumbers[0].id).style.backgroundColor = "";
    document.getElementById(picturesNumbers[1].id).style.backgroundColor = "";
    picturesNumbers = [];
    clicked = true;
    id = 1;
}
function checkGameEnd() {
    let acc = 0;
    let allCell = document.querySelectorAll(".cell");
    for (let i = 0; i < allCell.length; i++) {
        const element = allCell[i];
        if (element.type == "true") {
            acc++;
            if (acc == allCell.length) {

                timePaused();
                document.getElementById("end").style.visibility = 'visible'
            }
        }

    }
}
function timeReset() {
    setInterval(timer)
    millisecound = 0;
    watch.innerHTML = "00:00:00:00";
}
function onResizeClick(config) {
    document.getElementById("square").innerHTML = '';
    size.width = config.width;
    size.height = config.height;
    // auto.slice(" ");
    let gridTemplateColumns = '';
    let text = '1fr '

    gridTemplateColumns = text.repeat(config.width);
    cellId = 1;
    id = 1;
    // console.log(gridTemplateColumns);
    document.getElementById("square").style.gridTemplateColumns = gridTemplateColumns;

    timeReset();
    timePaused();
    acc = 0;
    document.getElementById('moves').innerHTML = acc + " " + "Moves";
    start();
    let allCell = document.querySelectorAll(".cell");
    for (let id = 0; id < allCell.length; id++) {
        const element = allCell[id];
        element.style.fontSize = config.fontSize;

    }
}