import Roles from '../models/roles.js';

class PermissionService {
  constructor() {

  }

  isUserAdmin = (context) =>
    context.userRole === Roles.ADMIN;

  isUserCanRequestUserData = (context, requesteUserId) =>
    requesteUserId === context.userId() || context.userRole === Roles.ADMIN;
}

export default PermissionService;