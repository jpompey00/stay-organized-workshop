"use strict";

const nameInputBox = document.getElementById("nameInputBox");
const usernameInputBox = document.getElementById("usernameInputBox");
const passwordInputBox = document.getElementById("passwordInputBox");
const confirmPasswordInputBox = document.getElementById("confirmPasswordInputBox");
const submitButton = document.getElementById("submitButton");
const outputTextBox = document.getElementById("outputTextBox");


const API_URL = "http://localhost:8083/api/users";
window.onload = () => {
    console.log("connected");

    addUser();
    submitButton.onclick = onsubmitButtonClick;
}

function onsubmitButtonClick() {
    let username;
    let password;
    //check if the inputboxes all have values
    if (usernameInputBox.value != ""
        && passwordInputBox.value != ""
        && confirmPasswordInputBox.value != ""
    ) {
         //check if password and confirmation match
        if (passwordInputBox.value != confirmPasswordInputBox.value) {
            outputTextBox.innerHTML = "Passwords do not match"
        } else {
            //what runs if all the validation is correct.
            username = usernameInputBox.value;
            password = passwordInputBox.value;


        }
    } else {
        outputTextBox.innerHTML = "Please fill out the entire form"
    }
   

    //if time permits check if username is shared by another user.
}


function addUser(userToAdd){
    fetch(API_URL, {
        method: "POST",
        body: userToAdd,
        headers: {"Content-type":"application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch() //add code here for 403 Error I think 403 returns sucessfully.
}


function createUserJson(username,password){
    let userObject = {

    }
}