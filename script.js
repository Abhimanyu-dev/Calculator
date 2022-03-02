const container = document.querySelector('.container')
const body = document.querySelector('.body')
const height = container.offsetHeight/1.5
const width = height/1.5
let show = true
var er = false
const operator = ['+','-','/','*']

const display_new = document.querySelector('.new_input')
const display_old = document.querySelector('.old_input')

body.style.height = height+'px'
body.style.width = width + 'px'

var numpad = document.querySelector('.numpad')

numpad.style.width = 3/4*width+'px'

btn_size = Math.floor(numpad.offsetWidth/3.5)

for(i=9; i>=0; i--){
    button = document.createElement('div')
    button.setAttribute('class', 'btn btn'+i)
    button.textContent = i
    button.setAttribute('style', 'height:'+btn_size+'px; width: '+btn_size+'px; border: 1px solid black;')
    button.setAttribute('onclick', 'update_display(this)')
    numpad.appendChild(button)
}

function update_display(element){
    if(isNaN(element.textContent) && element.textContent !='.')
    {
        if(element.textContent == '='){
            display_old.textContent = display_old.textContent.trim()+display_new.textContent.trim()
            evaluate()
            display_new.textContent = display_old.textContent
            display_old.textContent = ''

        
    }else{
        display_old.textContent = display_old.textContent.trim()+display_new.textContent.trim()
        evaluate()
        display_old.textContent += element.textContent 
        display_new.textContent = ""
    }
        
    }else{
        if(display_new.textContent.trim().length<=15 && show)
        display_new.textContent = display_new.textContent.trim()+element.textContent
        else if(!er){
        display_new.textContent = 'TOO BIG'
        show = false
        }
    }
}

var operators = document.querySelector('.operators')

operators.style.width = 1/4*width+'px'

for(i=0; i<operator.length;i++){
    button = document.createElement('div')
    button.setAttribute('class', 'btn btn'+operator[i])
    button.textContent = operator[i]
    button.setAttribute('style', 'height:'+btn_size+'px; width: '+btn_size+'px; border: 1px solid black;')
    button.setAttribute('onclick', 'update_display(this)')
    operators.appendChild(button)
}

button_decimal = document.createElement('div')
button_decimal.setAttribute('class', 'btn btn.')
button_decimal.textContent = '.'
button_decimal.setAttribute('style', 'height:'+btn_size+'px; width: '+btn_size+'px; border: 1px solid black;')
button_decimal.setAttribute('onclick', 'update_display(this)')

button_equals = document.createElement('div')
button_equals.setAttribute('class', 'btn btn=')
button_equals.textContent = '='
button_equals.setAttribute('style', 'height:'+btn_size+'px; width: '+btn_size+'px; border: 1px solid black;')
button_equals.setAttribute('onclick', 'update_display(this)')


numpad.insertBefore(button_equals, numpad.children[numpad.children.length -1])

numpad.insertBefore(button_decimal, numpad.children[numpad.children.length -1])

function clearScreen(){
    display_new.innerHTML = ""  
    display_old.innerHTML = "" 
    display_new.style = ""  
    display_old.style = "" 
    show = true
    er = true
}

function deleteButton(){
    if(display_new.textContent.trim()==''){
        str = display_old.textContent.slice(0, -1)
        display_old.textContent = str
    }else{
        str = display_new.textContent.slice(0, -1)
        display_new.textContent = str
    }
}

function evaluate(){
    equation = display_old.textContent
    var num1, operator, num2, value, n1, n2
    num1 = {
        integer_part : '',
        decimal_part : ''
    }
    num2 = {
        integer_part : '',
        decimal_part : ''
    }
    
    operator = 0
    decimal_num1 = false
    decimal_num2 = false
    negative_num1 = false
    negative_num2 = false
    change = false
    flag = true 
    for(i=0; i<equation.length; i++){
        if(isNaN(equation[i]) && flag){
            if(equation[i] == '.' ){
                decimal_num1 = true 
                continue
            }
            if(i==0){
                negative_num1 = true
                continue
            }
            operator = i
            change = true
            flag = false
            continue
        }
        if(change){
            if(equation[i] == '.'){
                decimal_num2 = true
                continue
            }

            if(equation[i] == '-'){
                negative_num2 = true
                continue
            }

            if(decimal_num2){
                num2.decimal_part += equation[i]
            }else{
                num2.integer_part += equation[i]
            }

        }
        else{
            if(decimal_num1){
                num1.decimal_part += equation[i]
            }else{
                num1.integer_part += equation[i]
            }
        }
    }

    if(decimal_num1){
        n1 = parseFloat(num1.integer_part+'.'+num1.decimal_part)
    }else{
        n1 = parseFloat(num1.integer_part)
    }
    if(decimal_num2){
        n2 = parseFloat(num2.integer_part+'.'+num2.decimal_part)
    }else{
        n2 = parseFloat(num2.integer_part)
    }

    console.log(equation[operator])
    console.log(n1)
    console.log(n2)

    if(!(isNaN(n2))){
        console.log('hi')
        switch (equation[operator]){
            case '+':
                value = n1 + n2
                break
            case '-':
                value = n1 - n2
                break
            case '/':
                if(n2 == 0){
                    display_old.style.color = 'red'
                    display_new.style.color = 'red'
                    display_new.style.fontSize = '2em'
                    value = 'Undefined(Division by Zero)'
                    show = false
                    er = true 
                    break

                }
                value = n1 / n2
                break
            case '*':
                value = n1 * n2
                break
        }
        display_old.textContent = value
        console.log(value)
    }
}

function equals(){
    update_display(null)
    display_new.textContent = display_old.textContent
    display_old.textContent = ''
}