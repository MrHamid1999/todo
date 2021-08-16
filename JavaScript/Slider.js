// trying to get the value of local storage

initialValue = localStorage.getItem("initialValue");

try {
    initialValue = JSON.parse(initialValue)
    initialValue = initialValue.length ? initialValue : null ;
} catch (e) {
    initialValue = null
}
if (initialValue == null) {
  initialValue = [
      {content : "option 1" , status : true}
  ]
}
localStorage.setItem("initialValue", JSON.stringify(initialValue))
initialValue = JSON.parse(localStorage.getItem("initialValue"));

// func that controls local storage
function controller(initialValue) {
    let list = document.querySelector(".list-items")
    list.innerHTML = ""
    Array.from(initialValue).forEach((value, index) => {
        // creating an li and its chils 
        let li = document.createElement("li");
        let text = document.createElement("span");
        let deleteBtn = document.createElement("span");
        li.className = "item";
        text.className = "text-content";
        text.textContent = value.content;
        text.style.textDecoration = value.status ? "initial" : "line-through"
        deleteBtn.className = "zmdi zmdi-delete";
        // adding childs to li
        li.append(text);
        li.append(deleteBtn);
        // adding li in to document
        list.append(li);

        // removal button functions
        deleteBtn.addEventListener("click", e => {
            initialValue.splice(index , 1);
            localStorage.setItem("initialValue" , JSON.stringify(initialValue))
            controller(initialValue);
        })
        // seeing if th content is done
        text.addEventListener("click" , e => {
            value.status = !value.status;
            localStorage.setItem("initialValue" , JSON.stringify(initialValue))
            controller(initialValue);
        })

        // adding new item to todos 
        const addBtn =document.querySelector("button.add-btn");
        addBtn.addEventListener("click" , e => {
            e.preventDefault();
            const parent = addBtn.parentElement;
            let addValue = addBtn.previousElementSibling;
            const addCloser = addValue.previousElementSibling;
            if (addBtn.innerText == "add") {
               addBtn.innerText ="create";
               parent.classList.add("clicked");
            }else{
                addBtn.innerText = "add";
               parent.classList.remove("clicked");
               if (addValue) {
                   addValue = {content : addValue.value , status : true};
                   initialValue.push(addValue);
                   localStorage.setItem( "initialValue" , JSON.stringify(initialValue));
                  
                   controller(initialValue);
                   addBtn.previousElementSibling.value = null
               }

            }
            addCloser.addEventListener("click" , () => {
                addBtn.innerText = "add";
                parent.classList.remove("clicked");
                addBtn.previousElementSibling.value = null
            })
        })

    });
}
controller(initialValue);

// adding search options to project
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click" , () => {
   let searchBox = searchBtn.parentElement;
   let searchValue = searchBtn.previousElementSibling;
    if (searchBtn.innerHTML == "search") {
        searchBtn.innerHTML ="<li class='zmdi zmdi-close'></li>";
        searchBox.classList.add("active")
    } else {
        searchBtn.innerHTML = "search";
        searchBox.classList.remove("active");
        searchValue.value = null;
    }
    searchValue.addEventListener("keyup" , e => {
       
        document.querySelectorAll(".item").forEach(item => {
            
            if(item.innerText.includes(searchValue.value))
            {
                item.style.display = "flex"
            }else{
                item.style.display = "none"

            }
        })
    })
})
