import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  userType: Joi.string().example("user").required(),

}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const BusinessSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Munch Box"),
    category: Joi.string().required().example("Dining"),
    address: Joi.string().required().example("12 Fake Street, Wexford"),
    description: Joi.string().required().example("A lovely fake street, with fake businesses"),
    lat: Joi.number().allow("").optional().example(-3.56),
    lng: Joi.number().allow("").optional().example(35.675),
    image: Joi.string().optional().example("/images/cloud-img.jpg"),
    locationid: IdSpec,
  })
  .label("Business");

export const BusinessSpecPlus = BusinessSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("BusinessPlus");

export const BusinessArraySpec = Joi.array().items(BusinessSpecPlus).label("BusinessArray");

export const LocationSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Italy"),
    imageURL: Joi.string().optional().example("https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg"),
    lat: Joi.number().allow("").optional().example(-3.56),
    lng: Joi.number().allow("").optional().example(35.675),
    weather:Joi.string().allow("").optional().example("Sunny"),
    temp: Joi.number().optional().example(35.6),
    userid: IdSpec,
    businesss: BusinessArraySpec,
  })
  .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const ReviewSpec = Joi.object()
  .keys({
    content: Joi.string().required().example("Italy"),
    rating: Joi.number().optional().example(2),
    userid: IdSpec,
    businessid: IdSpec,
    timestamp: Joi.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
  })
.label("Review");

export const ReviewSpecPlus = ReviewSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");