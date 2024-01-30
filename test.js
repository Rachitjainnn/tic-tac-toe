let player = null;
let comp = null;
let current = null;
let flag = 0;
let spaces = Array(9).fill(null);
let empArr = [];
const x = "X"
const o = "O"
const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

$("#X").click(function () {
    player = x;
    comp = o;
    current = player;
    starting()
})
$("#O").click(function () {
    player = o;
    comp = x;
    current = comp;
    starting()

})
$("#restart").click(function () {
window.location.reload();
})


function starting() {
    $(".select-box").hide();
    $(".play-area").show();
    startGame();
}


function playerHasWon(winner) {
    for (const keys of winningComb) {
        let [a, b, c] = keys;
        let name = spaces.includes(null);
        if (spaces[a] === winner && spaces[b] === winner && spaces[c] === winner) {
            $(".play-area").hide();
            $(".result-box").show();
            $(".who-won").text("Player " + winner + " has won!")
            flag = 1;
            break;
        }
        else if (!name) {
            $(".play-area").hide();
            $(".result-box").show();
            $(".who-won").text("Draw Match");
            break;
        }
        else {
            flag = 0;

        }
    }
}

function isEmp(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (!arr[i]) {
            empArr.push(i);
        }
    }

}

function easyCompClicked() {

    isEmp(spaces);
    if (empArr.length === 0) {
        $(".play-area").hide();
        $(".result-box").show();
        $(".who-won").text("Draw Match");
    }
    if (!spaces[empArr[0]]) {
        spaces[empArr[0]] = comp;
        $("#" + empArr[0]).text(comp);
        playerHasWon(current);

        if (flag === 0) {
            empArr = [];
            current = current == comp ? player : comp;
        }
    }


}

function boxClicked() {
    const id = $(this).attr("id");

    if (!spaces[id]) {
        spaces[id] = player;
        $(this).text(player);
        playerHasWon(current);

        if (flag === 0) {
            current = current == player ? comp : player;
            setTimeout(function () {
                easyCompClicked();
            }, 50);
        }
    }


}

function startGame() {

    if (player === x) {
        $(".cell").click(boxClicked);

    }
    else {
        setTimeout(function () {
            easyCompClicked();
        }, 50);
        $(".cell").click(boxClicked);
    }

}








