const dino = document.querySelector('.dino')
const background = document.querySelector('.background')

let isJumping = false
let game = true
let position = 190

// verificar se o usuario pressionou a tecla espaço
function handleKeyUp(event){
    if(event.keyCode === 32){
        if(isJumping === false){
            jump()
        }
    }
}

//fazer nosso personagem saltar
function jump() {
    let upInterval = setInterval(() => {
        if(position <= 0){
            clearInterval(upInterval)
            upInterval = null
            
            let downInterval = setInterval(() => {
                if(position >= 190 ){
                    clearInterval(downInterval)
                    downInterval = null
                    isJumping = false
                } else{
                    position += 20
                    dino.style.top = `${position}px`
                }
            }, 30)
        } else {
            position -= 20
            dino.style.top = `${position}px`
            isJumping = true
        }
    }, 30)
    console.log('pulou')
}

//criar cactus no cenario
function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 890
    let randonTime = Math.random() * 6000

    cactus.classList.add('cactus')
    cactus.style.left = `${cactusPosition}px`
    background.appendChild(cactus)

    let leftInterval = setInterval(() => {
        if(cactusPosition < -7){
            clearInterval(leftInterval)
            leftInterval = null
            background.removeChild(cactus)
        } else if(cactusPosition > 0 && cactusPosition < 60 && position > 100) {
            clearInterval(leftInterval)
            leftInterval = null
            background.innerHTML = "<h2 class='game-over'>Game Over</h2>"
            game = false
            console.log('fim de jogo')
        } else {
            cactusPosition -= 10
            cactus.style.left = `${cactusPosition}px`
        }
    }, 20)

    if(game){
    setTimeout(createCactus, randonTime)
    }
}
if(game){
    createCactus()
}
document.addEventListener('keyup', handleKeyUp)