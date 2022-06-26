const express = require("express");
const {
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacter,
} = require("./dynamo");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.get("/", (_, res) => {
  res.send("server running");
});

app.get("/characters", async (req, res) => {
  try {
    const character = await getCharacters();
    res.status(200).json(character.Items.sort((a,b)=>a.id.localeCompare(b.id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/characters/:id", async (req, res) => {
  try {
    const character = await getCharacterById(req.params.id);
    if (Object.keys(character).length === 0)
      return res.status(400).json({ message: "Id not found" });
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/characters", async (req, res) => {
  try {
    const character = req.body;
    const newCharacter = await addOrUpdateCharacter(character);
    res.status(200).json(newCharacter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/characters/:id", async (req, res) => {
  try {
    const character = req.body;
    const { id } = req.params;
    character.id = id;
    const updatedCharacter = await addOrUpdateCharacter(character);
    res.status(200).json(updatedCharacter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
     await deleteCharacter(id);
    res.status(200).json(`Character with ID: ${id} removed`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use((_, res) => {
  res.status(404).json({ message: "route not found" });
});

app.listen(PORT, (_) => {
  console.log(`Server running on port ${PORT}`);
});
