iD.presets.Field = function(id, field) {
    field = _.clone(field);

    field.id = id;
    label = field.label;

    field.matchGeometry = function(geometry) {
        return !field.geometry || field.geometry.indexOf(geometry) >= 0;
    };

    field.t = function(scope, options) {
        return t('presets.fields.' + id + '.' + scope, options);
    };

    field.label = function() {
        // return field.t('label', {'default': id});

        // FIXME: See line 5? Hardcoded to get custom fields work.
        // Revert to line 16.
        return field.t('label', {'default': label});
    };

    var placeholder = field.placeholder;
    field.placeholder = function() {
        return field.t('placeholder', {'default': placeholder});
    };

    return field;
};
