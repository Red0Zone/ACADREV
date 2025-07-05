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
          'u.name as university_name',
          'COUNT(p.id) as programs_count'
        ])
        .join('colleges c', 'd.college_id = c.id', 'LEFT')
        .join('universities u', 'c.university_id = u.id', 'LEFT')
        .join('programs p', 'd.id = p.dep', 'LEFT')
        .whereNotNull('u.id', university_id)
        .whereNotNull('d.college_id', college_id)
        .whereLike('d.name', search)
        .groupBy(['d.id', 'd.name', 'd.email', 'd.head_name', 'd.college_id', 'c.name', 'c.university_id', 'd.created_at', 'u.name'])
        .orderBy(sortBy.includes('.') ? sortBy : `d.${sortBy}`, sortOrder)
        .paginate(page, perPage);

      return await this.paginator.execute();
    }
    
    // Function to build filters object from query parameters and optional IDs
 buildFilters = (query, college_id = null, university_id = null) => ({
  page: query.page,
  perPage: query.perPage,
  university_id: university_id || query.university_id,
  college_id: college_id || query.college_id,
  search: query.search,
  sortBy: query.sort_by,
  sortOrder: query.sort_order
});

// Generic function to handle paginated requests
 handlePaginatedRequest = async (req, res, filters, successMessage) => {
  try {
    console.log('Query parameters:', req.query);
    const result = await this.getDepartments(filters);

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

module.exports = DepartmentService;