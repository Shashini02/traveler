/*Activities page*/
let tickets = {
    price : [1000,500,50000,2500,4500,15000],
    duration : [0,250,500,1000],
    extras : [0,500]
}
var ticketChoices = {
    ticketCost : 0,
    annCost : 0,
    ftCost : 0,
    noOfAdults : 0,
    noOfChildren : 0,
    currentcost : 0,
};
function calculateCost () {
    var ticketPrice = tickets["price"];
    var durationPrice = tickets["duration"];
    var extrasPrice = tickets["extras"];

    var cost = 0;

    var choice = document.getElementById("typeofTicket").value;
    var duration = document.getElementById("duration").value;
    var noOfAdults = document.getElementById("noOfAdult").value;
    var noOfChildren = document.getElementById("noOfChild").value;
    var foodTokens = document.getElementById("noofTokens").value;
    var annualPasses = document.getElementById("noofPasses").value;

if(noOfAdults || noOfChildren != 0){
    if(choice == ""){
        alert("Please select your ticket type");
        document.getElementById("typeofTicket").focus();
        return;
    }
    if(duration == ""){
        alert("Please select the duration");
        document.getElementById("duration").focus();
        return;
    }
}
if(duration != "" && choice == ""){
    alert("Please select the choice first");
    document.getElementById("duration").focus();
    return;
}
if(noOfAdults == ""){
    noOfAdults =0;
} else {
    noOfAdults = parseInt(noOfAdults);
}
if(noOfChildren == ""){
    noOfChildren =0;
}else{
    noOfChildren = parseInt(noOfChildren);
}
if(foodTokens == ""){
    foodTokens = 0;
}else{
    foodTokens = parseInt(foodTokens);
}
if(annualPasses == ""){
    annualPasses =0;
}else{
    annualPasses = parseInt(annualPasses);
}

var totalPrice = 0;
choice = parseInt(choice);

switch(choice) {
    case 0:
    totalPrice = ticketPrice[0] * noOfAdults + ticketPrice[1] * noOfChildren;
    break;
    case 1:
    totalPrice = ticketPrice[2] * noOfAdults + ticketPrice[3] * noOfChildren;
    break;
    case 2:
    totalPrice = ticketPrice[4] * noOfAdults + ticketPrice[5] * noOfChildren;
    break;
    default:
}
if(duration !=""){
    duration = parseInt(duration);
    totalPrice = totalPrice + durationPrice[duration];
}
ticketChoices.ticketCost = totalPrice;

ticketChoices.ftCost = foodTokens * extrasPrice[1];
ticketChoices.annCost = annualPasses * extrasPrice[0];

cost = parseFloat(totalPrice + ticketChoices.ftCost + ticketChoices.annCost);

document.getElementById("currentcost").innerHTML = cost.toFixed(2);

ticketChoices.noOfAdults = noOfAdult;
ticketChoices.noOfChildren = noOfChild;
ticketChoices.currentcost = cost;
}

document.getElementById("addtoOrder").onclick = function(){

    if(ticketChoices.currentcost >0){
        document.getElementById("tabelOrder").style = "display: inlineblock;"
    }

    var cost = parseFloat(document.getElementById("currentcost").innerHTML);
    if(cost == 0){
        alert("Please add one more item to continue.")
    }

    var Total = parseFloat(document.getElementById("total").innerHTML);
    var totalFtokens = parseInt(document.getElementById("thFtokens1").innerHTML);
    var totaltokens = parseFloat(document.getElementById("thFtokens2").innerHTML);
    var totalannpasses = parseInt(document.getElementById("thAnnpasses1").innerHTML);
    var totalpasses = parseFloat(document.getElementById("thAnnpasses2").innerHTML);

    var annualPasses = document.getElementById("noofPasses").value;
    var foodTokens = document.getElementById("noofTokens").value;


    if(foodTokens == ""){
        foodTokens =0;
    }
    else{
        foodTokens = parseInt(foodTokens);
    }
    if(annualPasses == ""){
        annualPasses = 0;
    }else{
        annualPasses = parseInt(annualPasses);
    }


    var typeofChoice = document.getElementById("typeofTicket");
    var choiceTxt = typeofChoice.options[typeofChoice.selectedIndex].text;

    var typeofDuration = document.getElementById("duration");
    var durationTxt = typeofDuration.options[typeofDuration.selectedIndex].text;

    var total = ticketChoices.ticketCost;

    var tbody = document.getElementById("tbody");

    if(ticketChoices.noOfAdults>0 || ticketChoices.noOfChildren>0){
        var trow = tbody.insertRow(-1)

        td1 = trow.inserCell(0);
        td1.innerHTML = choiceTxt;

        td2 = trow.inserCell(1);
        td2.innerHTML = document.getElementById("noOfAdult").value;
        td2.style ="text-align:center";

        td3 = trow.inserCell(2);
        td3.innerHTML = document.getElementById("noOfChild").value;
        td3.style ="text-align:center";

        td4 = trow.inserCell(3);
        td4.innerHTML = durationTxt;
        td4.style ="text-align:center";

        td5 = trow.inserCell(4);
        td5.innerHTML = total.toFixed(2);
        td5.style ="text-align:center";

        td6 = trow.inserCell(5);
        //td6.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'><img src="images/recycle bin.png" id ='recycleBin' alt ='recyclebin' > </a>";
    }
    totalFtokens = totalFtokens + foodTokens;
    document.getElementById("thFtokens1").innerHTML = totalFtokens.toFixed(2);
    document.getElementById("thFtokens1").style = "text-align:center";

    totaltokens = totaltokens + ticketChoices.ftCost;
    document.getElementById("thFtokens2").innerHTML = totaltokens.toFixed(2);
    document.getElementById("thFtokens2").style = "text-align:right";

    totalannpasses = totalannpasses + annualPasses;
    document.getElementById("thAnnpasses1").innerHTML = totalannpasses.toFixed(2);
    document.getElementById("thAnnpasses1").style = "text-align:center";

    totalpasses = totalpasses + ticketChoices.annCost;
    document.getElementById("thAnnpasses2").innerHTML = totalpasses.toFixed(2);
    document.getElementById("thAnnpasses2").style = "text-align:right";

    Total = Total + ticketChoices.currentcost;
    document.getElementById("total").innerHTML = Total.toFixed(2);
    document.getElementById("total").style = "text-align:center";

    document.getElementById("currentcost").innerHTML = Total.toFixed(2);

    document.getElementById("overallGtotal").innerHTML = Total.toFixed(2);

    resetpurchaseForm();
    claculateLoyaltypoints();

}

function resetpurchaseForm() {
    document.getElementById("formform").reset();
    document.getElementById("currentcost").innerHTML = "0.00";
}

function removeRecord(item) {
    var result = confirm("Do you want to remove this?");

    if(result == true) {
        var Tabel = document.getElementById("tabelOrder");
        var Total = parseFloat(document.getElementById("totaal").innerHTML);
        var total = parseFloat(item.parentElement.cells[5].innerHTML);
        Total = Total - total;
        document.getElementById("total").innerHTML = Total.toFixed(2);
        document.getElementById("overallGtotal").innerHTML = Total.toFixed(2);
        Tabel.deleteRow(item.parentElement.rowIndex);
    }
}

function removeAnnualPasses(){
    var result = confirm("Do you want to remove all annual passes?");

    if(result == true){
        var totannPasses = parseFloat(document.getElementById("thAnnpasses2").innerHTML);
        var tannPasses = parseFloat(document.getElementById("thAnnpasses1").innerHTML);
        var Total = parseFloat(document.getElementById("total").innerHTML);
        Total = Total - totannPasses;
        document.getElementById("total").innerHTML = Total.toFixed(2);
        document.getElementById("overallGtotal").innerHTML = Total.toFixed(2);
        tannPasses = 0;
        totannPasses = 0;

        document.getElementById("thAnnpasses2").innerHTML = totannPasses;
        document.getElementById("thAnnpasses1").innerHTML = tannPasses;
    }
}

function removeFoodTokens(){
    var result = confirm("Do you want to remove all food tokens?");

    if(result == true){
        var totfoodTokens = parseFloat(document.getElementById("thFtokens2").innerHTML);
        var tfoodTokenss = parseFloat(document.getElementById("thFtokens1").innerHTML);
        var Total = parseFloat(document.getElementById("total").innerHTML);
        Total = Total - totfoodTokens;
        document.getElementById("total").innerHTML = Total.toFixed(2);
        document.getElementById("overallGtotal").innerHTML = Total.toFixed(2);
        totfoodTokens = 0;
        tfoodTokenss = 0;

        document.getElementById("thFtokens2").innerHTML = totfoodTokens;
        document.getElementById("thFtokens1").innerHTML = tfoodTokens;
    }
}

document.getElementById("placeOrder").onclick = function(){
    var overallOrder = parseFloat(document.getElementById("overallGtotal").innerHTML);
    if(overallOrder != 0){
        var tabel = document.getElementById("tbody");
        document.getElementById("total").innerHTML = "0.00"
        document.getElementById("overallGtotal").innerHTML = "0.00"
        tabel.innerHTML = "";
        document.getElementById("tabelOrder").style = "display: none;"
        alert("Thank you for your purchase of tickets!")
    }
    else{
        alert("You cannot place an order without any items.")
    }
}

const form1 = "formform";
const formD = `${form1}`;
const saveBtn = document.querySelector("#addtoFav");
const orderBtn = document.querySelector("#orderFav");
const alertBox = document.querySelector(".alert");
let form = document.querySelector(`#${form1}`);
let formElements = form.elements;

const getFormData = () =>{
    let data = { [formD]: {}};
    for (const element of formElements) {
        if (element.name.length > 0) {
            data[formD] [element.name] = element.value;
        }
    }
    return data;
};

saveButton.onclick = event => {
    event.preventDefault();
    data = getFormDta();
    localStorage.setItem(formD, JSON.stringify(data[formD]));
    const message = "Your order has been saved as a favourite"
    displayAlert(message);

};
const displayAlert = message => {
    alertBox.innerText = message;
    alertBox.style.display = "block";
    setTimeout (function(){ 
        alertBox.style.display = "none";
    }, 2000);
};
 const formautoRefill = () => {
     if(localStorage.key(formD)) {
         const savedD = JSON.parse(localStorage.getItem(formD));
         for (const element of formElements) {
             if(element.name in savedD){
                 element.value = savedD[element.name];
             }
         }
         const message = "Form has been refilled with saved data!";
         displayAlert(message);
         document.getElementById("extra").style.display = "block";
    }
};

orderBtn.onclick = function(){
    formautoRefill();
    calculateCost();
}

var totloyaltyPoints = 0;
var loyaltyPoints = 0;
var totTickets = 0;

function claculateLoyaltypoints(){

    totTickets = totTickets + ticketChoices*noOfAdults + ticketChoices*noOfChildren;
    if(totTickets>3){
        loyaltyPoints = 20 * totTickets;
        totloyaltyPoints = totloyaltyPoints + loyaltyPoints;
        localStorage.setItem("loyalty",totloyaltyPoints);
    }
}

function showloyaltyPoints(){

    totloyaltyPoints = JSON.parse(localStorage.getItem(`loyalty`));

    if(totloyaltyPoints > 0){
        alert("Congratulations!!! you have earned" + totloyaltyPoints + "loyalty points so far");
    }
    else{
        alert("Sorry!!!! you don't have any loyalty points so far")
    }
}

/*Purchase and donate page*/

function donationfunction(event){
    event.preventDefault();

    var name = document.getElementById("fname").value;
    var bday = document.getElementById("baday").value;
    var email = document.getElementById("email").value;
    var mobileNo = document.getElementById("mobile").value;
    var holderName = document.getElementById("holdersname").value;
    var cardNo = document.getElementById("cardNo").value;
    var cvv = document.getElementById("cvv").value;

    localStorage.setItem('name',name);
    localStorage.setItem('birthdate',bday);
    localStorage.setItem('email',email);
    localStorage.setItem('mobile no',mobileNo);
    localStorage.setItem('card holders name',holderName);
    localStorage.setItem('card no',cardNo);
    localStorage.setItem('cvv',cvv);
}
