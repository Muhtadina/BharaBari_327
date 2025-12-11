export default class Admin {
  constructor(data) {
    this.role = "admin";
    Object.assign(this, data);
  }
}
