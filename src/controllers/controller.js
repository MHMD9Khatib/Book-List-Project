const { application } = require('express');
const pool = require('../connection/db');
const queries = require('../database/queries/queries');

const getBooks = (req, res) =>{
    pool.query(queries.getBooks, (error, results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}   

const getBooksById = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getBooksById, [id], (error, results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addBook = (req, res) =>{
    const {name, author} = req.body;
    //check if Book exists
    pool.query(queries.checkEmailExists, [name], (error, results) =>{
        if(results.rows.length) {
            return {msg:"Book already exists."};
            // res.json({msg:"Book already exists."});
        }
        
    });
   
    pool.query(queries.addBook, [name, author], (error, results) =>{
        // res.json({msg:"Book created."});
        if(error) throw error; 
        return {msg:"Book created."};


        
    });

    if({msg:"Book already exists."}){
            res.json({msg:"Book already exists."});

    } else {
            res.json({msg:"Book created."});
 
    }

}

const removeBook = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getBooksById, [id], (error, results) =>{
        const noBookFound = !results.rows.length;
        if(noBookFound){
            res.json({msg:"Book does not exists in the database"});
        }
        pool.query(queries.removeBook, [id], (error, results) =>{
            if(error) throw error; 
            res.status(200).json({msg:"Book removed successfully."});
            
        });
    });
}

const updateBook = (req, res) =>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    pool.query(queries.getBooksById, [id], (error, results) =>{
        const noBookFound = !results.rows.length;
        if(noBookFound){
            res.json({msg:"Book does not exists in the database"});
        }
        pool.query(queries.updateBook, [name, id], (error, results) =>{
            if(error) throw error; 
            res.status(200).json({msg:"Book updated successfully."});
            
        });
    });
    
}







module.exports = {
    getBooks,
    getBooksById,
    addBook,
    removeBook,
    updateBook,
};