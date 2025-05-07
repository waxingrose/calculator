const view = document.querySelector('.view')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const sign = document.querySelector('.sign')
const percent = document.querySelector('.percent')

let digit = ''
let storedDigit = []
numbers.forEach((num) =>
  num.addEventListener('click', () => {
    // if the result is displayed, a new number clears and starts new calc
    if (result && storedDigit.lastIndexOf(op) == -1) { // bug with non single digit; reset digit at equal instead of here
      result = ''
      storedDigit = []
    }
    if (result == Infinity || result == -Infinity) {
      result = ''
      digit = ''
    }
    // insert code here to disable more than one decimal 

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

    return accum.concat(current) // doesn't iterate last index of new array if using splice here
  }, [])

  result = eval(accum.join(''))
  console.log(accum)
}

let op
operators.forEach((operator) =>
  operator.addEventListener('click', () => {

    // fixes [2,0,0] and [2,20,200]
    if (digit.length != 0) {
      storedDigit.push(digit)
    }

    // only show result with enough input
    operate()
    if (result) {
      view.innerHTML = result
    } else {
      view.innerHTML = operator.innerHTML
    }

    op = operator.innerHTML
    storedDigit.push(op)
    digit = '' // resets digit 

    console.log('storedDigit = ' + storedDigit)
    console.log(digit)

  }),
)

equal.addEventListener('click', (event) => {

  // fixes [2,0,0] and [2,20,200]
  if (digit.length != 0) {
    storedDigit.push(digit)
  }
  operate()
  // clear storedDigit and push result into storedDigit for when pressing operator after equal
  storedDigit = [result]
  const isInt = eval(result % 1)
  if (isInt === 0) {
    view.innerHTML = result.toPrecision(20)
  }
  if (result === Infinity || result === -Infinity) {
    view.innerHTML = '=('
  } else {
    view.innerHTML = result
  }
  digit = '' // reset for new number
  console.log('result = ' + result)
  console.log('storedDigit = ' + storedDigit)
})

function neg(number) {
  return -number
}
sign.addEventListener('click', (event) => {
  if (storedDigit.length != 1 && !result) {
    digit = neg(digit)
    view.innerHTML = digit
  }
  
})

function per(number) {
  return number / 100
}
percent.addEventListener('click', (event) => {
  if (Number(view.innerHTML)) {
    digit = per(view.innerHTML)
    view.innerHTML = digit
  }
})

const resetView = view.innerHTML
clear.addEventListener('click', (event) => {
  result = ''
  storedDigit = []
  digit = ''
  op = ''
  formula = ''
  view.innerHTML = resetView
})
