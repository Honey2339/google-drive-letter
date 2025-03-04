const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Letter = require("./models/letter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/drive.file"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL + "/letter",
    failureRedirect: "/login",
  })
);

app.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ user: req.user.profile });
});

app.post("/save-letter", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title, content } = req.body;
  const user = req.user;
  const accessToken = user.accessToken;
  const drive = google.drive({ version: "v3", auth: accessToken });

  try {
    const fileMetadata = {
      name: `${title}.docx`,
      mimeType: "application/vnd.google-apps.document",
    };
    const media = {
      mimeType: "text/plain",
      body: content,
    };
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id",
    });
    res.json({ message: "Letter saved", fileId: file.data.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to save letter", error });
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
