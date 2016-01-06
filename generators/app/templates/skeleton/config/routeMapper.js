var routeMapper = new RouteMapper();;

routeMapper
  .root('Home#index')
  .get('/no-layout', {to : 'Home#noLayout'});

module.exports = routeMapper;
