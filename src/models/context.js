class Context {
  constructor(userId, userRole) {
    Object.freeze(this.userId = userId);
    Object.freeze(this.userRole = userRole);
  }
}

export default Context;