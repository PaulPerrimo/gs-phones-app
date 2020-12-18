const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const Phone = require("../models/phone-schema");

const getPhoneById = async (req, res, next) => {
  const phoneId = req.params["pid"];
  let phone;
  try {
    phone = await Phone.findById(phoneId);
  } catch (_) {
    const error = new HttpError("Something went wrong, could not find a phone.", 500);
    return next(error);
  }
  if (!phone) {
    const error = new HttpError("Could not find a phone for the provided id.", 404);
    return next(error);
  }
  res.json({ phone: phone.toObject({ getters: true }) });
};

const createPhone = async ({ body, ...req }, res, next) => {
  const errors = validationResult({ body, ...req });
  if (!errors.isEmpty()) return next(new HttpError("Invalid inputs passed, please check your data.", 422));
  const { name, manufacturer, description, color, price, imageFileName: iFN, screen, processor, ram } = body;
  let imageFileName = iFN;
  let fileImg = false;

  if (req.file && req.file.path) {
    imageFileName = req.file.path;
    fileImg = true;
  }
  const newPhone = new Phone({ name, manufacturer, description, color, imageFileName, price, screen, processor, ram, fileImg });

  try {
    await newPhone.save();
  } catch (err) {
    const error = new HttpError("Creating phone failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ phone: newPhone.toObject({ getters: true }) });
};

const getPhones = async (req, res, next) => {
  const phones = await Phone.find({});
  res.status(200).json({ phones });
};

const updatePhone = async ({ body, params: { pid }, ...req }, res, next) => {
  const errors = validationResult({ body, ...req });
  if (!errors.isEmpty()) return next(new HttpError("Invalid inputs passed, please check your data.", 422));

  let phone;
  try {
    phone = await Phone.findById(pid);
  } catch (err) {
    const error = new HttpError("Something went wrong, could not update phone.", 500);
    return next(error);
  }

  Object.keys(body).forEach((k) => (phone[k] = body[k]));

  try {
    await phone.save();
  } catch (err) {
    const error = new HttpError("Something went wrong, could not update phone.", 500);
    return next(error);
  }

  res.status(200).json({ phone: phone.toObject({ getters: true }) });
};

const deletePhone = async ({ params: { pid } }, res, next) => {
  let phone;
  try {
    phone = await Phone.findById(pid);
  } catch (err) {
    const error = new HttpError("Something went wrong, could not delete phone.", 500);
    return next(error);
  }

  try {
    await phone.remove();
  } catch (err) {
    const error = new HttpError("Something went wrong, could not delete phone.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted Phone." });
};

exports.getPhones = getPhones;
exports.updatePhone = updatePhone;
exports.deletePhone = deletePhone;
exports.getPhoneById = getPhoneById;
exports.createPhone = createPhone;
