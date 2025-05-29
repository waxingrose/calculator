const view = document.querySelector('.view')
const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal')
const clear = document.querySelector('.clear')
const sign = document.querySelector('.sign')
const percent = document.querySelector('.percent')
const decimal = document.getElementById('decimal')

let digit = ''
let result = ''
let storedDigit = []
numbers.forEach((num) =>
  num.addEventListener('click', () => {
    // stops input of more than one decimal 
    const hasDecimal = digit.toString().includes('.')
    const resultDecimal = result.toString().includes('.')
    if ((hasDecimal == false || resultDecimal == false) && num.innerHTML != '.') {
      digit += num.innerHTML
      view.innerHTML = digit
      console.log('digit = ' + digit)
    }
    // fix bug so that digit follows decimal
    else if (hasDecimal == true && num.innerHTML != '.') {
      digit += num.innerHTML
      view.innerHTML = digit
      console.log('digit = ' + digit)
    }
      // fix bug when decimal entered as new digit after operator resets digit
    else if (hasDecimal == false && num.innerHTML == '.' && result != storedDigit) {
      digit += num.innerHTML
      view.innerHTML = digit
      console.log('digit = ' + digit)
    }
    // fix bug so that decimal is entered as new digit after result is displayed
    else if (hasDecimal == false && num.innerHTML == '.' && result == storedDigit) {
      result = ''
      storedDigit = []
      digit += num.innerHTML
      view.innerHTML = digit
      console.log('digit = ' + digit)
    }
    // if the result is displayed, a new number clears and starts new calc
    else if
      (view.innerHTML == result && result == storedDigit) {
      result = ''
      storedDigit = []
      digit += num.innerHTML
      view.innerHTML = digit
      console.log('digit = ' + digit)
    }
    else if
      (result == Infinity || result == -Infinity) {
      result = ''
      digit = ''
    }
    else {
      null;
    }
  }

  ),
)

let formula
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

    return accum.concat(current)
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
  console.log(`digit = ` + digit)
})

function neg(number) {
  return -number
}
sign.addEventListener('click', (event) => {
  if (digit) {
    digit = neg(digit)
    view.innerHTML = digit
  }
  if (storedDigit != '' && storedDigit == result) {
    result = neg(result)
    storedDigit = [result]
    view.innerHTML = storedDigit
  }
})

function per(number) {
  return (number / 100)
}
percent.addEventListener('click', (event) => {
  if (digit) {
    digit = per(digit)
    view.innerHTML = digit
  }
  if (storedDigit != '' && storedDigit == result) {
    result = per(result)
    storedDigit = [result]
    view.innerHTML = storedDigit
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
