import User from "./../models/User";
import BanksPermission from "./../models/BanksPermission"
import * as HttpStatus from "http-status-codes";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

export const getAuthUser = async (first_name : string, password : string, bank_name : string): Promise<any> => {
  const foundBankPermission = await BanksPermission.query().where({ bank_name }).first();
  const foundUser = await User.query().where({ first_name }).first();
  const UserWithPermissionFilter = {};
  if (foundUser && foundBankPermission) {
    if (password === foundUser.password) {
      for (let key in foundBankPermission) {
        // @ts-ignore
        if(foundBankPermission[key] === true){
          // @ts-ignore
          UserWithPermissionFilter[key] = foundUser[key]
        }
      }
      // @ts-ignore
      const { bank_name, ...rest } = UserWithPermissionFilter;
      return rest
    } else {
      throw {
        message: "Permission denied",
        status: HttpStatus.FORBIDDEN,
      };
    }
  } else {
    throw {
      message: "User with such name does not exist",
      status: HttpStatus.NOT_FOUND,
    };
  }
};

export const createNewUser = async (body: any): Promise<any> => {
  const existUser = await User.query().where({first_name: body.first_name}).first();

  if (existUser) {
    throw {
      message: "User with such name already exist",
      status: HttpStatus.CONFLICT,
    };
  } else {
    const {bank, ...rest} = body
    return await User.query().insertAndFetch({
      ...rest,
      //password: bcrypt.hashSync(body.password as string, 10),
      is_active: true,
      created_at: new Date(),
      created_by: bank,
    });
  }
};

  // if (existUser) {
  //   throw {
  //     message: "User with such name already exist",
  //     status: HttpStatus.CONFLICT,
  //   };
  // } else {
  //   const user: { [key: string]: any } = {
  //     ...body,
  //     is_active: true,
  //     password: bcrypt.hashSync(body.password as string, 10),
  //   };
  //   const newUser = await User.query().insertAndFetch({
  //     ...user,
  //     is_active: true,
  //     created_at: new Date(),
  //     created_by: "Sign Up page",
  //   });
  //   const { password, ...rest } = newUser;
  //   return jwt.sign(
  //     {
  //       exp: moment().add(1, "hours").valueOf(),
  //       data: rest,
  //       id: newUser.id,
  //     },
  //     process.env.NODE_APP_API_SECRET_KEY,
  //   );
  // }

// export const userActivation = async (body: { [key: string]: any }): Promise<any> => {
//   const foundUser = await User.query().where({ id: body.id }).first();
//   if (foundUser.is_active) {
//     throw {
//       message: "User already exist",
//       status: HttpStatus.CONFLICT,
//     };
//   } else {
//     const user: { [key: string]: any } = {
//       ...body,
//       is_active: true,
//       password: bcrypt.hashSync(body.password as string, 10),
//     };
//
//     const { id, ...rest } = user;
//     return await User.query().updateAndFetchById(id, rest);
//   }
// };
//
// export const userForgotPassword = async (body: { [key: string]: any }, origin: string): Promise<any> => {
//   const existUser = await User.query().where({ email: body.email }).first();
//
//   if (!existUser) {
//     throw {
//       message: "User with such email already exist",
//       status: HttpStatus.CONFLICT,
//     };
//   } else {
//     const emailVerificationToken = jwt.sign(
//       {
//         exp: moment().add(1, "hours").valueOf(), // 1 hour
//         data: existUser.id,
//       },
//       "DFGdskjfiehweif39534hdgvfm2ebb",
//     );
//
//     const data = {
//       from: "Excited User <me@samples.mailgun.org>",
//       to: existUser.email,
//       subject: "Hello",
//       text: `To change password, follow the link: ${origin}/reset/${emailVerificationToken}`,
//     };
//
//     mailgun.messages().send(data);
//
//     return existUser;
//   }
// };
//
// export const userResetPassword = async (body: { [key: string]: any }): Promise<any> => {
//   const { password, userId } = body;
//
//   const hash = bcrypt.hashSync(password, 10);
//   return await User.query().updateAndFetchById(userId, { password: hash });
// };
//
// export const fetchUserForActivation = async (id: number): Promise<any> => {
//   return await User.query().where({ id }).first();
// };
