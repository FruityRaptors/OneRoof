import { Knex } from "knex";
<<<<<<<HEAD
 

=======
  "name": "oneroof",
>>>>>>> 2ef826a09d3a78d915fc0b1b53971bf6ea20ab43
export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable("User", (table: Knex.TableBuilder) => {
        table.uuid("id").primary();
        table.string("username", 20);
        table.string("email", 30);
        table.string("house_key", 50);
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable("User");   
}

",
    "firebase": "^8.6.2