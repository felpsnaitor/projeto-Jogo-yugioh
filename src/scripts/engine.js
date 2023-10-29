const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        socoreBox: document.getElementById("score-points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
    },
    actions: {
        button: document.getElementById("next-duel"),
    },

}
cont caminhoDaImagem = ".src/assets/icons/"
const cardData = [
    {
        id: 0,
        name: "Dragão Branco dos Olhos Azuis",
        type: "Papel",
        img: `${caminhoDaImagem}+dragon.png`,
        winOf: [1],
        loseOf: [2],

    },
    {
        id: 1,
        name: "Mago Negro",
        type: "Pedra",
        img: `${caminhoDaImagem}+magician.png`,
        winOf: [2],
        loseOf: [0],

    },
    {
        id: 2,
        name: "Exodia",
        type: "Tesoura",
        img: `${caminhoDaImagem}+exodia.png`,
        winOf: [0],
        loseOf: [1],

    },
]

function init(){

}

init()