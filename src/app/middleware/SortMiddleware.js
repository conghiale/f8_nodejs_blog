module.exports = function SortMiddleware(req, res, next) {
    res.locals._sort = {
        enable: false,
        type: 'default' 
    }

    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enable = req.query._sort,
        // res.locals._sort.type = req.query.type,
        // res.locals._sort.column = req.query.column

        Object.assign(res.locals._sort, {
            enable: req.query._sort,
            column: req.query.column,
            type: req.query.type
        })
    }

    next()
}