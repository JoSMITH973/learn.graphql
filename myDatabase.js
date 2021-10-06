const { SQLDataSource } = require("datasource-sql");

const MINUTE = 60;

class MyDatabase extends SQLDataSource {
    getUsers() {
        return this.knex.select("*").from("Users").cache(MINUTE);
    }

    Register(req) {
        console.log(req);
        return this.knex("Users").insert({
            email: req.email,
            password: req.password,
            firstName: req.firstName,
            lastName: req.lastName
        });
    }
}

module.exports = MyDatabase;
