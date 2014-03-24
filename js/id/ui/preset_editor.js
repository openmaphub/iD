iD.ui.PresetEditor = function(context) {

    var key = 'p';

    function presetEditor (selection) {

        selection.html('');

        var tooltip = bootstrap.tooltip()
        .placement('left')
        .html(true)
        .title('Preset Editor', key);

        var button = selection.append('button')
        .attr('tabindex', -1)
        .on('click', loadEditor)
        .call(tooltip);

        button.append('span')
        .attr('class', 'preset-editor-icon');

    }

    function loadEditor() {

        // Hide feature list pane
        d3.select('.feature-list-pane')
        .classed('inspector-hidden', true);

        // Disable notice.
        var $notice = d3.select('.notice');
        $notice.attr('style', 'display:none');


        selection = d3.select('.inspector-wrap');
        selection.html('');

        selection.classed('inspector-hidden', false);

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

        // FIXME - Button is misbehaving.
        $enter.select('.preset-close')    
        .on('click', function () { 
            context.enter(iD.modes.Browse(context));
        // selection.classed('inspector-hidden', true);
        // d3.select('.notice')
        // .attr('style', 'display: block');
        // d3.selectAll('.panewrap').remove(); 
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
    }                 

    return presetEditor;

}