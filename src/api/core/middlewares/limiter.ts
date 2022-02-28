import expressLimiter, {
  Options,
  RateLimitRequestHandler,
} from 'express-rate-limit';

/**
 ** @function createLimiter
 */
function createLimiter(options: Partial<Options>): RateLimitRequestHandler {
  return expressLimiter({
    legacyHeaders: false,
    standardHeaders: true,
    message: {
      error: {
        name: 'TooManyRequests',
        message: 'Too many requests, please try again later.',
        status: 429,
      },
    },

    ...options,
  });
}

export { createLimiter };
