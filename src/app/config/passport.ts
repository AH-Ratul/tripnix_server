import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { config } from ".";
import { User } from "../modules/user/user.model";
import { IsActive, Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await User.findOne({ email });

        if (!isUserExist) {
          return done("User does not exist");
        }

        if (!isUserExist.isVerified) {
          return done("User is not verified");
        }

        if (
          isUserExist &&
          (isUserExist.isActive === IsActive.BLOCKED ||
            isUserExist.isActive === IsActive.INACTIVE)
        ) {
          return done(`User is ${isUserExist.isActive}`);
        }

        if (isUserExist && isUserExist.isDeleted === true) {
          return done("User is Deleted");
        }

        const isGoogleAuthenticated = isUserExist?.auths.some(
          (providerObject) => providerObject.provider === "google"
        );

        if (isGoogleAuthenticated && !isUserExist?.password) {
          done(
            "You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password."
          );
        }

        const isPasswordMatched = await bcrypt.compare(
          password as string,
          isUserExist?.password as string
        );

        if (!isPasswordMatched) {
          return done(null, false, { message: "Password does not Match" });
        }

        return done(null, isUserExist as unknown as string);
      } catch (error) {
        console.log("local error", error);
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) {
          done(null, false, { message: "No Email Found" });
        }

        let isUserExist = await User.findOne({ email });

        if (isUserExist && !isUserExist.isVerified) {
          return done(null, false, { message: "User is not verified" });
        }

        if (
          isUserExist &&
          (isUserExist.isActive === IsActive.BLOCKED ||
            isUserExist.isActive === IsActive.INACTIVE)
        ) {
          return done(`User is ${isUserExist.isActive}`);
        }

        if (isUserExist && isUserExist.isDeleted === true) {
          return done(null, false, { message: "User is Deleted" });
        }

        if (!isUserExist) {
          isUserExist = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }

        return done(null, isUserExist);
      } catch (error) {
        console.log("google strategy error", error);
        return done(error);
      }
    }
  )
);
