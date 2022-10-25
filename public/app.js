
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.querySelector("#book-form");
const action = document.querySelector(".Action");
const list = document.querySelector('#book-list');

fetch('/api/v1/booklist/')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let authors = data;

        authors.map(function (author) {

            const row = document.createElement('tr');
            list.appendChild(row);
            const td1 = document.createElement('td');
            row.appendChild(td1);
            td1.textContent = `${author.name}`;
            const td2 = document.createElement('td');
            row.appendChild(td2);
            td2.textContent = `${author.author}`;
            const td3 = document.createElement('td');
            row.appendChild(td3);
            const input = document.createElement('input');
            input.classList.add("btn")
            input.classList.add("btn-danger")
            input.classList.add("btn-sm")
            input.classList.add("delete")
            input.setAttribute("id", author.id);
            input.value = 'Delete';
            input.type = "submit";
            td3.appendChild(input);
        });
    })
    .catch(function (error) {
        console.log(error);
    });


    form.addEventListener('submit', (e) => {
        console.log('clicked');
        e.preventDefault();
        let name = e.target[0].value;
        let desc = e.target[1].value;
        let obj = {
            name,
            author: desc
        }
        console.log(JSON.stringify(obj));
        fetch('/api/v1/booklist/', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                location.reload(); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
    })



// EVENT: REMOVE A BOOK
list.addEventListener('click', (e) => {
    fetch(`/api/v1/booklist/${e.target.id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application.json",
        }
    }).then((res) => {
        if (res.ok) {
            console.log("http req successful");

        } else {
            console.log("http req unsuccessful");
        }
    })
        .catch((err) => console.log(err));

});

list.addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlerts('Book Removed', 'success');
});



// Book Class
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// UI Class
class UI {

    // FUNCTION TO DISPLAY THE BOOKS IN TABLE
    static displayBooks() {
        let books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));

        // console.log(books);
    }

    // FUNCTION TO ADD A BOOK TO THE TABLE
    static addBookToList(book) {
        // const list = document.querySelector('#book-list');

        // const row = document.createElement('tr');

        // row.innerHTML = `
        //     <td>${book.title}</td>
        //     <td>${book.author}</td>
        //     <td><a href="#" class="btn btn-danger btn-sm delete" id="delete">X</a></td>
        // `;

        // list.appendChild(row);
    }

    // FUNCTION TO CLEAR FIELDS AFTER ADDING THE BOOK
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }

    // FUNCTION TO DELETE A BOOK FROM TABLE
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    // FUNCTION TO SHOW ALERT
    static showAlerts(message, className) {
        // CREATE ALERT DIV WITH ALL NECESSARY PROPERTIES
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        // ADD MESSAGE TO THIS DIV
        div.appendChild(document.createTextNode(message));
        // ADD DIV TO DOM
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// STORE CLASS : HANDLES STORAGE
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static saveBook(book) {
        let books;
        books = Store.getBooks();
        books.push(book);
    }

    static removeBook(author) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.author === author) {
                books.splice(index, 1);
            }
        });

    }
}

// EVENT: DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// EVENT: ADD BOOK TO LIST 
document.querySelector('#book-form').addEventListener('submit', (e) => {

    // PREVENT DEFAULT
    e.preventDefault();

    // GET VALUES
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    if (title === '' || author === '') {
        UI.showAlerts('Please fill in all details...', 'danger');
    } else {
        // CREATE BOOK OBJECT
        const book = new Book(title, author);

        // ADD BOOK TO LIST
        UI.addBookToList(book);

        // SAVE BOOK TO LOCAL STORAGE
        Store.saveBook(book);

        // SHOW SUCCESS MESSAGE
        UI.showAlerts('Book Added', 'success');

        // CLEAR FIELDS
        UI.clearFields();
    }

});

