export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR', isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'The request is invalid.') {
    super(message, 400, 'BAD_REQUEST');
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'The requested resource was not found.') {
      super(message, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'A conflict occurred.') {
      super(message, 409, 'CONFLICT');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication is required.') {
      super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'You do not have permission.') {
      super(message, 403, 'FORBIDDEN');
  }
}