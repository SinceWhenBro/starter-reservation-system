const knex = require("../db/connection");

const tableName = "tables";

function list(date) {
  return knex(tableName)
  .select("*")
  .orderBy("table_name");
}

function create(table) {
  console.log("CREATE TABLE:",table)
  return knex(tableName)
    .insert(table, "*")
}

function update(table) {
  return knex(tableName)
  .where("table_id", table.table_id)
  .update(table)
}

function read(table_id) {
  return knex(tableName)
  .where("table_id", table_id)
  .select("*")
}

function destroy(table) {
  return knex(tableName)
  .where("table_id", table.table_id)
  .update("reservation_id", null)
}



module.exports = {
  create,
  list,
  update,
  read,
  destroy,
};