// const axios = require("axios");
const { addOrUpdateCharacter } = require("./dynamo");
const fs = require("fs");
const path = require("path");
// const hp = require("./hp");

const seedDataFileJson = (_) => {
  fs.readFile(path.join(__dirname, "hp.json"), (err, data) => {
    if (err) return err;
    try {
      const characters = JSON.parse(data);
      characters.map((character, i) => {
        addOrUpdateCharacter({ ...character, id: i.toString() });
      });
    } catch (error) {
      console.log(error);
    }
  });
};
seedDataFileJson();

/// AXIOS
// const seedDataAxios = async () => {
//   const url = "https://hp-api.herokuapp.com/api/characters";

//   try {
//     const { data: characters } = await axios.get(url);

//     const characterPromises = characters.map((character,i)=>{

//       addOrUpdateCharacter({...character,id:i.toString()})

//     })

//     await Promise.all(characterPromises)

//   } catch (err) {
//     console.log(err);
//   }
// };

// seedDataAxios();

///// FROM JS

// const seedFromJs = (_) => {
//     hp.map((character, i) => {
//       addOrUpdateCharacter({ ...character, id: i.toString() });
//     });
//   };
  
//   seedFromJs();