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
            {   if(response.status == 403){
                outputTextBox.innerHTML = "Username already in use"
                throw Error("Username already in use")
            } else {
                return response.json()
            }
    
            }
        ).catch((error) => {
            console.log(error.name)
            if(error != null){
                return 
            }
        })
        .then(data => { //need this to not run if duplicate value
            console.log(data)
            outputTextBox.innerHTML = `${usernameInputBox.value} Added`
            nameInputBox.value = "";
            usernameInputBox.value = "";
            passwordInputBox.value = "";
            confirmPasswordInputBox.value= "";
           
        }) 


    
    //.catch() //add code here for 403 Error I think 403 returns sucessfully.

}


function apiCall(userToAdd){
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(userToAdd),
        headers: {"Content-type":
        "application/json; charset=UTF-8"}
    })
    .then(response => 
        {   if(response.status == 403){
            outputTextBox.innerHTML = "Username already in use"
            throw new Error("Username already in use")
        } else {
            return response.json()
        }

        }
    )
    .then(data => {
        console.log(data)
        outputTextBox.innerHTML = `${usernameInputBox.value} Added`
        nameInputBox.value = "";
        usernameInputBox.value = "";
        passwordInputBox.value = "";
        confirmPasswordInputBox.value= "";
       
    })
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