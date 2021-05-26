require('dotenv').config();

const localconfig = {
    database: 'oneroof',
    user: 'postgres',
    password: 'postgres'
}

module.exports = {
    client: 'pg',
    connection: localconfig,
    migrations: {
        tableName: 'knex_migrations',
        directory: `${__dirname}/migrations/`
    },
    seeds: {
        directory: `${__dirname}/seed/`
    }
    
}







//export { ZipCodeValidator };

// export class ZipCodeValidator implements StringValidator {
//     isAcceptable(s: string) {
//       return s.length === 5 && numberRegexp.test(s);
//     }
//   
