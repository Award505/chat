import $api from "../http";

export default class RoomService {
  static fetchRooms() {
    return $api.get("/rooms");
  }
}
