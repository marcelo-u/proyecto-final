const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserService = require("../services/user");

//const saltRounds = 10;

const service = new UserService();

//logica de passport en login
const loginVerifyCallback = async (req, email, pass, done) => {
  try {
    const found = await service.getUserByEmail(email);
    if (!found) return done(null, false);
    const { password } = found;
    return (await bcrypt.compare(pass, password))
      ? done(null, found)
      : done(null, false);
  } catch (err) {
    done(err);
  }
};

const loginStrategy = new LocalStrategy(
  { passReqToCallback: true },
  loginVerifyCallback
);

passport.use(loginStrategy);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  service
    .getUserById(id)
    .then((user) => {
      return done(null, { username: user });
    })
    .catch((err) => done(err));
});
