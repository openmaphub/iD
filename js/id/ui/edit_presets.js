iD.ui.EditPresets = function(context) {

    // function preset_editing() {
    //     return context.mode().id === 'preset_editor';
    // }

    var key ='p';
    
    function loadEditor() {
        context.enter(iD.modes.PresetEditor(context));
    }

    return function(selection) {
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
    };
};