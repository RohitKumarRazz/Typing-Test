const qouteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("qoute");
const userInput = document.getElementById("qoute-input");

let qoute = "";
let time = 60;
let timer = "";
let mistakes = 0;


const renderNewQoute = async () => {
    const response = await fetch(qouteApiUrl);

    let data = await response.json();
    qoute = data.content;
    
    let arr = qoute.split("").map(value => {
        return "<span class='qoute-chars'>"+value+"</span>";
    });
    quoteSection.innerHTML += arr.json(""); 
};

userInput.addEventListener("input", () => {
    let qouteChars = document.querySelectorAll(".quote-chars");
    qouteChars = Array.from(qouteChars);
    let userInputChars = userInput.value.split("");
    qouteChars.forEach((char, index) => {
        if(char.innerText == userInputChars[index]){
            char.classList.add("sucess");
        }
        else if(userInputChars[index] ==null){
            if(char.classList.contains("sucess")){
            char.classList.remove("sucess");
            }
            else{
                char.classList.remove("fail");
            }
        }
        else {
            if(!char.classList.contains("fail")){
                mistakes+=1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }
        let check = qouteChars.every(Element => {
            return Element.classList.contains("sucess");
        });
        if(check){
            displayResult();
        }
        
    });
});

function updateTimer(){
    if(time==0){
        displayResult();
    }
    else{
        document.getElementById("timer").innerText = --time + "s";
    }
}

const timeReduce =() => {
    time = 60;
    timer = setInterval(updateTimer, 1000);

};

const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display="none";
    userInput.disabled = true;
    let timeTaken = 1;
    if(time !=0){
        timeTaken = (60-time)/100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 /timeTaken).toFixed(2)+ "wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes)/ userInput.value.length) + 100) + "%";
};




const startTest = () => {
    mistakes= 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display= "none";
    document.getElementById("stop-test").style.display= "block";

}

window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display= "block";
    document.getElementById("stop-test").style.display= "none";
    userInput.disabled = true;
    renderNewQoute();
};