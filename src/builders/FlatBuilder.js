// Builder -> FlatBuilder.js
export default class FlatBuilder {
  constructor() { this.flat = {}; }

  setTitle(t) { this.flat.title = t; return this; }
  setLocation(l) { this.flat.location = l; return this; }
  setRent(r) { this.flat.rent = r; return this; }
  setRooms(rs) { this.flat.rooms = rs; return this; }
  setLandlord(id) { this.flat.landlord_id = id; return this; }

  build() { return this.flat; }
}
