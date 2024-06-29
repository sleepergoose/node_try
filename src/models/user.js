let instance = null; 

class User {
  constructor(id, role) {
    if (!instance) {
      this._id = id;
      this.role = role;
      instance = this;
    } else {
      return instance;
    }
  }

  static setCurrentUser = (id, role) => {
    
    if (instance) {
      return instance;
    }

    return new User(id, role);
  };

  static getUserId = () => instance._id;

  static getRole = () => instance.role;
}

export default User;