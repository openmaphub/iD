iD.ui.PresetEditor = function(context) {

    var event = d3.dispatch('cancel', 'save');

    function presetEditor(selection) {

        selection.html('');

        var header = selection.append('div')
            .attr('class', 'header fillL');

        header.append('button')
            .attr('class', 'fr')
            .on('click', function() {context.enter(iD.modes.Browse(context));})
            .append('span')
            .attr('class', 'icon close');

        header.append('h3')
            .text('Preset Editor');

        var body = selection.append('div')
            .attr('class', 'body');

        var presetSection = body.append('div')
            .attr('class', 'modal-section')

        var presetForm = presetSection.append('div')
            .attr('class', 'preset-form fillL3');

        var presetFormField = presetForm.append('div')
            .attr('class', 'form-field form-field-name');

        var presetNameLabel = presetFormField.append('label')
            .attr('class', 'form-label')
            .text('Preset Name');

        var presetNameForm = presetFormField.append('input')
            .attr('id', 'preset-input-name')
            .attr('style', 'width: 100%;');

        var tagSection = body.append('div')
            .attr('class', 'modal-section');

        var presetEditor = tagSection.append('div')
            .attr('class', 'preset-editor')

        var tagList = presetEditor.append('div')
            .append('ul')
            .attr('class', 'tag-list')
            .call(rawTagRow);

        var addTagButton = presetEditor.append('button')
            .on('click', rawTagRow)
            .attr('class', 'add-tag')
            .append('span')
            .attr('class', 'icon plus light');

        var saveButton = body.append('modal-section')
            .append('button')
            .attr('class', 'action col4 button preset-editor')
            .on('click', applyPresets)
            .text('Save');

        function rawTagRow () {

            $selection = d3.select('.sidebar-component .tag-list');

            $enter = $selection.append('li')
            .attr('class', 'tag-row cf');

            $enter.append('div')
            .attr('class', 'key-wrap')
            .append('input')
            .property('type', 'text')
            .attr('class', 'key')
            .attr('maxlength', 255);

            $enter.append('div')
            .attr('class', 'input-wrap-position')
            .append('input')
            .property('type', 'text')
            .attr('class', 'value')
            .attr('maxlength', 255);

            $enter.append('button')
            .attr('tabindex', -1)
            .attr('class', 'remove minor')
            .on('click', removeTag)
            .append('span')
            .attr('class', 'icon delete');

            $enter.append('div')
            .attr('class', 'tag-reference-body cf');
        }

        // $button = $inspectorBody.append('button')
        // .attr('class', 'action col4 button preset-editor')
        // FIXME: Ideally, it should fire save and this should be handled in modes.preset_editor.js
        // .on('click', event.save);
        // .on('click', applyPresets);

        // $button.append('span')
        // .attr('class', 'label')
        // .text('Save');

        function removeTag () {
            d3.select(this.parentNode).remove();
        }
        
        function applyPresets () {
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
            iD.data.presets.presets[presetName] = {'tags': tags, 'geometry': geometry, 'name': presetName};
            context.presets().load(iD.data.presets);
        }                

    }

    return d3.rebind(presetEditor, event, 'on');
}