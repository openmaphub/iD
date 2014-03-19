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

                // button.attr('class', 'hidden');

                // var $form = selection.selectAll('.preset-form');
                // console.log($form);

                // $notice = selection.select('.notice');
                // $notice.select('button').attr('style', 'display:none');

                // $notice.append('div')
                //     .append('input')
                //         .attr('type', 'text');

    // var rawTagEditor = iD.ui.RawTagEditor(context);
            
    //             $notice.append('div')
    //                 .attr('class', 'inspector-border inspector-preset')
    //                     .append('div')
    //                     .attr('class', 'inpector-border raw-tag-editor inspector-inner')
    //                             .call(rawTagEditor
    //                         .preset({})
    //                         .entityID(1)
    //                         .tags(undefined)
    //                         .state({}));
                        // .append('div')
                        //     .append('ul')
                        //     .attr('class', 'tag-list')
                        //         .append('li')
                        //         .attr('class', 'tag-row cf')
                        //             .append('div')
                        //             .attr('class', 'key-wrap')
                        //                 .append('input')
                        //                 .attr('type', 'text')
                        //                 .attr('class', 'key combobox-input');



            // });

        function disableTooHigh() {
            div.style('display', context.map().editable() ? 'none' : 'block');
        }

        context.map()
            .on('move.notice', _.debounce(disableTooHigh, 500));

        disableTooHigh();
    };
};
