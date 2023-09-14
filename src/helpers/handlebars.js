const Handlebars = require('handlebars')

module.exports = {
    sum: (a, b) => a + b, 
        sortable: (field, sort) => {
            // check sort field
            const isTypeCorrect = (['asc', 'desc'].includes(sort.type) ? sort.type : 'default')
            
            const sortField = (field === sort.column ? isTypeCorrect : 'default')

            const types = {
                default: 'asc',
                desc: 'asc',
                asc: 'desc',
            }

            const icons = {
                default: 'fas fa-sort',
                desc: 'fas fa-sort-amount-down',
                asc: 'fas fa-sort-amount-down-alt',
            }

            const type = types[isTypeCorrect]
            const icon = icons[sortField]

            // Bao ve url
            const href = Handlebars.escapeExpression(`?_sort=true&column=${field}&type=${type}`)
            const result = `<a href="${href}">
                <i class="${icon}"></i>
            </a>`
            return new Handlebars.SafeString(result)
        },
}