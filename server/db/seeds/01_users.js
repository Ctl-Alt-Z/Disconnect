const User = require("../../models/User");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("favorites").del();
  await knex("goals").del();
  await knex("logs").del();
  await knex("posts").del();
  await knex("users").del();
  // resets user_id to 1 each time the seed file is executed.
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE logs_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE goals_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE favorites_id_seq RESTART WITH 1");

  // We could use `knex.raw` queries to create these users but we'll use the model
  await User.create(
    "luis",
    "boaboa",
    "cool_cat",
    "luisdoingluisthings@me.com",
    "thisseedingstuffstupid11"
  );
  await User.create("wowow", "jane", "doe", "jane@example.com", "password456");
  await User.create(
    "John",
    "Smith",
    "jsmith",
    "john.smith@example.com",
    "SecurePass123!"
  );
  await User.create(
    "Ana",
    "Garcia",
    "agarcia",
    "ana.garcia@example.com",
    "P@ssw0rd2025"
  );
  await User.create(
    "Benjamin",
    "Taylor",
    "btaylor",
    "ben.taylor@example.com",
    "T@yl0r2025!"
  );
  await User.create(
    "Lily",
    "Wong",
    "lwong",
    "lily.wong@example.com",
    "W0ngL1ly$25"
  );
  await User.create(
    "Manish",
    "Patil",
    "mpatil",
    "manish.patil@example.com",
    "Pat1lM@n!sh"
  );
  await User.create(
    "Jennifer",
    "Chen",
    "jchen",
    "jennifer.chen@example.com",
    "Ch3nJ3nn!fer"
  );
  await User.create(
    "Kosei",
    "Yamamoto",
    "kosei",
    "k.yamamoto@example.com",
    "Y@m@m0t0K"
  );
  await User.create(
    "Sarah",
    "Olson",
    "solson",
    "sarah.olson@example.com",
    "Ols0nS@rah25"
  );
  await User.create(
    "Lena",
    "Whitmore",
    "LWhitmore",
    "lena.whitmore@example.com",
    "LoveLife@30"
  );
  await User.create(
    "Travis",
    "Callahan",
    "Jarvis",
    "travis.callahan@example.com",
    "SpiderMan.202"
  );
  await User.create(
    "Elena",
    "Marquez",
    "ElenaM",
    "elena.marquez@example.com",
    "ClassRoom@2025"
  );
  await User.create(
    "Jared",
    "Finch",
    "GoldFinch",
    "jared.finch@example.com",
    "Gold.Finch25"
  );
  await User.create(
    "Nadia",
    "Ellison",
    "EllisonNelson",
    "nadia.ellison@example.com",
    "Water.bottle20"
  );
  await User.create(
    "Marcus",
    "Brenner",
    "MarcB",
    "marcus.brenner@example.com",
    "Marcus.B3030"
  );
  await User.create(
    "Talia",
    "Cross",
    "CrossDoss",
    "talia.cross@example.com",
    "Cross.race354"
  );
  await User.create(
    "Ethan",
    "Roarke",
    "RRRoar",
    "ethan.roarke@example.com",
    "Dino@Roar882"
  );
  await User.create(
    "Isabella",
    "Trent",
    "IzzyBell",
    "isabelle.trent@example.com",
    "Trey.Bay678"
  );
  await User.create(
    "Damon",
    "Voss",
    "VossRoss",
    "damon.voss@example.com",
    "Floss.Ross653"
  );
};
