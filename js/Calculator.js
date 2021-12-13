const factorial = number => {
    let fact = 1

    for (let i = 1; i <= number; i++) {
        fact *= i
    }

    return fact
}

const HISTORY = 'history'

const fromNumeral = (number, type) => parseInt(number, type)

const toNumeral = (number, type) => (number >>> 0).toString(type).toUpperCase()

const fromNumeralMantica = (number, type) => {
    if (type === 2) {
        let n = 0
    
        for (let i = number.length - 1; i > -1; i--) {
            if (number[i] === '1') {
                n += 1
            }
            
            n /= 2
        }
    
        return Math.round(n * 100_000_000_000) / 100_000_000_000
    } else if (type === 16) {
        let n = 0
        let j = 1
    
        for (let i = 0; i < number.length; i++) {
            let div = 16 ** j
            
            let num = number[i]
            
            if (num === 'A') num = 10
            else if (num === 'B') num = 11
            else if (num === 'C') num = 12
            else if (num === 'D') num = 13
            else if (num === 'E') num = 14
            else if (num === 'F') num = 15
        
            n += num / div
            j++
        }
    
        return n
    }
}

const toNumeralMantica = (number, type) => {
    let res = ''
    let n = number

    if (type === 2) {
        while (n !== 0) {
            n *= 2
            
            if (parseInt(n) === 1) {
                res += '1'
                n-=1
            } else {
                res += '0'
            }
        }
    } else if (type === 16) {
        while (n !== 0) {
            n *= 16
            
            if (parseInt(n) === 10) res += 'A'
            else if (parseInt(n) === 11) res += 'B'
            else if (parseInt(n) === 12) res += 'C'
            else if (parseInt(n) === 13) res += 'D'
            else if (parseInt(n) === 14) res += 'E'
            else if (parseInt(n) === 15) res += 'F'
            else res += parseInt(n).toString()
        
            n -= parseInt(n)
        }
    }

    return res
}

const convertation = (expression, type, toDecimal) => {
    if (toDecimal) {
        const converted = expression.split(' ').map(operand => {
            if (operand !== '/' && operand !== '*' && operand !== '-' && operand !== '+' && operand !== '**') {
                if (operand === 'Math.PI' || operand === 'Math.E') {
                    return eval(operand).toString()
                } else {
                    const number = operand.split('.')
    
                    if (number.length === 2) {
                        return (fromNumeral(number[0], type) + fromNumeralMantica(number[1], type)).toString()
                    } else {
                        return fromNumeral(number[0], type).toString()
                    }
                }
            } else {
                return operand 
            }
        }).join(' ')

        return converted
    } {
        if (expression - parseInt(expression)) {
            return `${toNumeral(expression, type)}.${toNumeralMantica(expression - parseInt(expression), type)}`
        } else {
            return toNumeral(expression, type).toString()
        }
    }
}

export default class Calcuator {
    constructor(historyElement, calculationElement) {
        this.historyElement = historyElement
        this.calculationElement = calculationElement
        this.numeralSystem = 10
        this.memoryClear()
        this.clear()

        localStorage.getItem(HISTORY) ?? localStorage.setItem(HISTORY, '[]')
    }
    memoryRecall() {
        this.memory = this.calculationElement.innerHTML
    }
    memoryClear() {
        this.memory = '0'
    }
    memorySum() {
        this.historyElement.innerHTML = `${this.memory} + ${this.calculationElement.innerHTML}`

        const expression = this.numeralSystem !== 10 ? convertation(this.historyElement.innerHTML, this.numeralSystem, true) : this.historyElement.innerHTML
        const evaled = Math.round((eval(expression) + Number.EPSILON) * 100_000_000_000) / 100_000_000_000;
        const result = (this.numeralSystem !== 10 ? convertation(evaled.toString(), this.numeralSystem) : evaled).toString()

        this.calculationElement.innerHTML = result
    }
    memorySub() {
        this.historyElement.innerHTML = `${this.memory} - ${this.calculationElement.innerHTML}`

        const expression = this.numeralSystem !== 10 ? convertation(this.historyElement.innerHTML, this.numeralSystem, true) : this.historyElement.innerHTML
        const evaled = Math.round((eval(expression) + Number.EPSILON) * 100_000_000_000) / 100_000_000_000;
        const result = (this.numeralSystem !== 10 ? convertation(evaled.toString(), this.numeralSystem) : evaled).toString()

        this.calculationElement.innerHTML = result
    }
    clear() {
        this.historyElement.innerHTML = ''
        this.calculationElement.innerHTML = '0'
    }
    delete() {
        if (this.calculationElement.innerHTML[this.calculationElement.innerHTML.length - 1] === ' ') {
            this.calculationElement.innerHTML = this.calculationElement.innerHTML.slice(0, -3)
        } else {
            this.calculationElement.innerHTML = this.calculationElement.innerHTML.slice(0, -1)
        }

        if (this.calculationElement.innerHTML === '') {
            this.calculationElement.innerHTML = '0'
        }
    }
    toggleSign() {
        const arr = this.calculationElement.innerHTML.split(' ')

        if (!isNaN(arr[arr.length - 1])) {
            if (!arr[arr.length - 1].includes('-')) {
                arr[arr.length - 1] = `-${arr[arr.length - 1]}`
            } else {
                arr[arr.length - 1] = arr[arr.length - 1].replace('-', '')
            }
        }

        this.calculationElement.innerHTML = arr.join(' ')
    }
    appendNumber(number) {
        if (this.calculationElement.innerHTML === '0') {
            this.calculationElement.innerHTML = number.toString()
        } else {
            this.calculationElement.innerHTML += number.toString()
        }
    }
    appendOperation(operation) {
        if (this.calculationElement.innerHTML[this.calculationElement.innerHTML.length - 1] !== ' ') {
            this.calculationElement.innerHTML += ` ${operation.toString()} `
        }
    }
    appendDot() {
        const operands = this.calculationElement.innerHTML.split(' ')

        if (!operands[operands.length - 1].includes('.')) {
            if (operands[operands.length - 1] === '') {
                this.calculationElement.innerHTML += '0'
            }

            this.calculationElement.innerHTML += '.'
        }
    }
    appendSpecial(special) {
        if (this.calculationElement.innerHTML === '0') {
            this.calculationElement.innerHTML = `${special}`
        } else if (this.calculationElement.innerHTML[this.calculationElement.innerHTML.length - 1] === ' ') {
            this.calculationElement.innerHTML += `${special}`
        } else if (this.calculationElement.innerHTML[this.calculationElement.innerHTML.length - 1] === 'π' || this.calculationElement.innerHTML[this.calculationElement.innerHTML.length - 1] === 'e') {
            this.appendOperation('*')
            this.calculationElement.innerHTML += `${special}`
        }
    }
    calculate(options = {}) {
        try {
            this.calculationElement.innerHTML = this.calculationElement.innerHTML.replaceAll('π', 'Math.PI').replaceAll('e', 'Math.E').replaceAll('^', '**')
            const expression = this.numeralSystem !== 10 ? convertation(this.calculationElement.innerHTML, this.numeralSystem, true) : this.calculationElement.innerHTML
            const evaled = Math.round((eval(expression) + Number.EPSILON) * 100_000_000_000) / 100_000_000_000;
            this.calculationElement.innerHTML = this.calculationElement.innerHTML.replaceAll('Math.PI', 'π').replaceAll('Math.E', 'e').replaceAll('**', '^')

            if (!isNaN(evaled) && isFinite(evaled)) {
                this.historyElement.innerHTML = this.calculationElement.innerHTML
                let calc = evaled

                if (options.percent) {
                    calc = (evaled / 100)
                } else if (options.factorial) {
                    if (evaled <= 170) {
                        calc = factorial(evaled)
                    } else {
                        throw 'Infinity'
                    }
                } else if (options.sqrt) {
                    if (evaled >= 0) {
                        calc = Math.sqrt(evaled)
                    } else {
                        throw 'Error'
                    }
                }

                const result = (this.numeralSystem !== 10 ? convertation(calc.toString(), this.numeralSystem) : calc).toString()
                this.calculationElement.innerHTML = result

                localStorage.setItem(HISTORY, JSON.stringify([
                    ...JSON.parse(localStorage.getItem(HISTORY)),
                    `${this.historyElement.innerHTML} = ${this.calculationElement.innerHTML}`
                ]))
            } else {
                throw 'Error'
            }
        } catch (error) {
            this.clear()
            if (error !== 'Infinity') {
                error = 'Error'
            }
            this.calculationElement.innerHTML = error
        }
    }
}
