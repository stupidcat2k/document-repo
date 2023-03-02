/** @format */

export const HTTP_REQUEST = {
  HEADERS: {
    AUTHORIZATION: 'Authorization',

    CONTENT_TYPE: 'Content-Type'
  },

  AUTHORIZATION: {
    BASIC_TYPE: 'Basic ',

    BEARER_TYPE: 'Bearer '
  },

  CONTENT_TYPES: {
    JSON: 'application/json',

    FORM: 'multipart/form-data'
  },

  STATUS_CODES: {
    BAD_REQUEST: 400,

    UNAUTHORIZED: 401,

    FORBIDDEN: 403,

    NOT_FOUND: 404,

    SERVER_ERROR: 500
  }
};

export const HTTP_ERROR_MESSAGE = {
  400: 'Request data went wrong',
  401: 'Endpoint requires authentication',
  403: 'Forbidden endpoint',
  404: 'Endpoint is not found',
  500: 'Something went wrong'
};

export const STATUS_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

export const NOTIFICATION_COLOR = {
  [STATUS_TYPE.SUCCESS]: 'notify-success',
  [STATUS_TYPE.ERROR]: 'notify-error',
  [STATUS_TYPE.INFO]: 'notify-info',
  [STATUS_TYPE.WARNING]: 'notify-warning'
};

export const DATE_YYYYMMDDHHMMSS = 'YYYY-MM-DD HH:mm:ss';
export const DATE_YYYYMMDD = 'MMM DD, YYYY';
export const DATE_YYYYMMDDHHMMSS_FILE = 'YYYY_MM_DD-HH_mm_ss';
