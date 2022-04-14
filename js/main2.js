let items = [];
let selectBank = document.querySelector('.select__bank');
let loanValue = document.querySelector('.input__loan');
let downPayment = document.querySelector('.input__payment');
let calculateButton = document.querySelector(".calculate__btn");
let paymentValue = document.querySelector('.payment__value');

function loadData(){
    items = localStorage.getItem('items');
    items = JSON.parse(items);
    if (items == null) items = [];   
    console.log(items);    
}

loadData();

function createList(){    
    for(let i = 0; i <items.length; i++) {
        rowCreate = document.createElement('option');    
        rowCreate.textContent = items[i].bankName;
        rowCreate.classList.add("bank__name");
        rowCreate.setAttribute("value", items[i].bankName);
        //console.log(rowCreate);
        selectBank.append(rowCreate);    
    }        
};

createList();

function updateBank(){
    let selectBank = document.querySelector('.select__bank');        
    let selectBankValue = selectBank.options[selectBank.selectedIndex].value;    
    let rowNumber = -1;    
    for(let i = 0; i < items.length; i++) {
        if (items[i].bankName == selectBankValue) rowNumber = i;
    }        
    //console.log(items);    
    let minDownPayment = items[rowNumber].minPayment * loanValue.value / 100;         
    let verification = true;        
    if (Number(loanValue.value)>Number(items[rowNumber].maxLoan)) {
        alert("Maximum loan " + items[rowNumber].maxLoan);        
        verification = false;
    }    
    if (minDownPayment>downPayment.value) {
        alert("Minimum down payment " + minDownPayment);
        verification = false;
    }
    if (verification) {
        const P = Number(loanValue.value) - Number(downPayment.value);
        const r = Number(items[rowNumber].interestRate)/100/12;
        const n = Number(items[rowNumber].loanTerm);
        let monthlyPayment = (P*r*Math.pow((1+r),n))/(Math.pow((1+r),n)-1);        
        paymentValue.textContent = monthlyPayment.toFixed(2) + " $";
    }
           
}

calculateButton.addEventListener('click', function() {
    updateBank();
});


