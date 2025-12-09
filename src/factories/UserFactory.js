// Factory -> UserFactory.js
import Renter from "../models/Renter.js";
import Landlord from "../models/Landlord.js";
import Admin from "../models/Admin.js";

export default class UserFactory {
  static createUser(role, data) {
    switch (role) {
      case "renter": return new Renter(data);
      case "landlord": return new Landlord(data);
      case "admin": return new Admin(data);
      default: throw new Error("Unknown role");
    }
  }
}
