class Calculator {
    constructor(previousText, currentText){
        this.previousOperand = previousText;
        this.currentOperand = currentText;
        this.clear();
    }

    clear(){
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = null;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.operation !== null){
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(){

        let computation;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) return;

        switch (this.operation){
            case "+":
                computation = prev + current;
                break;

            case "-":
                computation = prev - current;
                break;

            case "*":
                computation = prev * current;
                break;

            case "/":
                computation = prev / current;
                break;
            
            default:
                return;
        }

        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = "";
    }

    appendNumber(number){
        if(this.currentOperand.includes(".") && number === ".") return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay(){
        currentText.textContent = this.currentOperand;
        previousText.textContent = this.previousOperand;

        if(this.operation !== null){
            previousText.textContent = `${this.previousOperand} ${this.operation}`;
        }
    }
}


let numberBtns = document.querySelectorAll('[data-number]');
let operationBtn = document.querySelectorAll("[data-operation]");
let deleteBtn = document.querySelector('[data-delete]');
let equalBtn = document.querySelector('[data-equal]');
let previousText = document.querySelector('[data-previous]');
let currentText = document.querySelector('[data-current]');
let clearBtn = document.querySelector('[data-clear]');

const calculator = new Calculator(previousText, currentText);

clearBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

numberBtns.forEach( button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })
})

deleteBtn.addEventListener( "click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

operationBtn.forEach( button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})