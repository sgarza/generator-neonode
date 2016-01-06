var _      = require('lodash');
_.mixin(require('lodash-inflection'));

var routeMapper = require('./../config/routeMapper.js');

var router = global.neonode.express.Router();

logger.info('Loading routes...');
logger.info("\n\n\n\n\n");

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

    if (beforeActions.length > 0) {
      var filters = beforeActions.filter(function(item) {
          if (item.actions.indexOf(action) !== -1) {
              return true;
          }
      }).map(function(item) {
          return item.before;
      });

      _.flatten(filters).reverse().forEach(function(filter) {
        if (_.isString(filter)) {
          args.push(neonode.controllers[controller][filter]);
        } else if (_.isFunction(filter)) {
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
logger.info("\n\n");

logger.info('Route Helpers:');

for (var helper in routeMapper.helpers) {
  logger.info(helper)
}

logger.info("\n\n\n\n\n");

module.exports = router;
