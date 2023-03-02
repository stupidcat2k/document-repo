export const REQUEST_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const METHODS_ALLOW_PAYLOAD = [
  REQUEST_METHODS.POST,
  REQUEST_METHODS.PUT,
  REQUEST_METHODS.PATCH,
  // REQUEST_METHODS.DELETE
];

export const isFormData = (val) => {
  return typeof FormData !== "undefined" && val instanceof FormData;
};