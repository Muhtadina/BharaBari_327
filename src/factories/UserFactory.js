// src/factories/UserFactory.js
import Renter from "../models/Renter.js";
import Landlord from "../models/Landlord.js";

export default class UserFactory {
  static createUser(account_type, data) {
    const { full_name, user_id } = data;

    // username = First letter of account_type + 3-digit user_id + first3+last2 of full_name
    const prefix = account_type.charAt(0).toUpperCase();
    const idStr = String(user_id).padStart(3, "0");
    const namePart = (full_name.slice(0, 3) + full_name.slice(-2)).toLowerCase();
    const username = prefix + idStr + namePart;

    switch (account_type) {
      case "renter":
        return new Renter({ ...data, username });
      case "landlord":
        return new Landlord({ ...data, username });
      default:
        throw new Error("Unsupported user type");
    }
  }
}
