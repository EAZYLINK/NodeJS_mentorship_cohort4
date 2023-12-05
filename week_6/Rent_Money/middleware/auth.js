import { generateToken, verifyToken, isValidPassword, isAdminService, isBorrowerService, isLenderService } from "../services/authServices.js";
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
          role: account.role,
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

export const isLoggenInController = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return next(APIError.badRequest('Authorization header is required'));
    }
    const token = auth.split(' ')[1];
    if (!token) {
        return next(APIError.badRequest('Token is required'));
    }
    try {
        const payload = verifyToken(token);
        if (!payload) {
            return next(APIError.unAuthenticated('You need to login to access this route'));
        }
        req.payload = payload;
        next()

    } catch (error) {
        next(APIError.customeError(error.message))
    }
}

export const isAdminController = async (req, res, next) => {
    const { role } = req.payload;
    if (!role) {
        return next(APIError.badRequest('Role is required'));
    }
    const isAdmin = isAdminService(role);
    if (!isAdmin) {
        return next(APIError.unAuthorized('You are not authorized to access this route'));
    }
    next();
}

export const isBorrowerController = async (req, res, next) => {
    const { role } = req.payload;
    if (!role) {
        return next(APIError.badRequest('Role is required'));
    }
    const isBorrower = isBorrowerService(role);
    if (!isBorrower) {
        return next(APIError.unAuthorized('You are not authorized to access this route'));
    }
    next();
}

export const isLenderController = async (req, res, next) => {
    const { role } = req.payload;
    if (!role) {
        return next(APIError.badRequest('Role is required'));
    }
    const isLender = isLenderService(role);
    if (!isLender) {
        return next(APIError.unAuthorized('You are not authorized to access this route'));
    }
    next();
}