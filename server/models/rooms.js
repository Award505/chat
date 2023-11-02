const { Model, DataTypes, STRING } = require("sequelize");
const { connection } = require("../db/connection");

class Room extends Model {
  async fillBase() {
    console.log("Filling------>");
    const rooms = ["Green", "Red", "Blue", "Yellow"];
    const data = rooms.map((room) => ({ name: room }));
    await Room.bulkCreate(data);
    console.log("data sucefull build");
  }
}
Room.init(
  {
    name: DataTypes.STRING,
  },

  { sequelize: connection, modelName: "Room", timestamps: false }
);

module.exports = Room;
