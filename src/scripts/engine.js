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
    playerSides:{
    player1: "player-cards",
    computer: "pc-cards",
    player1BOX: document.querySelector("#player-cards"),
    computerBOX: document.querySelector("#pc-cards"),

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


async function removeAllCardsImages(){
    // Desestruturação
    let {player1BOX, computerBOX} = state.playerSides
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
    
    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    
}

async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "Empate";
    let playerCard = cardData[playerCardId];
    
    if(playerCard.winOf.includes(computerCardId)){
        duelResults = "Ganhou!";
        await playAudio("win")
        state.score.playerScore++;
    }

    if(playerCard.loseOf.includes(computerCardId)){
        duelResults = "Perdeu!";
        await playAudio("lose")
        state.score.computerScore++;
    }

    return duelResults
}

async function updateScore(){
    state.score.socoreBox.innerHTML = `Win  :  ${state.score.playerScore} |  Lose  :  ${state.score.computerScore}`
}

async function drawButton(text){
    // Deixar o texto maiusculo é o .toUpperCase
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block"

}


async function setCardsField(cardId){
    // Removendo as cartas antes do duelo
    await removeAllCardsImages();
    
    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    // colocando imagens na função
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);

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

    if(fieldSide === state.playerSides.player1){
        cardImage.addEventListener("mouseover", () =>{
            drawSelectCard(idCard);
        })

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"))
        })
    }

    return cardImage

}

async function drawCards(cardNumber, fieldSide){
    for (let i = 0; i < cardNumber; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);

    }
}

async function resetDuel(){
    // resetendo butao e imagem do lado esquerdo
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    // removendo as imagens do campo
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    // resetando o nome e typo da carta
    state.cardSprites.name.innerText = "Selecione um Carta";
    state.cardSprites.type.innerText = "No seu Campo";

    init()

}

async function playAudio(status){
    const audio = new Audio(`../src/assets/audios/${status}.wav`)
    audio.play();

}

function init(){
    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer)

}

init()