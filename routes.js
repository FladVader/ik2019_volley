const express = require('express');
const router = express.Router();
const database = require('./dbConnection')
const bodyParser = require('body-parser');
const { Integer } = require('better-sqlite3');
router.use(express.json());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async function(req, res) {


    res.json({ message: "This is the server for android studio responding!" });
    console.log("Hello Mama");


});
router.get('/getallgamesPG', async function(req, res) {
    try {
        const allGames = await database.getGamesPG();

        res.json(allGames);
        console.log(allGames)
    } catch (error) {

        console.log(error)
    }
})

router.get('/getgamepg/:id/', async(req, res) => {
    try {
        const game = await database.getGamePG(req.params.id);
        res.json(game);
        console.log("This game: " + game.title);
    } catch (error) {
        console.log(error)
        res.status(400).json('Game not found!')
    }
});

router.post('/addgamepg', async(req, res) => {

    try {
        const newGame = await req.body;


        newGame.title = req.body.title;
        newGame.genre = req.body.genre;
        newGame.platform = req.body.platform;
        newGame.img = req.body.img;

        console.log(newGame + "= newGame");
        const addGame = await database.addGamePg(newGame.title, newGame.genre, newGame.platform, newGame.img);
        res.json(newGame.title + " Added!")

    } catch (error) {

        console.log(error);
    }
});

router.get('/deletegamepg/:id/', async(req, res) => {
    try {
        const game = await database.deleteGamePG(req.params.id);
        res.json(game);
        console.log("This game: " + game.title);
    } catch (error) {
        console.log(error)
        res.status(400).json('Game not found!')
    }
});

router.post('/updategamepg/', async(req, res) => {
    try {
        const updateGame = req.body;
        updateGame.id = req.body.id;
        updateGame.title = req.body.title;
        updateGame.genre = req.body.genre;
        updateGame.platform = req.body.platform;
        updateGame.img = req.body.img;

        console.log(updateGame)

        const updatedGame = await database.updateGamePg(updateGame.id, updateGame.title, updateGame.genre, updateGame.platform, updateGame.img)
        res.json("Game with id:" + updatedGame.id + " updated")

    } catch (error) {
        console.log(error);
        res.status(400).json('Produkten kunde inte uppdateras!')
    }
})

// router.get('/getallgames', async function(req, res) {
//     try {
//         const allGames = await database.getGames();

//         res.json(allGames);
//         console.log(allGames)
//     } catch (error) {

//         console.log(error)
//     }
// })

// router.get('/getgame/:id/', async(req, res) => {
//     try {
//         const game = await database.getGame(req.params.id);
//         res.json(game);
//         console.log("This game: " + game.title);
//     } catch (error) {
//         console.log(error)
//         res.status(400).json('Game not found!')
//     }
// });

// router.post('/addgame', async(req, res) => {

//     try {
//         const newGame = await req.body;

//         newGame.id = req.body.id;
//         newGame.title = req.body.title;
//         newGame.genre = req.body.genre;
//         newGame.platform = req.body.platform;
//         newGame.img = req.body.img;

//         console.log(newGame + "= newGame");
//         const addGame = await database.addGame(newGame.id, newGame.title, newGame.genre, newGame.platform, newGame.img);
//         res.json(newGame.title + " Added!")

//     } catch (error) {

//         console.log(error);
//     }
// });

// router.get('/deletegame/:id/', async(req, res) => {
//     try {
//         const game = await database.deleteGame(req.params.id);
//         res.json(game);
//         console.log("This game: " + game.title);
//     } catch (error) {
//         console.log(error)
//         res.status(400).json('Game not found!')
//     }
// });

// router.post('/updategame/', async(req, res) => {
//     try {
//         const updateGame = req.body;
//         updateGame.id = req.body.id;
//         updateGame.title = req.body.title;
//         updateGame.genre = req.body.genre;
//         updateGame.platform = req.body.platform;
//         updateGame.img = req.body.img;

//         console.log(updateGame)

//         const updatedGame = await database.updateGame(updateGame.id, updateGame.title, updateGame.genre, updateGame.platform, updateGame.img)
//         res.json("Game with id:" + updatedGame.id + " updated")

//     } catch (error) {
//         console.log(error);
//         res.status(400).json('Produkten kunde inte uppdateras!')
//     }
// })


module.exports = router;