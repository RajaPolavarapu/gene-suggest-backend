const mysql = require('mysql');

const connectionObject = {
    host: 'ensembldb.ensembl.org',
    port: '3306',
    user: 'anonymous',
    database: 'ensembl_website_102'
};

const connection = mysql.createConnection(connectionObject);

const prepareQuery = ({ query, species, ...rest }) => {
    const andParts = [];

    const limit = isNaN(rest.limit) ? 10 : rest.limit || 10;

    let sqlQuery = "select DISTINCT display_label from gene_autocomplete";
    if (query) {
        andParts.push(`display_label REGEXP '${query}'`);
    }
    if (species) {
        andParts.push(`species = '${species}'`);
    }
    if (andParts.length > 0) {
        sqlQuery += ` where ${andParts.join(" and ")}`
    }
    return `${sqlQuery} LIMIT 0, ${limit}`;
}

const errorResult = ({ err, result }) => {
    return {
        data: result || [],
        status: 'failed',
        reson: err.code || err.sqlMessage || "Something Went Wrong!"
    }
}

const successResult = ({ result }) => {
    return {
        data: result,
        status: 'success',
    }
}

module.exports = {
    connection,
    prepareQuery,
    errorResult,
    successResult
}