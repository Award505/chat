const Room = require("../models/rooms");

class RoomController {
  async getRooms(req, res, next) {
    try {
      const rooms = await Room.findAll();
      return res.json(rooms);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new RoomController();
