var <%= singular %> = Class('<%= singular %>').inherits(Krypton.Model)({
  tableName : <%= name %>
  validations : {},

  relations : {},

  attributes : [],

  prototype : {
    init : function(config) {
      Krypton.Model.prototype.init.call(this, config);

      return this;
    }
  }
});

module.exports = <%= singular %>;
