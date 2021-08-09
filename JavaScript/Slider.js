// this part is for dinamic js 
// three parts need change:
// 1:search button  2:items  3:add button


// 1:search button => changing the shape of button on first click
// after filling the input on key press search will began
const searchBtn = document.querySelector(".serach-btn");
const searchBox = searchBtn.previousElementSibling;
let items = document.querySelectorAll(".item");
searchBtn.addEventListener("click" , () => {
    const searchWrapper = searchBtn.parentElement;
    searchWrapper.classList.toggle("active");
    searchBox.value = "";
    if (searchWrapper.classList[1]) {
        searchBtn.innerHTML = "<li class='zmdi zmdi-close'></li>"
    } else {
        searchBtn.innerHTML = "search"  
    }
    items.forEach(item => {
        item.style.display = "flex"

    })

})
searchBox.addEventListener("keyup" , () => {
    const searchValue = searchBox.value;
    console.log(searchValue);
    items.forEach(item => {
        let itemValue = item.textContent;
      if (itemValue.includes(searchValue)) {
        item.style.display = "flex"
          
      } else {
          item.style.display = "none"
      }
   
     
    })
    
})
const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click" , () => {
    const addBox = addBtn.previousElementSibling;
    if (addBtn.innerHTML == "add") {
        addBtn.innerHTML = "create";
        addBox.style.display = "flex";
    } else {
        const newItemValue = addBox.value;
        const newItem = items[0].cloneNode(true);
        addBtn.innerHTML = "add";
        addBox.style.display = "none";
        addBox.value= null;
        
    }
})
