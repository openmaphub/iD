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
        name,
        preset;

        var newTags = d3.selectAll('.tag-row');
        newTags.each(function() {
            var row = d3.select(this);
            var key = row.selectAll('input.key').value(),
            value = row.selectAll('input.value').value();
            tags[key] = value;
        });

        if (validateTags(tags)) {
            if (preset) {
                id = preset.id;
                geometry = preset.geometry;
                icon = preset.icon;
                name = preset.name();
                terms = preset.terms()
                preset.fields.forEach(function (element) {
                    fields.push(element.id);
                });

                preset = {'tags': tags, 'geometry': geometry, 'name': name, 'icon': icon, 'terms': terms};

            // FIXME: use connection.url
            var request = d3.xhr(context.connection().presetsURL+'/'+id.split('/')[1]+'/update.json');
            request.header("Content-Type", "application/x-www-form-urlencoded")
            .post('json='+JSON.stringify(preset), function(error, response) {
              iD.data.presets.presets[id] = {'tags': tags, 'geometry': geometry, 'name': name, 'icon': icon, 'terms': terms};
              d3.select('.warning-section').style('display', 'block')
              .text('Changes Saved');
              var presets = iD.presets().load(iD.data.presets);
              context.presets = function() {
                return presets;
            };
        })

        }
        else {

        // New preset.
        // Get the ID for the preset from the API here.
        name = d3.select('#preset-editor-input-name').value();
        console.log(name);
        preset = {'tags': tags, 'geometry': geometry, 'name': name, 'icon': icon, 'terms': terms};

        // FIXME: use connection.url
        request = d3.xhr(context.connection().presetsURL+'.json');
        request
        .header("Content-Type", "application/x-www-form-urlencoded")
        .post('json='+JSON.stringify(preset), function(error, response) {
            id = d3.entries(JSON.parse(response.responseText))[0].key;
            iD.data.presets.presets[id] = {'tags': tags, 'geometry': geometry, 'name': name, 'icon': icon, 'terms': terms};
            d3.select('.warning-section').style('display', 'block')
            .text('Preset Saved');
            var presets = iD.presets().load(iD.data.presets);
            context.presets = function() {
                return presets;
            };
        });
    }

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
        context.connection().authenticate(function() {
            context.ui().sidebar.show(ui);
        });

    // context.ui().sidebar.show(ui);
};

mode.save = function(preset) {
    save(preset);
};

mode.exit = function() {
    context.ui().sidebar.hide(ui);
};

return mode;
};
