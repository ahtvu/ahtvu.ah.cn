const util = require('util');

module.exports = function (req, res, utils) {

    var deferred = Promise.defer();

    utils.request({
        url: 'open/get_categories_by_parent',
        method: 'POST',
        qs: {
            siteId: req.app.site.id,
            parentId:'ktqfaxgmjrbhw1rs1839gw'
        }
    }, function (result) {
        var data = {
            id: {},
            list: []
        };

        if (result.code != 200) {

            deferred.resolve(data);
            return;
        };

        result.body = JSON.parse(result.body);

        result.body.data.forEach(function (e) {

            data.list.push({
                id:e.id,
                title: e.title,
                url:e.url,
                href: utils.urlFormat(util.format('xxgk?id=%s', e.id)),
            });

        }, this);

        deferred.resolve({ data: data });
    });

    return deferred.promise;
}