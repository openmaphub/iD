iD.ui.PresetEditor = function(context) {

    var event = d3.dispatch('cancel', 'save');

    function presetEditor(selection) {

        selection.html('');

        var header = selection.append('div')
        .attr('class', 'header fillL');

        header.append('button')
        .attr('class', 'fr')
        .on('click', function() {context.enter(iD.modes.Browse(context)); })
        .append('span')
        .attr('class', 'icon close');

        header.append('h3')
        .text('Preset Editor');

        var body = selection.append('div')
        .attr('class', 'body');

        var addNewButton = body.append('modal-section')
        .append('button')
        .attr('class', 'action col4 button preset-editor')
        .on('click', presetEditor.render)
        .text('Add New Preset');

        var editExistingPointPresetButton = body.append('modal-section')
        .append('button')
        .attr('class', 'action col4 button preset-editor')
        .on('click', function() {
            editExistingPresets();
        })
        .text('Edit Existing Preset');

        function editExistingPresets() {
            var geometryType = 'point';
            console.log("edit existing presets");
            var editPresetList = iD.ui.EditPresetList(context, geometryType);
            console.log("presetList", editPresetList);
            body.attr('class', 'preset-editor');
            body.call(editPresetList);
        }
    }

    presetEditor.render = function (preset) {

        if (preset === undefined) { preset = null; }
        if (preset) {
            d3.select('.sidebar-component .preset-editor').remove();
            d3.select('.sidebar-component')
            .append('div')
            .attr('class', 'body');
        }

        var body = d3.select('.sidebar-component .body');
        body.html('');

        var noticeSection = body.append('div')
        .attr('class', 'modal-section warning-section fillL2')
        .style('display', 'none')
        .append('h3');

        var presetSection = body.append('div')
        .attr('class', 'modal-section');

        var presetForm = presetSection.append('div')
        .attr('class', 'preset-form fillL3');

        var presetFormField = presetForm.append('div')
        .attr('class', 'form-field form-field-name');

        var presetNameLabel = presetFormField.append('label')
        .attr('class', 'form-label')
        .text('Preset Name');

        var presetNameForm = presetFormField.append('input')
        .attr('id', 'preset-editor-input-name')
        .attr('style', 'width: 100%;')
        .value(function() { if (preset) {
            return preset.name();
        }
        else {
            return "";
        } });

        var tagSection = body.append('div')
        .attr('class', 'modal-section');

        var presetEditor = tagSection.append('div')
        .attr('class', 'preset-editor')

        var tagList = presetEditor.append('div')
        .append('ul')
        .attr('class', 'tag-list');

        if (preset) {
            d3.entries(preset.tags).forEach( function (tag) {
                rawTagRow(tag);
            });
        }
        else {
            rawTagRow();
        }

        var addTagButton = presetEditor.append('button')
        .on('click', rawTagRow)
        .attr('class', 'add-tag')
        .append('span')
        .attr('class', 'icon plus light');

        var saveButton = body.append('modal-section')
        .append('button')
        .attr('class', 'action col4 button preset-editor')

        // FIXME: save is fired on the mode object and not the
        // actual event.
        .on('click', function() { context.mode().save(preset); })
        .text('Save');

        return presetEditor;
    }

    function rawTagRow (tag) {

        if (tag === undefined) {
            tag = null;
        }

        var $selection = d3.select('.sidebar-component .tag-list');

        var $row = $selection.append('li')
        .attr('class', 'tag-row cf');

        var $key = $row.append('div')
        .attr('class', 'key-wrap')
        .append('input')
        .property('type', 'text')
        .attr('class', 'key')
        .attr('maxlength', 255)
        .on('input', inputevent)
        .on('keydown', keydown)
        .value(function () { if (tag) { 
            return tag.key; 
        }
        else {
            return "";
        } 
    });

        var $value = $row.append('div')
        .attr('class', 'input-wrap-position')
        .append('input')
        .property('type', 'text')
        .property('disabled', function() {return typeof(tag) !== 'undefined' ?  false : true;})
        .attr('class', 'value')
        .attr('maxlength', 255)
        .value(function () {if (tag) {
            return tag.value;
            }
            else {
                return "";
            }
        });

        var $remove = $row.append('button')
        .attr('tabindex', -1)
        .attr('class', 'remove minor')
        .on('click', removeTag)
        .append('span')
        .attr('class', 'icon delete');

        $row.append('div')
        .attr('class', 'tag-reference-body cf');
    }

    function inputevent () {
        var row = d3.select(this.parentNode.parentNode);
        row.select('input.value').property('disabled', false);
    }

    function keydown () {
        var textArea = d3.select(this);
        var row = d3.select(d3.select(this).node().parentNode.parentNode);
        if (textArea.property('value').length == 0) {
            row.select('input.value').property('disabled', true);
        }
    }

    function removeTag () {
        d3.select(this.parentNode).remove();
    }

    return d3.rebind(presetEditor, event, 'on');

}

