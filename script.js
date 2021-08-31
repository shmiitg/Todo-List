let addBtn = document.querySelector('.add-btn');
let todo = document.querySelector('#todo');
let list = document.querySelector('.list');
let allItems = [];
//edit variables
let editing = 0;
let editElement;
let editIdx, deleteIdx;

//show items when window loads
showItems();

function getAllItems() {
    let todoList = localStorage.getItem('todoList');
    if (todoList) {
        allItems = JSON.parse(todoList);
    }
}

function showItems() {
    getAllItems();
    allItems.forEach(item => {
        article = createElement(item.id, item.name);
        let deleteBtn = article.children[1].children[0];
        let editBtn = article.children[1].children[1];
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        list.appendChild(article);
    })
}

//add item to list
addBtn.addEventListener('click', addItem);

function addItem() {
    getAllItems();
    let value = todo.value;
    todo.value = '';
    if (value && !editing) {
        let itemId = new Date().getTime().toString()
        let article = createElement(itemId, value);
        list.appendChild(article);
        let len = list.children.length;
        let deleteBtn = document.querySelectorAll('.delete')[len - 1];
        let editBtn = document.querySelectorAll('.edit')[len - 1];
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        allItems.push({ id: itemId, name: value });
    }
    else if (value && editing) {
        allItems[editIdx].name = value;
        editElement.innerText = value;
        addBtn.innerText = 'Add to list';
        editing = 0;
    }
    else {
        console.log('Empty Field');
    }
    localStorage.setItem('todoList', JSON.stringify(allItems));
}

//create article element
function createElement(id, name) {
    let article = document.createElement('article');
    article.classList.add('list-items');
    let attr = document.createAttribute('item-id');
    attr.value = id;
    article.setAttributeNode(attr);
    article.innerHTML = `<p id = "item-name" >${name}</p>
                        <div class="change">
                            <button class="btn delete">
                                <i class="fas fa-trash-alt"></i>
                             </button>
                             <button class="btn edit">
                                <i class="fas fa-edit"></i>
                             </button>
                         </div> `
    return article;
}

//delete item 
function deleteItem(e) {
    let element = e.currentTarget.parentElement.parentElement;
    let itemId = element.getAttribute('item-id');
    list.removeChild(element);
    getAllItems();
    allItems.forEach((item, index) => {
        if (itemId === item.id) deleteIdx = index;
    })
    allItems.splice(deleteIdx, 1);
    localStorage.setItem('todoList', JSON.stringify(allItems));
}

//edit item
function editItem(e) {
    let element = e.currentTarget.parentElement.parentElement;
    let itemId = element.getAttribute('item-id');
    editElement = element.children[0];
    getAllItems();
    allItems.forEach((item, index) => {
        if (itemId === item.id) editIdx = index;
    })
    addBtn.innerText = 'Edit';
    todo.value = editElement.innerText;
    editing = 1;
}