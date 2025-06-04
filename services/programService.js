const DatabasePaginator = require('../utils/paginationSQL');

class ProgramService {
    constructor(connection) {
        this.connection = connection;
        this.paginator = new DatabasePaginator(connection);
    }

    async getPrograms(filters = {}) {
        const {
            page = 1,
            perPage = 14,
            university_id,
            college_id,
            department_id,
            language,
            search,
            sortBy = 'name', // Default sort by program name
            sortOrder = 'ASC'
        } = filters;

        this.paginator.reset()
            .table('programs p', 'p') // Specify main table and its alias
            .select([
                'p.id',
                'p.name as program_name',
                'p.language',
                'p.evaluator_name',
                'p.dep as department_id',
                'd.name as department_name',
                'd.college_id',
                'c.name as college_name',
                'c.university_id',
                'u.name as university_name',
                'p.created_at'
            ])
            .join('departments d', 'p.dep = d.id', 'LEFT')
            .join('colleges c', 'd.college_id = c.id', 'LEFT')
            .join('universities u', 'c.university_id = u.id', 'LEFT')
            .whereNotNull('u.id', university_id)
            .whereNotNull('c.id', college_id)
            .whereNotNull('d.id', department_id)
            .whereNotNull('p.language', language)
            .whereLike('p.name', search)
            .orderBy(sortBy.includes('.') ? sortBy : `p.${sortBy}`, sortOrder)
            .paginate(page, perPage);

        return await this.paginator.execute();
    }

    // Function to build filters object from query parameters and optional IDs
    buildFilters = (query, college_id = null, university_id = null, department_id = null) => ({
        page: query.page,
        perPage: query.perPage,
        university_id: university_id || query.university_id,
        college_id: college_id || query.college_id,
        department_id: department_id || query.department_id,
        language: query.language,
        search: query.search,
        sortBy: query.sort_by,
        sortOrder: query.sort_order
    });

    // Generic function to handle paginated requests
    handlePaginatedRequest = async (req, res, filters, successMessage) => {
        try {
            console.log('Query parameters:', req.query);
            const result = await this.getPrograms(filters);

            res.json({
                success: true,
                message: successMessage,
                ...result
            });
        } catch (error) {
            console.error('Failed to retrieve data:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve data',
                error: error.message
            });
        }
    };
}

module.exports = ProgramService;