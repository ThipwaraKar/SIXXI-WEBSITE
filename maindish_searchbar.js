// use for main dish suggestion menu search bar
// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            // console.log(userData);
            // if(userData == "Air Fryer Pork Chops" || userData == "Baked Pork Chops" || userData == "French Onion Pork Chops" || userData == "Garlic Rosemary Pork Chops" || userData == "Glazed Pork Tenderloin" || userData == "Instant Pot Pork Chops" || userData == "Instant Pot Pulled Pork" || userData == "Roast Pork Tenderloin" || userData == "Stuffed Pork Loin")
            // {
            //     // return data = `<li><a style="text-decoration:none; color: inherit;" href="Pork/${data}.html"> ${data}</a></li>`;
            //     webLink = `Prok/${userData}.html`;
            // }
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            if(data == "5-Ingredient Asian Grilled Salmon Marinade" || data == "Baked Cajun Parmesan Salmon" || data == "Fiesta Salmon Rice Bowls" || data == "Garlic Butter Baked Salmon" || data == "Grilled Salmon" || data == "Salmon Cakes with Roasted Red Bell Pepper Sauce" || data == "Salmon In Sun Dried Tomato Cream Sauce With Pearl Couscous" || data == "Salmon Nicoise Salad" || data == "Salmon Pasta In Parmesan Cream Sauce")
            {
                return data = `<li><a style="text-decoration:none; color: inherit;" href="Fish/${data}.html"> ${data}</a></li>`;
            }
            if(data == "Air Fryer Pork Chops" || data == "Baked Pork Chops" || data == "French Onion Pork Chops" || data == "Garlic Rosemary Pork Chops" || data == "Glazed Pork Tenderloin" || data == "Instant Pot Pork Chops" || data == "Instant Pot Pulled Pork" || data == "Roast Pork Tenderloin" || data == "Stuffed Pork Loin")
            {
                return data = `<li><a style="text-decoration:none; color: inherit;" href="Pork/${data}.html"> ${data}</a></li>`;
            }
            else if(data == "Buffalo Chicken Bites with Blue Cheese Dressing" || data == "Chicken Empanadas" || data == "Chicken Piccata" || data == "Creamy Tomato Chicken Skillet Dinner" || data == "Lemon Chicken" || data == "One Pan Honey Mustard Chicken and Vegetables" || data == "Pesto Chicken Bruschetta" || data == "Roasted Salsa Verde Chicken Nachos" || data == "Stovetop Butter Chicken")
            {
                return data = `<li><a style="text-decoration:none; color: inherit;" href="Chicken/${data}.html"> ${data}</a></li>`;
            }
            else if(data == "Beef Sliders with Sun-Dried Tomato Mayo and Spicy Pickles" || data == "Classic Cheese Burger with Secret Sauce" || data == "Crock-Pot Taco Meat" || data == "Gingery Ground Beef (Soboro Donburi)" || data == "Low-Carb Bacon Burger with Guacamole" || data == "Meatball Sub Sandwich" || data == "Patty Melt" || data == "Swedish Meatballs" || data == "Thai Basil Beef")
            {
                return data = `<li><a style="text-decoration:none; color: inherit;" href="Beef/${data}.html"> ${data}</a></li>`;
            }
            else if(data == "Creamy Goat Cheese Polenta With Ratatouille" || data == "Curried Cauliflower Quinoa Salad" || data == "Curried Pumpkin Soup" || data == "Green Curry Buddha Bowl" || data == "Shaved Brussels Sprout Salad with Creamy Maple Dressing" || data == "Vegan Roasted Sweet Potato Salad" || data == "Vegetable Soup" || data == "Vegetarian Burrito Bowl with Avocado Crema" || data == "Walnut and Lentil Bolognese")
            {
                return data = `<li><a style="text-decoration:none; color: inherit;" href="Vegetarian/${data}.html"> ${data}</a></li>`;
            }
            else
            {
                return data = `<li>${data}</li>`;
            }  
            
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}