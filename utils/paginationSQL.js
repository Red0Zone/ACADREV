// utils/paginator.js
class DatabasePaginator {
    constructor(connection) {
        this.connection = connection;
        this.tableName = '';
        this.selectColumns = ['*'];
        this.joinClauses = [];
        this.whereConditions = [];
        this.whereParams = [];
        this.groupByColumns = [];
        this.orderByClause = 'id ASC';
        this.perPage = 10;
        this.currentPage = 1;
    }

    // Set the main table
    table(tableName) {
        this.tableName = tableName;
        return this;
    }

    // Set columns to select
    select(columns) {
        this.selectColumns = Array.isArray(columns) ? columns : [columns];
        return this;
    }

    // Add JOIN clause
    join(table, condition, type = 'INNER') {
        this.joinClauses.push(`${type} JOIN ${table} ON ${condition}`);
        return this;
    }

    // Add WHERE condition
    where(column, operator, value) {
        this.whereConditions.push(`${column} ${operator} ?`);
        this.whereParams.push(value);
        return this;
    }

    // Add WHERE condition only if value exists
    whereNotNull(column, value) {
        if (value !== null && value !== undefined && value !== '') {
            this.where(column, '=', value);
        }
        return this;
    }

    // Add WHERE IN condition
    whereIn(column, values) {
        if (values && values.length > 0) {
            const placeholders = values.map(() => '?').join(',');
            this.whereConditions.push(`${column} IN (${placeholders})`);
            this.whereParams.push(...values);
        }
        return this;
    }

    // Add LIKE condition for search
    whereLike(column, value) {
        if (value) {
            this.whereConditions.push(`${column} LIKE ?`);
            this.whereParams.push(`%${value}%`);
        }
        return this;
    }

    // Set ORDER BY
    orderBy(column, direction = 'ASC') {
        this.orderByClause = `${column} ${direction}`;
        return this;
    }

    // Set GROUP BY
    groupBy(columns) {
        this.groupByColumns = Array.isArray(columns) ? columns : [columns];
        return this;
    }

    // Set pagination parameters
    paginate(page = 1, perPage = 10) {
        this.currentPage = Math.max(1, parseInt(page));
        this.perPage = Math.max(1, parseInt(perPage));
        return this;
    }

    // Build the SQL query
    buildQuery(forCount = false) {
        let query;
        
        if (forCount) {
            // For count queries with GROUP BY, we need to count distinct groups
            if (this.groupByColumns.length > 0) {
                query = `SELECT COUNT(DISTINCT ${this.groupByColumns[0]}) as total FROM ${this.tableName}`;
            } else {
                query = `SELECT COUNT(*) as total FROM ${this.tableName}`;
            }
        } else {
            query = `SELECT ${this.selectColumns.join(', ')} FROM ${this.tableName}`;
        }

        // Add JOINs
        if (this.joinClauses.length > 0) {
            query += ' ' + this.joinClauses.join(' ');
        }

        // Add WHERE conditions
        if (this.whereConditions.length > 0) {
            query += ' WHERE ' + this.whereConditions.join(' AND ');
        }

        // Add GROUP BY for data queries only (not for count queries with GROUP BY)
        if (!forCount && this.groupByColumns.length > 0) {
            query += ' GROUP BY ' + this.groupByColumns.join(', ');
        }

        // Add ORDER BY and LIMIT for data query
        if (!forCount) {
            query += ` ORDER BY ${this.orderByClause}`;
            const offset = (this.currentPage - 1) * this.perPage;
            query += ` LIMIT ${this.perPage} OFFSET ${offset}`;
        }

        return query;
    }

    // Execute pagination query
    async execute() {
        try {
            // Get total count
            const countQuery = this.buildQuery(true);
            // Use .promise().execute() to work with the raw connection
            const [countResult] = await this.connection.promise().execute(countQuery, this.whereParams);
            const totalRecords = countResult[0].total;

            // Get paginated data
            const dataQuery = this.buildQuery(false);
            // Use .promise().execute() to work with the raw connection
            const [dataResult] = await this.connection.promise().execute(dataQuery, this.whereParams);

            // Calculate pagination metadata
            const totalPages = Math.ceil(totalRecords / this.perPage);
            const hasNextPage = this.currentPage < totalPages;
            const hasPrevPage = this.currentPage > 1;

            return {
                data: dataResult,
                pagination: {
                    currentPage: this.currentPage,
                    perPage: this.perPage,
                    totalRecords,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    nextPage: hasNextPage ? this.currentPage + 1 : null,
                    prevPage: hasPrevPage ? this.currentPage - 1 : null
                }
            };
        } catch (error) {
            // It's good practice to log the error on the server for debugging
            console.error("Pagination query failed:", error); 
            throw new Error(`Pagination query failed: ${error.message}`);
        }
    }

    // Reset the paginator for reuse
    reset() {
        this.tableName = '';
        this.selectColumns = ['*'];
        this.joinClauses = [];
        this.whereConditions = [];
        this.whereParams = [];
        this.groupByColumns = [];
        this.orderByClause = 'id ASC';
        this.perPage = 10;
        this.currentPage = 1;
        return this;
    }
}

module.exports = DatabasePaginator;