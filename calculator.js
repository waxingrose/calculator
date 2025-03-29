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
    digit += num.innerHTML
    console.log('digit = ' + digit)
    view.innerHTML = digit
    storedDigit.push(digit)
    console.log('storedDigit = ' + storedDigit)
  }),
)

let op
operators.forEach((operator) =>
  operator.addEventListener("click", () => {
    digit = '' // resets digit
    console.log(digit)
    view.innerHTML = operator.innerHTML
    op = operator.innerHTML
    console.log(op)
    storedDigit.push(op)
  }),
)

let result
let formula
function operate() {
  formula = storedDigit.join(' ')
  result = eval(formula)
  
}

const isInt = eval(result % 1)
equal.addEventListener("click", (event) => {
  operate()
  console.log('result = ' + result)
  console.log('storedDigit = ' + storedDigit)
  if (isInt === 0) {
    view.innerHTML = result.toPrecision(20)
  }
  if (result === Infinity) {
    view.innerHTML = "=("
  }
  else {
    view.innerHTML = result
  }
})

function neg(number) {
  return -number
}
sign.addEventListener("click", (event) => {

  if (view.innerHTML == digit) {
    console.log(digit = neg(digit))
    view.innerHTML = digit
  }
  else if (view.innerHTML == storedDigit) {
    console.log(storedDigit = neg(storedDigit))
    view.innerHTML = storedDigit
  }
  else if (view.innerHTML == result) {
    console.log(result = neg(result))
    view.innerHTML = result
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
  storedDigit = ""
  digit = ""
  op = ""
  formula = ""
  view.innerHTML = resetView
})