import { signInWithPopupGoogleProvider, createUserDocFromAuth } from "./firebase.js"

//elements to select
const usernameEl = document.getElementById("username")
const signInBtn = document.getElementById("SignIn")

//global


//function
const init = () => { }

//events
signInBtn.addEventListener("click", async () => {
    const { user } = await signInWithPopupGoogleProvider()

    const { displayName, email } = user

    const newUser = { displayName, email }

    console.log(user)
    console.log(newUser)

    createUserDocFromAuth(user)

    usernameEl.innerText = newUser.displayName
})

//initial settings
init()



//authentication

//login / signup ---> user does not exist , userExist - password not match

//signup / register ---> user already exists

//logout / signOut

//show userId