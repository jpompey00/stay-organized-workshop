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

    submitButton.onclick = onsubmitButtonClick;
}

function onsubmitButtonClick() {

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
            let userToAdd = createUserJson(nameInputBox.value, usernameInputBox.value,passwordInputBox.value);
            addUser(userToAdd);
        }
    } else {
        outputTextBox.innerHTML = "Please fill out the entire form"
    }
   

    //if time permits check if username is shared by another user.
}


function addUser(userToAdd){
    console.log(userToAdd);

    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(userToAdd),
        headers: {"Content-type":
        "application/json; charset=UTF-8"}
    })
    .then(response => 
        {   console.log(response);
          //  alert(response);
            return response.json()
        }
    )
    .then(data => {
        console.log(data)

        return false;
    });
    //.catch() //add code here for 403 Error I think 403 returns sucessfully.

}


//add some algorithm to simulate a random password and a way to test that.
function createUserJson(name,username,password){
    let userObject = {
        "name" : `${name}`,
        "username" : `${username}`,
        "password" : `${password}`
    }
    return userObject;
}