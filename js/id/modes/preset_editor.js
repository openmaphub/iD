iD.modes.PresetEditor = function(context) {
    var ui = iD.ui.PresetEditor(context)
        .on('cancel', cancel)
        .on('save', save);

    function cancel() {
        context.enter(iD.modes.Browse(context));
    }

    function save(e) {
        console.log("some saving happens")
    }

    var mode = {
        id: 'preset_editor'
    };

    // var behaviors = [
    //     iD.behavior.Hover(context),
    //     iD.behavior.Select(context),
    //     iD.behavior.Lasso(context),
    //     iD.modes.DragNode(context).behavior];

    mode.enter = function() {
        // behaviors.forEach(function(behavior) {
        //     context.install(behavior);
        // });

        context.ui().sidebar.show(ui);
    };

    mode.exit = function() {
        context.ui().sidebar.hide(ui);
    };

    return mode;
};
