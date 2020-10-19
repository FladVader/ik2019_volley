const promise = require('bluebird');
const Database = require('better-sqlite3');
const db = new Database('database.db', { verbose: console.log });
var pg = require('pg');

var conString = process.env.ELEPHANTSQL_URL || "postgres://ysbibvle:7wD-LX4KUqbOCF9XOiHe4Q4xKRt0VZaE@hattie.db.elephantsql.com:5432/ysbibvle";

var client = new pg.Client(conString);

const getGamesPG = async() => {
    return new Promise((resolve, reject) => {

        client.connect(async function(err) {

            if (err) {
                return console.error('could not connect to postgres', err);
            }
            client.query('SELECT * FROM videogames_v2', function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                console.log(result.rows);
                client.end();
                resolve(result.rows);


            });
        })
    })
}

const getGames = () => {

    try {
        const sql = db.prepare(`SELECT * FROM videogames_v2`);
        const games = sql.all();
        return (games);

    } catch (error) {

        throw Error("Could not fetch from database")
    }
};

const getGame = async(id) => {

    try {
        const sql = db.prepare(`SELECT * FROM videogames_v2 WHERE id= ?`);
        const game = sql.get(id);
        return (game);


    } catch (error) {
        throw Error("Could not fetch from database");

    }
};

const addGame = async(id, title, genre, platform, img) => {

    try {
        const sql = db.prepare(`INSERT INTO videogames_v2 (id, title, genre, platform, img)
        VALUES (?, ?, ?, ?, ?)`);
        const newInsert = sql.run(id, title, genre, platform, img);
        console.log("Insert of " + id, title, genre, platform, img + " Succeded!")
        return;

    } catch (error) {

        throw Error("could not insert game" + error)
    }
};

const deleteGame = async(id) => {
    try {
        const sql = db.prepare(`SELECT * FROM videogames_v2 WHERE id= ?`);
        const game = sql.get(id);
        if (game) {

            const sql = db.prepare(`DELETE FROM videogames_v2 WHERE id= ?`);
            sql.run(id);
            return (game);
        } else {
            throw Error('Något gick fel!')
        }

    } catch (error) {
        console.log(error);
        throw error;

    }
};

const updateGame = async(id, title, genre, platform, img) => {

    try {

        const sql = db.prepare(`SELECT * FROM videogames_v2 WHERE id= ?`);
        const game = sql.get(id);

        if (game) {
            const sql = db.prepare(`UPDATE videogames_v2 SET title=?, genre=?, platform=?, img=? WHERE id= ?`);
            const updatedGame = sql.run(title, genre, platform, img, id);
            return (game);
        } else {
            console.log(game)
            throw Error('Could not update game!');

        }

    } catch (error) {

        throw error;

    }
};





// const sqlite = require('sqlite3');

// const dbCon = new sqlite.Database('./database.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log('Connected to the "videogames" database.');
//     }
// });

// const getGames = () => {

//     //THE GOLDEN KEY! ---> RESOLVE (response)
//     return new Promise((resolve, reject) => {

//         let sql = `SELECT * FROM videogames`;

//         dbCon.all(sql, [], (err, games) => {
//             if (err) {
//                 throw err;
//             } else {


//                 resolve(games);
//             }
//         });

//         // close the database connection
//         dbCon.close();
//     })
// }

module.exports = { getGames, getGame, addGame, deleteGame, updateGame, getGamesPG };