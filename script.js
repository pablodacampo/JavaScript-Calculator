class Calculator {
    constructor(previousResultTextElement, currentResultTextElement) {
        this.previousResultTextElement = previousResultTextElement
        this.currentResultTextElement = currentResultTextElement
        this.clear()
    }

    clear() {
        this.currentResult = ''
        this.previousResult = ''
        this.operation = undefined

    }

    delete() {
        this.currentResult = this.currentResult.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === '.' && this.currentResult.includes('.')) return
        this.currentResult = this.currentResult.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentResult === '') return
        if (this.previousResult !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousResult = this.currentResult
        this.currentResult = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousResult)
        const current = parseFloat(this.currentResult)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentResult = computation
        this.operation = undefined
        this.previousResult = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else {
            intergerDisplay = intergerDigits.toLocaleString('en', {
            maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else {
            return intergerDisplay
        }
    }

    updateDisplay() {
        this.currentResultTextElement.innerText = this.getDisplayNumber(this.currentResult)
        if (this.operation != null) {
            this.previousResultTextElement.innerText = `${this.getDisplayNumber(this.previousResult)} ${this.operation}`
        } else {
            this.previousResultTextElement.innerText = ''
        }
        
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearEverythingButton = document.querySelector('[data-clear-everything]')
const previousResultTextElement = document.querySelector('[data-previous-result]')
const currentResultTextElement = document.querySelector('[data-current-result]')

const calculator = new Calculator(previousResultTextElement, currentResultTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearEverythingButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})