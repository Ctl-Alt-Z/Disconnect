const User = require("../../models/User");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("users").del();

  // resets user_id to 1 each time the seed file is executed.
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  // await knex.raw('ALTER SEQUENCE logs_id_seq RESTART WITH 1');
  // await knex.raw('ALTER SEQUENCE goals_id_seq RESTART WITH 1');
  // await knex.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1');
  // await knex.raw('ALTER SEQUENCE favorites_id_seq RESTART WITH 1');

  // We could use `knex.raw` queries to create these users but we'll use the model
  await User.create(
    "cool_cat",
    "luis",
    "boaboa",
    "luisdoingluisthings@me.com",
    "thisseedingstuffstupid11"
  );
  await User.create("wowow", "jane", "doe", "jane@example.com", "password456");
  await User.create(
    "jsmith",
    "John",
    "Smith",
    "john.smith@example.com",
    "SecurePass123!"
  );
  await User.create(
    "agarcia",
    "Ana",
    "Garcia",
    "ana.garcia@example.com",
    "P@ssw0rd2025"
  );
  await User.create(
    "btaylor",
    "Benjamin",
    "Taylor",
    "ben.taylor@example.com",
    "T@yl0r2025!"
  );
  await User.create(
    "lwong",
    "Lily",
    "Wong",
    "lily.wong@example.com",
    "W0ngL1ly$25"
  );
  await User.create(
    "mpatil",
    "Manish",
    "Patil",
    "manish.patil@example.com",
    "Pat1lM@n!sh"
  );
  await User.create(
    "jchen",
    "Jennifer",
    "Chen",
    "jennifer.chen@example.com",
    "Ch3nJ3nn!fer"
  );
  await User.create(
    "kosei",
    "Kosei",
    "Yamamoto",
    "k.yamamoto@example.com",
    "Y@m@m0t0K"
  );
  await User.create(
    "solson",
    "Sarah",
    "Olson",
    "sarah.olson@example.com",
    "Ols0nS@rah25"
  );
};
