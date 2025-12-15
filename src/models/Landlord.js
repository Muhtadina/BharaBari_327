export default class Landlord {
  constructor({ full_name, email, password }) {
    this.full_name = full_name;
    this.email = email;
    this.password_hash = password;
    this.account_type = "landlord";
  }

  toBaseUserRow() {
    return {
      full_name: this.full_name,
      email: this.email,
      password_hash: this.password_hash,
      account_type: this.account_type
    };
  }
}
