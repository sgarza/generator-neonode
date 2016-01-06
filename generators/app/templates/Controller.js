var <%= name %>Controller = Class('<%= name %>Controller').inherits(BaseController)({
  /*
  beforeActions : [
    {
      before : ['_beforeIndex'],
      actions : ['index']
    }
  ],
  */
  prototype : {
    init : function (config){
      BaseController.prototype.init.call(this, config);

      return this;
    },

    index : function(req, res, next) {
      res.render('<%= name.toLowerCase() %>/index.html', {layout : false, localVariable: true });
    },
  }
});

module.exports = new <%=name%>Controller();
