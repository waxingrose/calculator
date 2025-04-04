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

    storedDigit.push(num.innerHTML)
    digit += num.innerHTML
    view.innerHTML = digit

    console.log('digit = ' + digit)
  }),
)

let formula
let result
function operate() {

  const accum = storedDigit.reduce((accum, current) => {

    if (accum.length < 3) {
      return accum.concat(current)
    }

    if (accum.length === 3) {
      formula = accum.join('')
      let newAccum = eval(formula)
      accum = [newAccum]
    }

    return accum.concat(current) // terminates before iterating last index of the newarray if spliced

  }, [])

  result = eval(accum.join(''))
  console.log(accum)

}

let op
operators.forEach((operator) =>
  operator.addEventListener("click", () => {
    // will only show result with enough input
    operate()
    if (result) {
      view.innerHTML = result
    }
    else {
      view.innerHTML = operator.innerHTML
    }

    op = operator.innerHTML
    storedDigit.push(op)
    digit = '' // resets digit

    console.log('storedDigit = ' + storedDigit)
    console.log(digit)
    console.log(op)
  }),
)

equal.addEventListener("click", (event) => {
  operate()
  // clear and push result into storedDigit if press operator again..
  storedDigit = [result]
  const isInt = eval(result % 1)
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