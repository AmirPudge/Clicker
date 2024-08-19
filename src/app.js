const circle = document.querySelector('#circle');
const $score = document.querySelector('#score');

function start() {
    setScore(getScore())
}

function setScore(score) {
    localStorage.setItem('score', score)
    $score.textContent = score
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
    setScore(getScore() + 1)
}

circle.addEventListener('click', (event) => {
    const rectangle = event.target.getBoundingClientRect()

    const offSetX = event.clientX - rectangle.left - rectangle.width / 2
    const offSetY = event.clientY - rectangle.top - rectangle.height / 2

    const DEG = 55

    const tiltX = (offSetY / rectangle.height) * DEG
    const tiltY = (offSetX / rectangle.width) * -DEG

    circle.style.setProperty('--tiltX', `${tiltX}deg`)
    circle.style.setProperty('--tiltY', `${tiltY}deg`)

    setTimeout(() => {
        circle.style.setProperty('--tiltX', `0deg`)
        circle.style.setProperty('--tiltY', `0deg`)
    }, 300);

    const plusOne = document.createElement('div')
    plusOne.classList.add('plus-one')
    plusOne.textContent = '+1'
    plusOne.style.left = `${event.clientX - rectangle.left}px`
    plusOne.style.top = `${event.clientY - rectangle.top}px`
    
    circle.parentElement.appendChild(plusOne)

    addOne()

    setTimeout(() => {
        plusOne.remove()
    }, 2000)
})

start()