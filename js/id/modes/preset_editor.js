iD.modes.PresetEditor = function(context) {
    var ui = iD.ui.PresetEditor(context)
    .on('cancel', cancel)
    .on('save', save);

    function cancel() {
        context.enter(iD.modes.Browse(context));
    }

    function save(e) {
        console.log("some saving happens")
        var tags = {},
        geometry = ["point", "area"],
        fields = {},
        name = {};

        var presetName = d3.select('#preset-input-name').value();

        var newTags = d3.selectAll('.tag-row');
        newTags.each(function() {
            row = d3.select(this);
            key = row.selectAll('input.key').value(),
            value = row.selectAll('input.value').value();
            tags[key] = value;
        });

        if (validateTags(tags)) {
            iD.data.presets.presets[presetName] = {'tags': tags, 'geometry': geometry, 'name': presetName};
            d3.select('.warning-section').style('display', 'block')
            .text('New Preset Saved');
            context.presets().load(iD.data.presets);
        }
        else {
            d3.select('.warning-section').style('display', 'block')
            .text('Tags must have a value.');
        }
    }

    function validateTags (tags) {
        tags = d3.entries(tags);
        console.log(tags);
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

    mode.save = function() {
        save();
    };

    mode.exit = function() {
        context.ui().sidebar.hide(ui);
    };

    return mode;
};
