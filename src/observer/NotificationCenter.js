// Observer -> NotificationCenter.js
export default class NotificationCenter {
  constructor() { this.subscribers = []; }

  subscribe(user) { this.subscribers.push(user); }

  notify(message) {
    for (let user of this.subscribers) {
      user.update(message);
    }
  }
}
