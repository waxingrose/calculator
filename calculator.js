const view = document.querySelector(".view")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal")
const clear = document.querySelector(".clear")
const sign = document.querySelector(".sign")
const percent = document.querySelector(".percent")

let digit = ""
let storedDigit = []
numbers.forEach((num) =>
  num.addEventListener("click", () => {
    // if the result is displayed, a new number clears and starts new calc
    if (result && !storedDigit.lastIndexOf(op)) {
      result = ''
      digit = ''
      storedDigit = []
    }
    if (result == Infinity || result == -Infinity) {
      result = ''
      digit = ''
    }
    digit += num.innerHTML
    view.innerHTML = digit
    
    console.log('digit = ' + digit)
  }),
)

let op
operators.forEach((operator) =>
  operator.addEventListener("click", () => {
    storedDigit.push(digit)
    digit = '' // resets digit
    view.innerHTML = operator.innerHTML
    op = operator.innerHTML
    storedDigit.push(op)

    console.log('storedDigit = ' + storedDigit)
    console.log(digit)
    console.log(op)
  }),
)

let formula
let result
function operate() {
  formula = storedDigit.join('')
  result = eval(formula)
}

equal.addEventListener("click", (event) => {
  const isInt = eval(result % 1)
  operate()

  if (isInt === 0) {
    view.innerHTML = result.toPrecision(20)
  }
  if (result === Infinity || result === -Infinity) {
    view.innerHTML = "=("
  }
  else {
    view.innerHTML = result
  }

  console.log('result = ' + result)
  console.log('storedDigit = ' + storedDigit)
})

function neg(number) {
  return -number
}
sign.addEventListener("click", (event) => {

  if (view.innerHTML == digit) {
    digit = neg(digit)
    view.innerHTML = digit
  }

})

function per(number) {
  return number / 100
}
percent.addEventListener("click", (event) => {
  if (view.innerHTML == digit) {
    digit = per(digit)
    view.innerHTML = digit
  }
  if (view.innerHTML == storedDigit) {
    storedDigit = per(storedDigit)
    view.innerHTML = storedDigit
  }
  if (view.innerHTML == result) {
    result = per(result)
    view.innerHTML = result
  }
})

const resetView = view.innerHTML
clear.addEventListener("click", (event) => {
  result = ""
  storedDigit = []
  digit = ""
  op = ""
  formula = ""
  view.innerHTML = resetView
})