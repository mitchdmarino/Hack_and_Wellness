const db = require("./models");

// testing user CREATE
async function sessionTest() {
  try {
    const user = await db.User.create({
      email: "c@b.com",
      name: "M",
      password: "m",
    });

    const session = await db.Meditation.create({
      goals: "Focus on what I can control",
    });
    user.meditations.push(session);
    await user.save();
    await session.save();
    console.log(user);
  } catch (err) {
    console.warn(err);
  }
}

sessionTest();
