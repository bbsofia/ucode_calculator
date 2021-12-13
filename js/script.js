import Calculator from './Calculator.js'

const calculatorElement = document.querySelector('.calculator')
const historyElement = document.querySelector('[data-history]')
const calculationElement = document.querySelector('[data-calculation]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const toggleSignButton = document.querySelector('[data-toggle-sign]')
const numbersButton = document.querySelectorAll('[data-number]')
const binaryNumbersButton = document.querySelectorAll('[data-binary-number]')
const operationsButton = document.querySelectorAll('[data-operation]')
const percentButton = document.querySelector('[data-percent]')
const factorialButton = document.querySelector('[data-factorial]')
const sqrtButton = document.querySelector('[data-sqrt]')
const powerButton = document.querySelector('[data-power]')
const dotButton = document.querySelector('[data-dot]')
const specialsButton = document.querySelectorAll('[data-special]')
const memoryRecallButton = document.querySelector('[data-memory-recall]')
const memoryClearButton = document.querySelector('[data-memory-clear]')
const memorySumButton = document.querySelector('[data-memory-sum]')
const memorySubButton = document.querySelector('[data-memory-sub]')
const binaryButton = document.querySelector('[data-binary]')
const decimalButton = document.querySelector('[data-decimal]')
const hexButton = document.querySelector('[data-hex]')
const hexLettersButton = document.querySelectorAll('[data-hex-letter]')

const calculator = new Calculator(historyElement, calculationElement)

switch (calculator.numeralSystem) {
    case 2:
        binaryButton.classList.add('numericSystem')
        break
    case 10:
        decimalButton.classList.add('numericSystem')
        break
    case 16:
        hexButton.classList.add('numericSystem')
        break
}


clearButton.addEventListener('click', () => {
    calculator.clear()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
})

toggleSignButton.addEventListener('click', () => {
    calculator.toggleSign()
})

numbersButton.forEach(number => {
    number.addEventListener('click', () => {
        if (!calculatorElement.classList.contains('binary')) {
            calculator.appendNumber(number.innerHTML)
        }
    })
})

binaryNumbersButton.forEach(binary => {
    binary.addEventListener('click', () => {
        if (calculatorElement.classList.contains('binary')) {
            calculator.appendNumber(binary.innerHTML)
        }
    })
})

operationsButton.forEach(operation => {
    operation.addEventListener('click', () => {
        switch (operation.innerHTML) {
            case '÷':
                calculator.appendOperation('/')
                break
            case '*':
            case '-':
            case '+':
                calculator.appendOperation(operation.innerHTML)
                break
            case '=':
                calculator.calculate()
                break
        }
    })
})

factorialButton.addEventListener('click', () => {
    calculator.calculate({ 'factorial': true })
})

sqrtButton.addEventListener('click', () => {
    calculator.calculate({ 'sqrt': true })
})

percentButton.addEventListener('click', () => {
    calculator.calculate({ 'percent': true })
})

powerButton.addEventListener('click', () => {
    calculator.appendOperation('^')
})

specialsButton.forEach(special => {
    special.addEventListener('click', () => {
        calculator.appendSpecial(special.innerHTML)
    })
})

dotButton.addEventListener('click', () => {
    calculator.appendDot()
})

memoryRecallButton.addEventListener('click', () => {
    calculator.memoryRecall()
})

memoryClearButton.addEventListener('click', () => {
    calculator.memoryClear()
})

memorySumButton.addEventListener('click', () => {
    calculator.memorySum()
})

memorySubButton.addEventListener('click', () => {
    calculator.memorySub()
})

binaryButton.addEventListener('click', () => {
    binaryButton.classList.add('numericSystem')
    decimalButton.classList.remove('numericSystem')
    hexButton.classList.remove('numericSystem')

    calculator.numeralSystem = 2
    calculator.memoryClear()
    calculator.clear()

    hexLettersButton.forEach(letter => {
        letter.classList.add('hidden')
    })

    calculatorElement.classList.remove('hexxed')
    calculatorElement.classList.add('binary')

    lengthSelect.setAttribute('disabled', '')
    areaSelect.setAttribute('disabled', '')
    weightSelect.setAttribute('disabled', '')
})

decimalButton.addEventListener('click', () => {
    binaryButton.classList.remove('numericSystem')
    decimalButton.classList.add('numericSystem')
    hexButton.classList.remove('numericSystem')

    calculator.numeralSystem = 10
    calculator.memoryClear()
    calculator.clear()

    hexLettersButton.forEach(letter => {
        letter.classList.add('hidden')
    })

    calculatorElement.classList.remove('hexxed')
    calculatorElement.classList.remove('binary')

    lengthSelect.removeAttribute('disabled')
    areaSelect.removeAttribute('disabled')
    weightSelect.removeAttribute('disabled')
})

hexButton.addEventListener('click', () => {
    binaryButton.classList.remove('numericSystem')
    decimalButton.classList.remove('numericSystem')
    hexButton.classList.add('numericSystem')

    calculator.numeralSystem = 16
    calculator.memoryClear()
    calculator.clear()

    hexLettersButton.forEach(letter => {
        letter.classList.remove('hidden')
    })

    calculatorElement.classList.add('hexxed')
    calculatorElement.classList.remove('binary')

    lengthSelect.setAttribute('disabled', '')
    areaSelect.setAttribute('disabled', '')
    weightSelect.setAttribute('disabled', '')
})

hexLettersButton.forEach(letter => {
    letter.addEventListener('click', () => {
        calculator.appendNumber(letter.innerHTML)
    })
})
