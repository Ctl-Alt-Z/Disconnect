/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('posts').del();
  // await knex.raw('ALTER SEQUENCE posts_id_seq RESTART WITH 1');

  await knex("posts").insert([
    {
      message:
        "Today with my free time I choose to go to the park sit on a bench and read a book. I was there for 2 hours, the time when by so fast.",
      user_id: 1,
    },
    {
      message:
        "I didn't reach my screen time goal today. I spent more time on TikTok than I should have, maybe I should start using a timer.",
      user_id: 3,
    },
    {
      message:
        "Even though I didn't reach my screen time goal today, it wasn't my fault. I was working on a project for school and I lost track of time.",
      user_id: 2,
    },
    {
      message: "Finally reached my time goal!!!! It only took like a week LOL.",
      user_id: 5,
    },
    {
      message:
        "Instead of being on my phone I have been trying to gain a new hobby. I've tried cooking, then baking, but i think ill just stick with arts and crafts because I burn everything i touch.",
      user_id: 4,
    },
    {
      message:
        "I got of work early today, so instead of going home to doom scroll, I hit up some friends and we went to the night market.",
      user_id: 1,
    },
    {
      message:
        "I reached my screen time goal, maybe it was because I was in bed sick with the flu but nonetheless the goal was meet LOLL.",
      user_id: 6,
    },
    {
      message:
        "Was super bored today so I gave into the Doom Scroll. I'll try harder tomorrow.",
      user_id: 3,
    },
    {
      message: "I haven't reached my goal in two weeks and I the problem ???.",
      user_id: 2,
    },
    {
      message:
        "Decided to go to a concert to distract myself from the phone, all that did was increase my screen time because I spent all my time on my phone recording the show. ",
      user_id: 4,
    },
  ]);
};
