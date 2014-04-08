iD.modes.PresetEditor = function(context) {
    var ui = iD.ui.PresetEditor(context)
    .on('cancel', cancel)
    .on('save', save);

    function cancel() {
        context.enter(iD.modes.Browse(context));
    }

    function save(preset) {

        var tags = {},
        fields = [],
        geometry = ["point", "area"],
        terms = [],
        id,
        icon,
        name;

        if (preset) {
            id = preset.id;
            geometry = preset.geometry;
            icon = preset.icon;
            name = preset.name();
            terms = preset.terms()
            preset.fields.forEach(function (element) {
                fields.push(element.id);
            });
        }
        else {

            // Get the ID for the preset from the API here.
            id = 'moabi/1';
            name = d3.select('#preset-input-name').value();
        }

        console.log(name);
        var newTags = d3.selectAll('.tag-row');
        newTags.each(function() {
            row = d3.select(this);
            key = row.selectAll('input.key').value(),
            value = row.selectAll('input.value').value();
            tags[key] = value;
        });

        if (validateTags(tags)) {
            iD.data.presets.presets[id] = {'tags': tags, 'geometry': geometry, 'name': name, 'icon': icon, 'terms': terms};
            d3.select('.warning-section').style('display', 'block')
            .text('Preset Saved');
            var presets = iD.presets().load(iD.data.presets);
            context.presets = function() {
                return presets;
            };
            // context.presets().load(iD.data.presets);
        }
        else {
            d3.select('.warning-section').style('display', 'block')
            .text('Tags must have a value.');
        }
    }

    function validateTags (tags) {
        tags = d3.entries(tags);
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].value.length == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    var mode = {
        id: 'preset_editor'
    };

    mode.enter = function() {

        context.ui().sidebar.show(ui);
    };

    mode.save = function(preset) {
        save(preset);
    };

    mode.exit = function() {
        context.ui().sidebar.hide(ui);
    };

    return mode;
};
