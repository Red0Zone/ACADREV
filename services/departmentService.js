const DatabasePaginator = require('../utils/paginationSQL');

class DepartmentService {
    constructor(connection) {
        this.connection = connection;
        this.paginator = new DatabasePaginator(connection);
    }

    async getDepartments(filters = {}) {
        const {
            page = 1,
            perPage = 14,
            university_id,
            college_id,
            search,
            sortBy = 'name', // Default sort by department name
            sortOrder = 'ASC'
        } = filters;

        this.paginator.reset()
            .table('departments d', 'd') // Specify main table and its alias
            .select([
                'd.id',
                'd.name as name',
                'd.email as email',
                'd.head_name as head_name',
                'd.college_id',
                'c.name as college_name',
                'c.university_id',
                'd.created_at',
                'u.name as university_name'
            ])
            .join('colleges c', 'd.college_id = c.id', 'LEFT')
            .join('universities u', 'c.university_id = u.id', 'LEFT')
            .join('programs p', 'd.id = p.dep', 'LEFT')
            .whereNotNull('u.id', university_id)
            .whereNotNull('d.college_id', college_id)
            .whereLike('d.name', search)
            .orderBy(sortBy.includes('.') ? sortBy : `d.${sortBy}`, sortOrder)
            .paginate(page, perPage);

        return await this.paginator.execute();
    }
}

module.exports = DepartmentService;