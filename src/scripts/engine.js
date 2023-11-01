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
const caminhoDaImagem = "./src/assets/icons/"
const cardData = [
    {
        id: 0,
        name: "Dragão Branco dos Olhos Azuis",
        type: "Papel",
        img: `${caminhoDaImagem}dragon.png`,
        winOf: [1],
        loseOf: [2],

    },
    {
        id: 1,
        name: "Mago Negro",
        type: "Pedra",
        img: `${caminhoDaImagem}magician.png`,
        winOf: [2],
        loseOf: [0],

    },
    {
        id: 2,
        name: "Exodia",
        type: "Tesoura",
        img: `${caminhoDaImagem}exodia.png`,
        winOf: [0],
        loseOf: [1],

    },
]

const playerSides = {
    player1: "player-cards",
    computer: "pc-cards",
}
// Gerar o Id Aleatorio para as cartas a mesa

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function drawSelectCard(id){
    state.cardSprites.avatar.src = cardData[id].img;
    state.cardSprites.name.innerText = cardData[id].name;
    state.cardSprites.type.innerText = "Attibute : " + cardData[id].type

}

// Criando a Imagem das cartas
async function createCardImage(idCard, fieldSide){
    // o documento.creatElement() Cria uma Tag no documento HTML
    const cardImage = document.createElement("img");
    // o .setAttribute() coloca um atributo na tag
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", `${caminhoDaImagem}card-back.png`)
    cardImage.setAttribute("data-id", idCard)
    // .classList.add() adiciona uma classe na tag do HTML
    //  para ser manipulada no CSS
    cardImage.classList.add("card")

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"))
        })
    }

    cardImage.addEventListener("mouseover", () =>{
        drawSelectCard(idCard);
    })

    return cardImage

}

async function drawCards(cardNumber, fieldSide){
    for (let i = 0; i < cardNumber; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);

    }
}



function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer)

}

init()