const getBooks = "SELECT * FROM bookinfo";
const getBooksById = "SELECT * FROM bookinfo WHERE id = $1";
const checkEmailExists = "SELECT s FROM bookinfo s WHERE s.name = $1";
const addBook = "INSERT INTO bookinfo (name, author) VALUES ($1, $2)";
const removeBook = "DELETE FROM bookinfo WHERE id= $1"
const updateBook = "UPDATE bookinfo SET name = $1 WHERE id = $2" ;

module.exports = {
    getBooks,
    getBooksById,
    checkEmailExists,
    addBook,
    removeBook,
    updateBook,
}

