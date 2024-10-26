// IMPORTING OTHER JS HELPING 
import { icons } from "./icons.js";

// SELECTING THE ELEMENTS
let clearAllBtn = document.getElementById("clear-all-btn");
let submitBtn = document.getElementById("submit-btn");
let form = document.getElementById("form");

let fullname = document.getElementById("fullname");
let username = document.getElementById("username");
let password = document.getElementById("password");
let remarks = document.getElementById("remarks");
let email = document.getElementById("email");

let fullnameError = document.getElementById("fullname-error");
let usernameError = document.getElementById("username-error");
let passwordError = document.getElementById("password-error");
let remarksError = document.getElementById("remarks-error");
let emailError = document.getElementById("email-error");
let genderRadios = document.getElementsByName("gender");
let countrySelect = document.getElementById("country");

let flagImage = document.getElementById("flag-image");
let leadsDiv = document.getElementById("leads");

// VARIABLE DECLARATION
let totalLeads = [];
let countryList = [];

// HELPER FUNCTIONS (UTILS)

// fetching the country list via rest api
async function fetchCountryList() {
    try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images", {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await res.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}

// updating the flag according to the select country from the given options
function updateFlag() {
    const selectedCountry = countryList.find(
        (countryObject) => countryObject.name === countrySelect.value
    );
    flagImage.setAttribute("src", selectedCountry.flag);
    flagImage.setAttribute("alt", `${selectedCountry.name} flag`);
}

// reseting the form inputs
function resetValuesAndFlag() {
    fullname.value = "";
    username.value = "";
    email.value = "";
    password.value = "";
    remarks.value = "";
    countrySelect.value = "India";
    genderRadios.forEach((radio) => (radio.checked = false));
    updateFlag();
}

// checking for any errors in the inputs
function hasErrors() {
    if (
        fullnameError.innerText ||
        usernameError.innerText ||
        passwordError.innerText ||
        emailError.innerText ||
        remarksError.innerText
    ) {
        return true;
    } else {
        return false;
    }
}

// setting errors = null
function resetError() {
    fullnameError.innerText = "";
    usernameError.innerText = "";
    passwordError.innerText = "";
    remarksError.innerText = "";
    emailError.innerText = "";
}

// appending the country options to the dropdown
function addCountryList() {
    countryList.forEach((countryObject) => {
        const { name } = countryObject;
        const option = document.createElement("option");
        option.innerText = name;
        option.setAttribute("value", name);
        countrySelect.append(option);
        if (name === "India") {
            option.selected = true;
        }
    });
    updateFlag();
}

// generating the lead div
function setLeadHTMLString(flag, country, email, username, fullname, gender) {
    return `
            <img src="${flag}" alt="${country} flag"/>
            <p class="fullname">${fullname}</p>
            <p class="username">&bull; @${username}</p>
            <p class="email">${email}</p>
            <div class="gender-icon-div">${
                gender === "female" ? icons.female : gender === "male" ? icons.male : icons.other
            }</div>
        `;
}

// EVENT LISTENERS

// initial load event listener
window.addEventListener("load", async (e) => {
    countryList = await fetchCountryList();
    addCountryList();

    const savedLeads = localStorage.getItem("leads");
    totalLeads = savedLeads ? JSON.parse(savedLeads) : [];
    if (totalLeads.length) {
        totalLeads.forEach((lead) => {
            const { fullname, username, email, gender, country } = lead;
            const selectedCountry = countryList.find(
                (countryObject) => countryObject.name === country
            );
            const eachLead = document.createElement("div");
            eachLead.innerHTML = setLeadHTMLString(
                selectedCountry?.flag,
                country,
                email,
                username,
                fullname,
                gender
            );
            eachLead.setAttribute("class", "lead");
            leadsDiv.append(eachLead);
        });
    }
});

// onChange()
countrySelect.addEventListener("change", updateFlag);

// onReset()
form.addEventListener("reset", (e) => {
    e.preventDefault();
    resetValuesAndFlag();
    resetError();
});

// onMouseOver()
submitBtn.addEventListener("mouseover", (e) => {
    submitBtn.disabled = hasErrors();
});

// onClick()
clearAllBtn.addEventListener("click", (e) => {
    localStorage.removeItem("leads");
    while (leadsDiv.firstChild) {
        leadsDiv.removeChild(leadsDiv.firstChild);
    }
});

// onSubmit()
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (hasErrors()) return;
    else {
        let gender;
        genderRadios.forEach((radio) => {
            if (radio.checked) {
                gender = radio.value;
            }
        });

        totalLeads = [
            ...totalLeads,
            {
                fullname: fullname.value,
                username: username.value,
                email: email.value,
                password: password.value,
                country: countrySelect.value,
                remarks: remarks.value,
                gender,
            },
        ];

        localStorage.setItem("leads", JSON.stringify(totalLeads));
        const selectedCountry = countryList.find(
            (countryObject) => countryObject.name === countrySelect.value
        );
        const newLead = document.createElement("div");
        newLead.innerHTML = setLeadHTMLString(
            selectedCountry?.flag,
            countrySelect.value,
            email.value,
            username.value,
            fullname.value,
            gender
        );
        newLead.setAttribute("class", "lead");
        leadsDiv.append(newLead);
        resetValuesAndFlag();
    }
});

// DATA VALIDATION HANDLERS

// data validation via regex
function validate(type, value) {
    if (value && type) {
        switch (type) {
            case "fullname": {
                return /^[a-zA-Z]{1,15}$/.test(value) ? true : false;
            }
            case "username": {
                return value.length <= 12 ? true : false;
            }
            case "email": {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,100}$/.test(value)
                    ? true
                    : false;
            }
            case "password": {
                return value.length > 8 && value.length < 12 ? true : false;
            }
            case "remarks": {
                return value.length <= 256 ? true : false;
            }
            default: {
                console.log("please provide a defined type to validate.");
            }
        }
    }
}

// onBlur()
fullname.addEventListener("blur", (e) => {
    if (fullname.value && !validate("fullname", fullname.value)) {
        fullnameError.innerText = `only letters are allowed.`;
    } else {
        fullnameError.innerText = "";
    }
});

username.addEventListener("blur", (e) => {
    if (username.value && !validate("username", username.value)) {
        usernameError.innerText = `max length allowed is 12 char.`;
    } else {
        usernameError.innerText = "";
    }
});

email.addEventListener("blur", (e) => {
    if (email.value && !validate("email", email.value)) {
        emailError.innerText = `please enter a valid email.`;
    } else {
        emailError.innerText = "";
    }
});

password.addEventListener("blur", (e) => {
    if (password.value && !validate("password", password.value)) {
        passwordError.innerText = `password should be 8-12 char.`;
    } else {
        passwordError.innerText = "";
    }
});

remarks.addEventListener("blur", (e) => {
    if (remarks.value && !validate("remarks", remarks.value)) {
        remarksError.innerText = `exceeded 256 char length is allowed`;
    } else {
        remarksError.innerText = "";
    }
});
