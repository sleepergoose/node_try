import User from '../models/user.js';
import Roles from '../models/roles.js';

class PermissionService {
  constructor() {

  }

  isUserAdmin = () => 
    User.getRole === Roles.ADMIN;

  isUserCanRequestUserData = (requesteUserId) => 
    requesteUserId === User.getUserId() || User.getRole() === Roles.ADMIN;
}

export default PermissionService;