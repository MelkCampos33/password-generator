const lengthSlider = document.querySelector('.pass-length input')
const options = document.querySelectorAll('.option input')
const copyIcon = document.querySelector('.input-box span')
const passwordInput = document.querySelector('.input-box input')
const passIndicator = document.querySelector('.pass-indicator')
const generateButton = document.querySelector('.generate-btn')

// caracteres que iram ser usados para formarem as senhas
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

// função que monta/cria as senhas
const generatePassword = () => {

    let staticPassword = '',
        randomPassword = '',
        excludeDuplicate = false,
        passLength = lengthSlider.value

    
        options.forEach(option => {
            if (option.checked) {
               if(option.id !== 'exc-duplicate' && option.id !== 'spaces') {
                    staticPassword += characters[option.id]
               } else if (option.id === 'spaces') {
                    staticPassword += ` ${staticPassword} `
               } else {
                  excludeDuplicate = true
               }
            }
        })

    for (let i = 0; i < passLength; i++) {
        
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == ' ' ? randomPassword += randomChar : i--

        } else {
            randomPassword += randomChar
        }
    }

    passwordInput.value = randomPassword
}   

// indicador de segurança da senha

const updateIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? 'weak' : lengthSlider.value <= 16 ? 'medium' : 'strong'
}

const updateSlider = () => {
    document.querySelector('.pass-length span').innertext = lengthSlider.value
    generatePassword()
    updateIndicator()
}

updateSlider()

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value)
    copyIcon.innerText = 'check'
    copyIcon.getElementsByClassName.color = '#4285f4'

    setTimeout(() => {
        copyIcon.innerText = 'copy_all'
        copyIcon.getElementsByClassName.color = '#707070'
    }, 1500)
}

copyIcon.addEventListener('click', copyPassword)
lengthSlider.addEventListener('input', updateSlider)
generateButton.addEventListener('click', generatePassword)

