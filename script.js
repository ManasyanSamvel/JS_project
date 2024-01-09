var socket = io()
let side = 30
let myChart

function setup() {
        createCanvas(30 * side, 30 * side)
        background("grey")







        
        const data = {
                labels: [
                        'Grass',
                        'GrassEater',
                        'Predator',
                        'Dog',
                        'Deminer',
                        'Tnt'
                ],
                datasets: [{
                        label: 'Chart of game',
                        data: [15, 15, 15, 15, 15, 15],
                        backgroundColor: [
                                'rgb(128, 255, 0',
                                'rgb(165, 41, 41)',
                                'rgb(60, 60, 60)',
                                'rgb(238, 207, 34)',
                                'rgb(171, 203, 255)',
                                'rgb(224, 224, 224)',
                        ],
                        hoverOffset: 5
                }]
        };
        const config = {
                type: 'doughnut',
                data: data,
                options: {
                        plugins: {
                                legend: {
                                        display: true,
                                        labels: {
                                                color: '#fff'
                                        }
                                }
                        }
                }
        };
        myChart = new Chart(
                document.getElementById('myChart'),
                config

        );







}


socket.on("Winter", function (data) {
        weather = data;
})
socket.on("Summer", function (data) {
        weather = data;
})
socket.on("Spring", function (data) {
        weather = data;
})
socket.on("Autumn", function (data) {
        weather = data;
})
var weather = "spring"

socket.on ("send datas", function(counts){
        myChart.data.datasets[0].data = [counts.grass, counts.grassEater, counts.predator, counts.dog, counts.deminer, counts.tnt];
        myChart.update();
})

function drawCreature(matrix) {
        for (let y = 0; y < matrix.length; y++) {
                for (let x = 0; x < matrix[y].length; x++) {
                        var toBot = side - side * 0.2
                        textSize(toBot);
                        if (matrix[y][x] == 1) {
                                if (weather == "spring") {
                                        fill("green");
                                        rect(x * side, y * side, side, side);
                                        text('🌿', x * side, y * side + toBot);
                                } else if (weather == "summer") {
                                        fill("darkgreen");
                                        rect(x * side, y * side, side, side);
                                        text('☘️', x * side, y * side + toBot);
                                } else if (weather == "autumn") {
                                        fill("yellow");
                                        rect(x * side, y * side, side, side);
                                        text('🍁', x * side, y * side + toBot);
                                } else if (weather == "winter") {
                                        fill("rgb(0, 123, 255)");
                                        rect(x * side, y * side, side, side);
                                        text('❄️', x * side, y * side + toBot);
                                }

                        } else if (matrix[y][x] == 2) {
                                if (weather == "spring" || weather == "autumn" || weather == "summer") {
                                        fill("brown")
                                        rect(x * side, y * side, side, side);
                                        text('🐂', x * side, y * side + toBot);
                                } else if (weather == "winter") {
                                        fill("#b1b4b5")
                                        rect(x * side, y * side, side, side);
                                        text('🐄', x * side, y * side + toBot);
                                }
                        } else if (matrix[y][x] == 3) {
                                fill("yellow")
                                rect(x * side, y * side, side, side);
                                text('🐕', x * side, y * side + toBot);
                        }
                        else if (matrix[y][x] == 4) {
                                if (weather == "spring" || weather == "autumn" || weather == "summer") {
                                        fill("black")
                                        rect(x * side, y * side, side, side);
                                        text('🐉', x * side, y * side + toBot);
                                } else if (weather == "winter") {
                                        fill("rgb(131, 175, 223)")
                                        rect(x * side, y * side, side, side);
                                        text('🐲', x * side, y * side + toBot);
                                }

                        }
                        else if (matrix[y][x] == 5) {
                                fill("white")
                                rect(x * side, y * side, side, side);
                                text('💣', x * side, y * side + toBot);
                        }
                        else if (matrix[y][x] == 6) {
                                fill("#abcbff")
                                rect(x * side, y * side, side, side);
                                text('👷‍♂️', x * side, y * side + toBot);
                        }

                        else {
                                if (weather == "spring") {
                                        fill("#86f777");
                                        rect(x * side, y * side, side, side);
                                } else if (weather == "summer") {
                                        fill("#ffffab");
                                        rect(x * side, y * side, side, side);
                                } else if (weather == "autumn") {
                                        fill("#f5882f");
                                        rect(x * side, y * side, side, side);
                                } else if (weather == "winter") {
                                        fill("#56c9fc");
                                        rect(x * side, y * side, side, side);
                                }
                        }

                }
        }




}
socket.on("send matrix", drawCreature)

function AddGrass() {
        socket.emit("addGrass")
}
function AddDog() {
        socket.emit("addDog")
}
function AddGrassEater() {
        socket.emit("addGrassEater")
}
function AddPredator() {
        socket.emit("addPredator")
}
function AddBomb() {
        socket.emit("addBomb")
}
function AddDeminer() {
        socket.emit("addDeminer")
}
function KillAll() {
        socket.emit("killAll")
}
function Spring() {
        socket.emit("spring")
        document.body.style.backgroundImage = "url('bgspring.jpg')";
}
function Summer() {
        socket.emit("summer")
        document.body.style.backgroundImage = "url('bgsummer.jpg')";
}
function Autumn() {
        socket.emit("autumn")
        document.body.style.backgroundImage = "url('bgautumn.jpg')";
}
function Winter() {
        socket.emit("winter")
        document.body.style.backgroundImage = "url('bgwinter.jpg')";
}
