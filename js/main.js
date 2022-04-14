let bankName = document.querySelector(".input__bankname");
let interestRate = document.querySelector(".input__interestrate");
let maxLoan = document.querySelector(".input__maxloan");
let minPayment = document.querySelector(".input__minpayment");
let loanTerm = document.querySelector(".input__loanterm");
let createButton = document.querySelector(".create__btn");
let editButton = document.querySelector(".edit__btn");
let removeButton = document.querySelector(".remove__btn");
let saveButton = document.querySelector(".save__btn");
let unsaveButton = document.querySelector(".unsave__btn");
let saveBlock = document.querySelector(".save__block");

let items = [];
let rowNum;

function clearInput(){
    bankName.value="";
    interestRate.value="";
    maxLoan.value="";
    minPayment.value="";
    loanTerm.value="";
}

function verification(){
    let ver = true;
    if (bankName.value.length<1||interestRate.value.length<1||maxLoan.value.length<1) ver = false;
    if (interestRate.value != Number(interestRate.value)) ver = false;
    if (maxLoan.value != Number(maxLoan.value)) ver = false;
    if (minPayment.value != Number(minPayment.value)) ver = false;
    if (loanTerm.value != Number(loanTerm.value)) ver = false;
    return ver;
}

window.addEventListener('load', function(){    
    items = localStorage.getItem('items');
    items = JSON.parse(items);
    if (items == null) items = [];
    console.log(items);
    printTable();
    //setTimeout(printTable, 2000);
});

createButton.addEventListener('click', function() {
    console.log(verification());
    if (verification()) {
        items.push({
            bankName: bankName.value,
            interestRate: interestRate.value,
            maxLoan: maxLoan.value,
            minPayment: minPayment.value,
            loanTerm: loanTerm.value,
        })
        console.log(items);
        localStorage.setItem('items', JSON.stringify(items));
        printRow(items.length-1);
        clearInput();
    }    
});

let table = document.querySelector(".table");
let rowCreate;

function createRow(i){    
    rowCreate = document.createElement('tr');
    rowCreate.innerHTML = "<td>" + items[i].bankName + "</td>" + "<td>" + items[i].interestRate + "</td>" + "<td>" + items[i].maxLoan + "</td>" + "<td>" + items[i].minPayment + "</td>" + "<td>" + items[i].loanTerm + "</td>";        
};
function printTable() {
    for(let i=0; i<items.length; i++){
        createRow(i);        
        table.append(rowCreate);        
    }        
}
function printRow(i){
    createRow(i);
    console.log(i);        
    createRow(i);
    table.append(rowCreate);        
}



removeButton.addEventListener('click', function(){    
    let rowName = prompt("Bank name");
    let rowNumber = -1;    
    for(let i = 0; i < items.length; i++) {
        if (items[i].bankName == rowName) rowNumber = i;
    }        
    if (rowNumber == -1) alert("No such Bank name"); else {
        console.log(rowNumber);    
        table.deleteRow(rowNumber+1);                
        items.splice(rowNumber, 1);        
        console.log(items);
        localStorage.setItem('items', JSON.stringify(items));        
    }    
});

editButton.addEventListener('click', function() {
    let rowName = prompt("Bank name");
    rowNum = -1;    
    for(let i = 0; i < items.length; i++) {
        if (items[i].bankName == rowName) rowNum = i;
    }            
    if (rowNum == -1) alert("No such Bank name"); else {        
        bankName.value=items[rowNum].bankName;
        interestRate.value=items[rowNum].interestRate;
        maxLoan.value=items[rowNum].maxLoan;              
        minPayment.value=items[rowNum].minPayment;              
        loanTerm.value=items[rowNum].loanTerm;              
        saveBlock.style.display="block";
        console.log(rowNum);
        saveButton.addEventListener('click', function() {
            console.log(rowNum);
            if (verification()) {
                console.log("ok ",rowNum);
                items[rowNum] = {
                    bankName: bankName.value,
                    interestRate: interestRate.value,
                    maxLoan: maxLoan.value,
                    minPayment: minPayment.value,
                    loanTerm: loanTerm.value,
                };                
            //    console.log(items);
                localStorage.setItem('items', JSON.stringify(items));        
                table.deleteRow(rowNum+1);                
                let rowInsert = table.insertRow(rowNum+1); 
                let i = rowNum;
                rowInsert.innerHTML = "<td>" + items[i].bankName + "</td>" + "<td>" + items[i].interestRate + "</td>" + "<td>" + items[i].maxLoan + "</td>" + "<td>" + items[i].minPayment + "</td>" + "<td>" + items[i].loanTerm + "</td>";        
                saveBlock.style.display="none";
                clearInput();
            }                    
            console.log(items);
        });
        unsaveButton.addEventListener('click', function(){
            saveBlock.style.display="none";
            clearInput();
        });
      
    }    
})