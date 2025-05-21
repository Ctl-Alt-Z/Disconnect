/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // await knex('logs').del();

  await knex.raw("ALTER SEQUENCE logs_id_seq RESTART WITH 1");
  await knex("logs").insert([
    {
      screentime: 8,
      user_id: 1,
      date: "2025-05-12",
      entry:
        "I wasn't able to complete my goal from the previous day I feel bad",
    },
    {
      screentime: 5,
      user_id: 5,
      date: "2025-05-12",
      entry:
        "I was able to complete my goal to the exact time. I cut it close but hopefully I can keep this up.",
    },
    {
      screentime: 7,
      user_id: 2,
      date: "2025-05-12",
      entry:
        "I didn't reach my goal today. I spent more time on TikTok than I should have, maybe I should start using a timer.",
    },
    {
      screentime: 3,
      user_id: 9,
      date: "2025-05-12",
      entry:
        "I was able to reach my goal, but it was real tuff. At the end of the week if i can keep it up i'll reward myself with some ice cream.",
    },
    {
      screentime: 6,
      user_id: 4,
      date: "2025-05-12",
      entry:
        "I was able to complete my goal but I feel like it was because I been busy with midterms. After this week I wonder if it will be the same. ",
    },
    {
      screentime: 5,
      user_id: 1,
      date: "2025-05-13",
      entry:
        "This was kind of hard to do. I'm trying to find more hobbies to keep myself busy.",
    },
    {
      screentime: 12,
      user_id: 5,
      date: "2025-05-13",
      entry:
        "I have a research project im doing for school, so technically it's not my fault that i didn't reach my goal today.",
    },
    {
      screentime: 3,
      user_id: 2,
      date: "2025-05-13",
      entry:
        "I've been learning how to draw and paint, which has been really fun. Its also helping me stay off my phone.",
    },
    {
      screentime: 9,
      user_id: 9,
      date: "2025-05-13",
      entry:
        "Instead of getting ice cream, I rewarded myself with TikTok time. I don't regret it at all LOL.",
    },
    {
      screentime: 3,
      user_id: 4,
      date: "2025-05-13",
      entry:
        "I've been doing really well with this challenge. My goal is to get down to an hour of screen time.",
    },
  ]);
};
