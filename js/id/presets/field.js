iD.presets.Field = function(id, field) {
    field = _.clone(field);

    field.id = id;

    field.matchGeometry = function(geometry) {
        return !field.geometry || field.geometry === geometry;
    };

    field.t = function(scope, options) {
        return t('presets.fields.' + id + '.' + scope, options);
    };

    //disabling translation of field labels for now,
    //otherwise this ignores the label from the field definition
    var label = field.label;
    field.label = function() {
        //return field.t('label', {'default': id});
        return label;
    };

      //disabling translation of placeholder labels for now,
    var placeholder = field.placeholder;
    field.placeholder = function() {
        //return field.t('placeholder', {'default': placeholder});
        return placeholder;
    };

    return field;
};
