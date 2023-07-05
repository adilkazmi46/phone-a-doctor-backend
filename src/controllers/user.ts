import { NextFunction, Request, Response } from "express";
import { validationResult, check, body } from "express-validator";
import User from "@models/user";
import bcrypt from "bcrypt";
import { createJWT } from "@middleware/auth";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const otpGenerator = require("otp-generator");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
import axios from "axios";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = await validationResult(req);
  if (errors.isEmpty() === false) {
    return res
      .status(422) //@ts-ignore
      .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
  } else {
    let { phone_number, userType, full_name, password } = req.body;
    let check_user = await User.findOne({
      phone_number: phone_number,
    }).select("-password");
    if (check_user != null) {
      res.status(400).send({
        is_error: true,
        message: "user with the phone number already exists",
      });
    } else {
      let encrypted_password = await bcrypt.hashSync(password, 10);
      let user = await new User({
        userType: userType,
        full_name: full_name,
        phone_number: phone_number,
        password: encrypted_password,
        is_profile_created: false,
        is_information_completed: false,
      });
      const account = await stripe.accounts.create({
        type: "express",

        business_type: "individual",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          mcc: "8011",
          url: "https://doctor-24-7-backend.herokuapp.com/",
        },
      });
      if (userType === "doctor") {
        //@ts-ignore
        user.doctor.is_availability_details_completed = false;
        user.doctor.is_bank_details_completed = false;
        user.doctor.is_personal_profile_created = false;
        user.doctor.is_professional_profile_created = false;
        user.patient = null;
      } else if (userType === "patient") {
        user.doctor = null;
      }
      user.stripe_account.account = account;
      user.stripe_account.is_verified = false;
      const customer = await stripe.customers.create();
      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: process.env.STRIPE_API_VERSION }
      );
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
      });
      user.payment_details.setupIntent = setupIntent;
      user.payment_details.ephemeralKey = ephemeralKey;
      user.payment_details.customer = customer;
      user.payment_details.is_payment_sheet_completed = false;
      let otp = await otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      await client.messages
        .create({
          body: `This is otp code ${otp} for doctor-24-7 app`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone_number,
        })
        .then(async (message: any) => {
          user.otp = otp;
          user.is_verified = false;
          await user.save();
          let jwt = await createJWT(user);
          return res.status(200).json({
            user,
            token: jwt,
          });
        })
        .catch(async (err: any) => {
          if (err.code === 21211) {
            return res
              .status(422)
              .json({ message: "invalid phone number or format" });
          } else {
            return res.status(500).json({ message: "somehting went wrong" });
          }
        });
    }
  }
};

export const signinUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = await validationResult(req);
    if (errors.isEmpty() === false) {
      return res
        .status(422) //@ts-ignore
        .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
    } else {
      let { phone_number, password } = req.body;
      let user = await User.findOne({
        phone_number: phone_number,
      });
      if (user === null) {
        return res.status(401).json({
          is_error: true,
          message: "user by this phone number does not exists",
        });
      } else {
        let tmp = await bcrypt.compareSync(password, user.password);
        console.log("check=", tmp);
        if (bcrypt.compareSync(password, user.password)) {
          let jwt = createJWT(user);
          return res.status(200).json({
            token: jwt,
            user: user,
          });
        } else {
          res
            .status(422)
            .json({ is_error: true, message: "incorrect password" });
        }
      }
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = await validationResult(req);
    if (errors.isEmpty() === false) {
      return res
        .status(422) //@ts-ignore
        .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
    } else {
      //@ts-ignore
      let userID = req.userID;
      let { old_password, new_password } = req.body;
      let _user = await User.findOne({
        _id: userID,
      });
      if (_user === null) {
        res.status(401).json({ message: "invalid token, user not found" });
      } else {
        if (bcrypt.compareSync(old_password, _user.password)) {
          _user.password = await bcrypt.hashSync(new_password, 10);
          await _user.save();
          return res
            .status(200)
            .json({ success: true, message: "password changed successfully" });
        } else {
          res
            .status(422)
            .json({ is_error: true, message: "invalid old password" });
        }
      }
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const fogertPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = await validationResult(req);
    if (errors.isEmpty() === false) {
      return res
        .status(422) //@ts-ignore
        .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
    } else {
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const complete_profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { user } = req.body;
    let _user = await User.findOne({ _id: user });
    if (_user === null) {
      res.status(401).json({ message: "invalid token,user not found" });
    } else if (_user.userType != "patient") {
      res.status(401).json({ message: "only patients can access" });
    } else {
      _user.is_profile_created = true;
      await _user.save();
      return res.json({ user: _user });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserAttribtues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let userID = req.userID;

    let user = await User.findById(userID).select("-password -otp");
    if (user === null) {
      return res
        .status(401)
        .json({ message: "invalid token, no user found against this token" });
    }
    return res.json({ user });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const sendForgotPasswordCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors: any = await validationResult(req);
    if (errors.isEmpty() === false) {
      return res
        .status(422)
        .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
    }
    let { phone_number } = req.body;
    let user = await User.findOne({
      phone_number: phone_number,
    }).select("-password");
    if (user === null) {
      return res
        .status(401)
        .json({ message: "invalid phone number no user found" });
    }
    let otp = await otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await client.messages
      .create({
        body: `This is otp code ${otp} for doctor-24-7 app`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone_number,
      })
      .then(async (message: any) => {
        user.forgot_password_otp = otp;
        user.verified_forgot_password_otp = false;
        await user.save();
        return res.json({ success: true });
      });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const verifyForgotPasswordOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("askdjsaklj");
    const errors: any = await validationResult(req);
    if (errors.isEmpty() === false) {
      return res
        .status(422)
        .json({ message: errors.errors[0].param + " " + errors.errors[0].msg });
    }
    let { otp_code, phone_number } = req.body;
    let user = await User.findOne({
      phone_number: phone_number,
    }).select("-password");
    if (user === null) {
      return res
        .status(401)
        .json({ message: "invalid phone number no user found" });
    }

    if (user.forgot_password_otp != otp_code) {
      return res.status(422).json({ message: "invalid otp code" });
    } else if (
      user.forgot_password_otp === otp_code &&
      user.forgot_password_otp.length > 0
    ) {
      user.verified_forgot_password_otp = true;
      await user.save();
      return res.json({ success: true });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const save_new_password = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors: any = await validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(422).json({
        message: errors.errors[0].param + " " + errors.errors[0].msg,
      });
    }
    let { phone_number, new_password, confirm_new_password, otp_code } =
      req.body;
    let user = await User.findOne({
      phone_number: phone_number,
    });
    if (user === null) {
      return res
        .status(422)
        .json({ message: "invalid phone number, no user found" });
    }
    if (user.verified_forgot_password_otp === false) {
      return res.status(422).json({
        message: "must verify your phone number before changing password",
      });
    }
    if (user.forgot_password_otp != otp_code) {
      return res.status(422).json({
        message: "invalid otp code",
      });
    }
    if (
      user.verified_forgot_password_otp == true &&
      user.forgot_password_otp == otp_code
    ) {
      let pwd = await bcrypt.hashSync(new_password, 10);
      console.log("password hash=", pwd);
      user.password = pwd;
      await user.save();
      return res.json({ success: true });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const stripeCreateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let userID = req.userID;
    let user = await User.findById(userID);
    if (user === null) {
      return res.status(401).json({ message: "invalid token, no user found" });
    }
    if (user.userType != "patient" && user.userType != "doctor") {
      return res.status(401).json({
        message: "unauthorized access,only doctor or patients can access",
      });
    }
    res.json({
      setupIntent: user.payment_details.setupIntent.client_secret,
      ephemeralKey: user.payment_details.ephemeralKey.secret,
      customer: user.payment_details.customer.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const stripePaymentSheetFilled = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let userID = req.userID;
    let user = await User.findById(userID);
    if (user === null) {
      return res.status(401).json({ message: "invalid token, no user found" });
    }
    if (user.userType != "patient" && user.userType != "doctor") {
      return res.status(401).json({ message: "unauthorized access" });
    }
    let { setupIntent, ephemeralKey, customer, label, image } = req.body;

    if (setupIntent != user.payment_details.setupIntent.client_secret) {
      return res.status(422).json({ message: "invalid setIntent" });
    }
    if (ephemeralKey != user.payment_details.ephemeralKey.secret) {
      return res.status(422).json({ message: "invalid ephemeralKey" });
    }
    if (customer != user.payment_details.customer.id) {
      return res.status(422).json({ message: "invalid customer" });
    }
    user.payment_details.label = label;
    user.payment_details.image = image;
    user.doctor.is_bank_details_completed = true;
    user.payment_details.is_payment_sheet_completed = true;
    if (user.userType === "patient" && user.is_profile_created === false) {
      user.is_profile_created = true;
    }
    await user.save();
    return res.json({ user, success: true });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const createStripeAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const token = await stripe.tokens.create({
    //   bank_account: {
    //     country: "US"
    //     currency: "usd",
    //     account_holder_name: "Jenny Rosen",
    //     account_holder_type: "individual",
    //     routing_number: req.body.routing_number,
    //     account_number: req.body.account_number,
    //   },
    // });
    // const token_1 = await stripe.tokens.create({
    //   bank_account: {
    //     country: "US",
    //     currency: "usd",
    //     account_holder_name: "Jenny Rosen",
    //     account_holder_type: "individual",
    //     routing_number: req.body.routing_number_1,
    //     account_number: req.body.account_number_1,
    //   },
    // });

    // const account = await stripe.accounts.create({
    //   type: "express",
    //   business_type: "individual",

    //   capabilities: {
    //     card_payments: { requested: true },
    //     transfers: { requested: true },
    //   },
    // business_type: "individual",
    // tos_acceptance: { date: 1609798905, ip: req.ip },

    // business_profile: {
    //   url: "https://doctor-24-7-backend.herokuapp.com/",
    //   mcc: "8011",
    // },
    // individual: {
    //   first_name: "jsdkasjd",
    //   last_name: "klajsdas",
    //   address: {
    //     line1: "200 S. Virgina St.",
    //     city: "reeno",
    //     state: "nv",
    //     country: "us",
    //     postal_code: "89501",
    //   },
    //   dob: {
    //     day: "10",
    //     month: "09",
    //     year: "1999",
    //   },
    //   email: "aslkd@lkas.da",
    //   phone: "4542345678",
    //   ssn_last_4: "4323",
    //   // snn: "323544323",
    // },
    // external_account: token.id,
    // });

    // const account = await stripe.accounts.create({
    //   type: "express",
    //   business_type: "individual",

    //   capabilities: {
    //     card_payments: { requested: true },
    //     transfers: { requested: true },
    //   },
    // });
    // let tmp = await stripe.accounts.get({
    //   id: "acct_1LbTbGRQadtewo22",
    // });
    // const link = await stripe.accountLinks.create({
    //   account: account.id,
    //   refresh_url: "http://192.168.10.7:3000/api/user/stripe-token-refresh-url",
    //   return_url: "http://192.168.10.7:3000/api/user/stripe-token-refresh-url",
    //   type: "account_onboarding",
    // });

    // console.log("link 512 line=", link);
    // const account_1 = await stripe.accounts.create({
    //   type: "express",
    //   capabilities: {
    //     card_payments: { requested: true },
    //     transfers: { requested: true },
    //   },
    //   external_account: token_1.id,
    // });
    // const accountLink = await stripe.accountLinks.create({
    //   account: account.id,
    //   refresh_url: "http://localhost:3000/reauth",
    //   return_url: "https://localhost:3000/return",
    //   type: "account_onboarding",
    // });
    // console.log("476=", token);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: "cus_MNvCpno4A7u77W",
      type: "card",
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      payment_method: "ba_1Lf9P7RJtJfMRDV0GMIr2AKt",
      transfer_data: {
        destination: "acct_1Lf6TORKkz393EGX",
      },
    });
    res.json({ paymentMethods });
  } catch (err: any) {
    if (err.type === "StripeInvalidRequestError") {
      console.log("480 line ===");
      return res
        .status(err.statusCode)
        .json({ message: err.raw.code + " " + err.raw.message });
    }
    return res.json({ err });
  }
};

export const getStripeAccountLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let userID = req.userID;
    console.log("user id 575=", userID);
    let user = await User.findById(userID);

    if (user === null) {
      console.log("user not found====>");

      return res
        .status(401)
        .json({ message: "invalid token, no user found", user_id: user._id });
    }
    if (user.userType != "doctor" && user.userType != "patient") {
      return res.status(401).json({
        message: "invalid token, only doctor or patient can access it",
        user_id: user._id,
      });
    }

    console.log("req.query.accountID=>>>", req.query.accountID);
    if (
      //@ts-ignore
      req.query.accountID === null || //@ts-ignore
      req.query.accountID === undefined
    ) {
      return res.status(422).json({ message: "account id is required!" });
    } else {
      if (req.query.accountID != user.stripe_account.account.id) {
        return res.status(422).json({ message: "account id is invalid!" });
      }

      await axios(
        process.env.STRIPE_API_BASE_URL +
          `v1/accounts/${user.stripe_account.account.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          },
        }
      )
        .then(async (res: any) => {
          console.log("res.data 614=", res.data);
          user.stripe_account.account = res.data;
          if (res.data.details_submitted === true) {
            user.stripe_account.is_verified = true;
            console.log("user type 621=", user.userType);
            if (user.userType === "patient") {
              user.is_profile_created = true;
              await user.save();
            }
          }
          await user.save();
        })
        .catch((err: any) => {
          console.log("err 628=", err.response);
          return res.status(422).json({ message: err.response.data });
        });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd",
        application_fee_amount: 123,
        transfer_data: {
          destination: "acct_1Lf6TORKkz393EGX",
        },
      });

      //@ts-ignore
      let links = await stripe.accountLinks.create({
        account: user.stripe_account.account.id,
        refresh_url: process.env.SERVER_URL + "user/stripe-account-url",
        return_url: process.env.SERVER_URL + "user/stripe-return-url",
        type: "account_onboarding",
      });
      return res.json({ links, user, paymentIntent });
    }
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// export const
export const getStripeAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let userID = req.userID;
    let user = await User.findById(userID);
    if (user === null) {
      return res
        .status(401)
        .json({ message: "invalid token, no user found", user_id: user._id });
    }

    if (user.userType != "doctor" && user.userType != "patient") {
      return res.status(401).json({
        message: "invalid token, only doctor or patient can access it",
        user_id: user._id,
      });
    }
  } catch (err: any) {
    console.log("err 631 ===>", err);
    return res.status(500).json({ message: err.message });
  }
};

export const bank_details_submited = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let userID = req.userID;
    let user = await User.findById(userID);
    if (user === null) {
      return res
        .status(401)
        .json({ message: "invalid token, no user found", user_id: user._id });
    }

    if (user.userType != "doctor" && user.userType != "patient") {
      return res.status(401).json({
        message: "invalid token, only doctor or patient can access it",
        user_id: user._id,
      });
    }
    let { accountID } = req.query;
  } catch (err: any) {
    console.log("err 631 ===>", err);
    return res.status(500).json({ message: err.message });
  }
};
