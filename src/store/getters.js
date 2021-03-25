const getters = {
  user: state => state.user.user,
  sessionId:state=>state.user.sessionId,
  permissionList: state => state.user.permissionList,
  btnPermission:state=>state.user.btnPermission,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
  roles: state => state.user.roles,
  firstLevel: state => state.user.firstLevel,
  secondLevel: state => state.user.secondLevel,
  thirdLevel: state => state.user.thirdLevel,
  alert: state => state.user.alert
}
export default getters
