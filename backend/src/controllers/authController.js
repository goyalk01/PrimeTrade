import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/sendResponse.js';
import * as authService from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const result = await authService.register(email, password, name);

  sendResponse(res, 201, true, 'User registered successfully', result);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  sendResponse(res, 200, true, 'Login successful', result);
});
