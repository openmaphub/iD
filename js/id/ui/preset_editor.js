iD.ui.PresetEditor = function(context) {

    var event = d3.dispatch('cancel', 'save');

    function presetEditor(selection) {

        selection.html('');

        var $pane = selection.append('div')
        .attr('class', 'panewrap')
        .attr('style', 'right: 0%');

        $pane.append('div')
        .attr('class', 'preset-list-pane pane');

        var $entityEditor = $pane.append('div')
        .attr('class', 'entity-editor-pane pane');


        var $header = $entityEditor.append('div');

        var $enter = $entityEditor.append('div')
        .attr('class', 'header fillL cf');

        $enter.append('button')
        .attr('class', 'fr preset-close')
        .append('span')
        .attr('class', 'icon close');


        $enter.append('h3');
        $enter.select('h3')
        .text('Preset Editor');

        $enter.select('.preset-close')    
        .on('click', function () {
            context.enter(iD.modes.Browse(context));
        });

        var $inspectorBody = $entityEditor.append('div')
        .attr('class', 'inspector-body');

        var $inspectorBorder = $inspectorBody.append('div')
        .attr('class', 'inspector-border inspector-preset');

        var $presetForm = $inspectorBorder.append('div')
        .attr('class', 'preset-form inspector-inner fillL3')
        .append('div')
        .attr('class', 'form-field form-field-name');

        $presetForm.append('label')
        .attr('class', 'form-label')
        .text('Preset Name');

        $presetForm.append('input')
        .attr('id', 'preset-input-name')
        .attr('type', 'text');

        var $rawTagEditor = $inspectorBody.append('div')
        .attr('class', 'inspector-border preset-editor inspector-inner');

        function rawTagRow () {

            $selection = d3.select('.tag-list');

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

        $rawTagEditor.append('div')
        .append('ul')
        .attr('class', 'tag-list')
        .call(rawTagRow)


        $rawTagEditor.append('button')
        .on('click', rawTagRow)
        .attr('class', 'add-tag')
        .append('span')
        .attr('class', 'icon plus light');

        $button = $inspectorBody.append('button')
        .attr('class', 'action col4 button preset-editor')
        // FIXME: Ideally, it should fire save and this should be handled in modes.preset_editor.js
        // .on('click', event.save);
        .on('click', applyPresets);

        $button.append('span')
        .attr('class', 'label')
        .text('Save');

        function removeTag () {
            d3.select(this.parentNode).remove();
        }
        
        function applyPresets () {
            var preset = {},
                tags = {},
                geometry = {},
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
            console.log(tags);

        }                

    }

    return d3.rebind(presetEditor, event, 'on');
}