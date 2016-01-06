var <%= name %>Controller = Class('<%= name %>Controller').inherits(RestfulController)({
  /*
  beforeActions : [
    {
      before : ['_beforeIndex'],
      actions : ['index']
    }
  ],
  */
  prototype : {
    init : function(config) {
      RestullController.prototype.init.call(this, config);

      return this;
    },

    index : function index(req, res, next) {
      res.render('<%= name.toLowerCase() %>/index.html', {layout : false});
    },

    show : function show(req, res, next) {
      res.render('<%= name.toLowerCase() %>/show.html', {layout : false});
    },

    new : function(req, res, next) {
      res.render('<%= name.toLowerCase() %>/new.html');
    },

    create : function create(req, res, next) {
      res.redirect('/<%= singular.toLowerCase() %>/id');
    },

    edit : function edit(req, res, next) {
      res.render('<%= name.toLowerCase() %>/edit.html', {layout : false});
    },

    update : function update(req, res, next) {
      res.redirect('/<%= singular.toLowerCase() %>/id');
    },

    destroy : function destroy(req, res, next) {
      res.redirect('/<%= name.toLowerCase() %>');
    }
  }
});

module.exports = new <%= name %>Controller();
