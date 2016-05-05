var _ = require('lodash');
_.mixin(require('lodash-inflection'));

var routeMapper = CONFIG.router;

var router = global.neonode.express.Router();

logger.info('Loading routes...');

logger.info('Routes')
routeMapper.routes.forEach(function(route) {
  var controller = route.controller.split('/').join('.');
  var action     = route.action;
  var verbs      = route.verb;

  verbs.forEach(function(verb) {
    logger.info(verb + ': ' + route.path + ' ' + controller + '#' + action);

    var controllerMethod = neonode.controllers[controller][action];
    var beforeActions    = neonode.controllers[controller].constructor.beforeActions;

    var args = [];

    /* Get the beforeActions from the controller and filter the ones that
       match the current route.action and flatten the result*/
    if (beforeActions.length > 0) {
      var filters = _.flatten(beforeActions.filter(function(item) {
        if (item.actions.indexOf(action) !== -1) {
          return true;
        }
      }).map(function(item) {
        return item.before;
      }));


      filters.forEach(function(filter) {
        if (_.isString(filter)) { // if is string look for the method in the same controller
          if (neonode.controllers[controller][filter]) {
            args.push(neonode.controllers[controller][filter]);
          } else {
            throw new Error('BeforeActions Error: Unknown method ' + filter + ' in ' + controller);
          }
        } else if (_.isFunction(filter)) { // if is a function just add it to the middleware stack
          args.push(filter);
        } else {
          throw new Error('Invalid BeforeAction ' + filter);
        }
      });
    }

    args.push(controllerMethod);

    router.route(route.path)[verb](args);
  });
});

logger.info("---------------------------------");
logger.info('\n');

logger.info('Route Helpers:');

for (var helper in routeMapper.helpers) {
  logger.info(helper)
}

logger.info('\n');

module.exports = router;
