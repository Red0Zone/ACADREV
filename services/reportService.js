const DatabasePaginator = require('../utils/paginationSQL');

class ReportService {
    constructor(connection) {
        this.paginator = new DatabasePaginator(connection);
    }

    async getReportsByDomain(domainId, filters = {}) {
        const {
            page = 1,
            perPage = 1,
            sortBy = 'id', // Default sort by report id
            sortOrder = 'DESC',
        } = filters;

        this.paginator.reset()
            .table('report r', 'r') // Specify main table and its alias
            .where('r.dom', '=', domainId)
            .select([
                'r.id',
                'r.dom',
                'r.result',
                'r.result_en'
            ]);

        
        this.paginator
            .orderBy(sortBy.includes('.') ? sortBy : `r.${sortBy}`, sortOrder)
            .paginate(page, perPage);

        return await this.paginator.execute();
    }

    // Function to build filters object from query parameters
    buildFilters = (query) => ({
        page: query.page,
        perPage: query.perPage,
        sortBy: query.sort_by,
        sortOrder: query.sort_order
    });

    // Generic function to handle paginated requests
    handlePaginatedRequest = async (req, res, successMessage = 'Reports retrieved successfully') => {
        try {
            console.log('Query parameters:', req.query);
            const filters = this.buildFilters(req.query);
            const result = await this.getReportsByDomain(req.params.domainId, filters);

            res.json({
                success: true,
                message: successMessage,
                ...result
            });
        } catch (error) {
            console.error('Failed to retrieve reports:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve reports',
                error: error.message
            });
        }
    };
     
}

module.exports = ReportService;