const container = document.querySelector('.container')
const body = document.querySelector('.body')
const height = container.offsetHeight/1.5
const width = height/1.5
let show = true
var er = false
const operator_array = ['+','-','/','*']

const display_new = document.querySelector('.new_input')
const display_old = document.querySelector('.old_input')

display_new.innerHTML = ""  
display_old.innerHTML = "" 

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
            eval()
            display_new.textContent = display_old.textContent
            display_old.textContent = ''
        }else{
            display_old.textContent = display_old.textContent.trim()+display_new.textContent.trim() + element.textContent 
            eval()
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

for(i=0; i<operator_array.length;i++){
    button = document.createElement('div')
    button.setAttribute('class', 'btn btn'+operator_array[i])
    button.textContent = operator_array[i]
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

function equals(){
    update_display(null)
    display_new.textContent = display_old.textContent
    display_old.textContent = ''
}

function eval(){
    var equation = display_old.textContent.trim()
    var num1, num2, operator, change, flag, extra=''
    change = false
    flag = false
    another_flag = false
    num1 = '', num2 = ''
    for(i=0; i<equation.length; i++){
        if(operator_array.includes(equation[i])  && equation[i-1]!= 'e'){
            if(flag){
                equation = equation.replace(equation[operator], "")
                display_old.innerHTML = equation
                continue
            }
            if(!another_flag){
            operator = equation[i]
            change = true
            flag = true
            continue
            } else{
                extra = equation[i]
            }
        }
        if(change){
            num2 +=  equation[i]
            flag = false
            another_flag = true
        } else{
            num1 += equation[i]

        }
    }
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)


    if(!(isNaN(num2))){
        switch (operator){
            case '+':
                value = num1 + num2
                break
            case '-':
                value = num1 - num2
                break
            case '/':
                if(num2 == 0){
                    display_old.style.color = 'red'
                    display_new.style.color = 'red'
                    display_new.style.fontSize = '1.5em'
                    value = 'Undefined(Division by Zero)'
                    show = false
                    er = true 
                    break

                }
                value = num1 / num2
                break
            case '*':
                value = num1 * num2
                break
        }
        display_old.textContent = value +'' + extra
    }


}