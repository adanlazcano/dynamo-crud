const { DynamoClient, TABLE_NAME } = require("./credentials");

const getCharacters = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  const characters = await DynamoClient.scan(params).promise();

  return characters;
};

const getCharacterById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

  return await DynamoClient.get(params).promise();
};

const addOrUpdateCharacter = async (character) => {
  try {
    // console.log(character);
    const params = {
      TableName: TABLE_NAME,
      Item: character,
    };

    return await DynamoClient.put(params).promise();
  } catch (err) {
    console.log(err.message);
  }
};
const deleteCharacter = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };

 return await DynamoClient.delete(params).promise();
};

module.exports = {
  DynamoClient,
  getCharacters,
  getCharacterById,
  addOrUpdateCharacter,
  deleteCharacter,
};
