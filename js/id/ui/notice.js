iD.ui.Notice = function(context) {
    return function(selection) {
        var div = selection.append('div')
            .attr('class', 'notice');

        var button = div.append('button')
            .attr('class', 'zoom-to notice')
            .on('click', function() { context.map().zoom(16); });

        button.append('span')
            .attr('class', 'icon zoom-in-invert');

        button.append('span')
            .attr('class', 'label')
            .text(t('zoom_in_edit'));

        var presetEditorButton = div.append('button')
            .attr('class', 'preset-editor notice')
            .text('Preset Editor')
            .on('click', function() { 
                d3.select('.inspector-wrap').call(iD.ui.PresetEditor(context)); });
            
        function disableTooHigh() {
            div.style('display', context.map().editable() ? 'none' : 'block');
        }

        context.map()
            .on('move.notice', _.debounce(disableTooHigh, 500));

        disableTooHigh();
    };
};
