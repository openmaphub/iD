iD.data = {
    load: function(path, callback) {
        if (!callback) {
            callback = path;
            path = '';
        }
        iD.util.asyncMap([
            path + 'data/deprecated.json',
            path + 'data/discarded.json',
            path + 'data/imagery-maphubs.json',
            path + 'data/wikipedia.json',
            //path + 'data/presets/presets.json',
            //path + 'data/presets/defaults.json',
            //path + 'data/presets/categories.json',
            //path + 'data/presets/fields.json',
            path + 'data/imperial.json',
            path + 'data/feature-icons.json',
            path + 'data/locales.json',
            path + 'dist/locales/en.json',
            path + 'data/name-suggestions.json',
            path + 'data/address-formats.json'
            ], d3.json, function (err, data) {

            iD.data = {
                deprecated: data[0],
                discarded: data[1],
                imagery: data[2],
                wikipedia: data[3],
                presets: {
                    presets: [],
                    defaults: [],
                    categories: [],
                    fields: []
                },
                imperial: data[4],
                featureIcons: data[5],
                locales: data[6],
                en: data[7],
                suggestions: data[8],
                addressFormats: data[9]
            };

            callback();
        });
    }
};
