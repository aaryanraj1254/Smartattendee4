const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

 passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.id);
                if (user) return done(null, user);
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        }
    )
);
//login
passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) return done(null, false, { message: 'User not found' });

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, { message: 'Incorrect password' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

//google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,   
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ providerId: profile.id });
                if (!user) {
                    user = await User.create({
                        provider: 'google',
                        providerId: profile.id,
                        email: profile.emails?.[0]?.value || `${profile.id}@google.com`, 
                        name: profile.displayName,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);
//github
 passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ providerId: profile.id });
                if (!user) {
                    user = await User.create({
                        provider: 'github',
                        providerId: profile.id,
                        email: profile.emails?.[0]?.value || `${profile.id}@github.com`,  
                        name: profile.displayName,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

 //linkedin
passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: `${process.env.BASE_URL}/auth/linkedin/callback`,
            scope: ['r_emailaddress', 'r_liteprofile'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ providerId: profile.id });
                if (!user) {
                    user = await User.create({
                        provider: 'linkedin',
                        providerId: profile.id,
                        email: profile.emails?.[0]?.value || `${profile.id}@linkedin.com`,  
                        name: profile.displayName,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

 
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;