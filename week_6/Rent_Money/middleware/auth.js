import { generateToken, verifyToken, isValidPassword } from "../services/authServices.js";
import { getAccountByUsernameService } from "../services/accountService.js";
import APIError from "../utils/apiError.js";

export const loginController = async (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return next(APIError.badRequest("Username and password are required"));
    }
  try {
      const account = await getAccountByUsernameService(username);
      if (!account) {
          return next(APIError.notFound('Username is not found'));
      }
      const validPassword = await isValidPassword(password, account.password);
      if (!validPassword) {
          return next(APIError.badRequest('Password is incorrect'));
      }
      const payload = {
          id: account._id,
          username: account.username,
          email: account.email,
      }
      const token = generateToken(payload);
      res.status(200).json({
          success: true,
          message: 'Login successfully',
          token: token,
      })
  } catch (error) {
        next(APIError.customeError(error.message))
  }
}