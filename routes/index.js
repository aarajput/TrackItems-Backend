const router = new (require('koa-router'))({
    prefix:'/v1'
});
const path = require('path');

//controllers
const controllers = requireAll(path.join(_dirRoot,'libs','controllers'));
const validators = requireAll(path.join(_dirRoot,'libs','validators'));
const authorization = require('./../libs/middlewares/authorization');


/**
 * @api {post} /user/register Register User
 * @apiVersion 0.1.0
 * @apiName RegisterUser
 * @apiGroup User
 * @apiDescription Use this api to register User
 *
 * @apiSampleRequest /user/register
 *
 * @apiParam {String} fullName Full name of user
 * @apiParam {String} email Email address of user
 * @apiParam {String} password Password of user
 *
 * @apiSuccess {Number} ID id of user
 * @apiSuccess {String} fullName    Full name of user
 * @apiSuccess {String} email   Email address of user
 * @apiSuccess {String} authorization   Authorization of user to access additional data
 * @apiSuccess {Date} updatedOn Last updated date of user
 * @apiSuccess {Date} createdOn Creation date of user
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   "meta-data": {
 *       "statusCode": 200,
 *       "message": "success"
 *   },
 *   "data": {
 *       "id": 25,
 *       "fullName": "ali",
 *       "email": "ali@maildrop.ccccc",
 *       "updatedOn": "2018-04-04T14:05:25.000Z",
 *       "createdOn": "2018-04-04T14:05:25.000Z",
 *       "authorization": "YWxpQG1haWxkcm9wLmNjY2NjfHx1amNydXFSRFcxZlN1N2Z5fHwyMDE4LTA0LTA0IDE5OjA1OjI1"
 *   }
 *  }
 *
 * @apiError {Object} meta-data Email already exists Can't signup up with this email address because it is already registered.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad-Request
 * {
 *   "meta-data": {
 *       "statusCode": 400,
 *       "message": "email already exist"
 *   }
 * }
 *
 */
router.post('/user/register',validators.users.registerUser,controllers.users.registerUser);

/**
 * @api {post} /user/login Login User
 * @apiVersion 0.1.0
 * @apiName LoginUser
 * @apiGroup User
 * @apiDescription Use this api to login User
 *
 * @apiSampleRequest /user/login
 *
 * @apiParam {String} email Email address of user
 * @apiParam {String} password Password of user
 *
 * @apiSuccess {Number} ID id of user
 * @apiSuccess {String} fullName    Full name of user
 * @apiSuccess {String} email   Email address of user
 * @apiSuccess {String} authorization   Authorization of user to access additional data
 * @apiSuccess {Date} updatedOn Last updated date of user
 * @apiSuccess {Date} createdOn Creation date of user
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   "meta-data": {
 *       "statusCode": 200,
 *       "message": "success"
 *   },
 *   "data": {
 *       "id": 25,
 *       "fullName": "ali",
 *       "email": "ali@maildrop.ccccc",
 *       "updatedOn": "2018-04-04T14:05:25.000Z",
 *       "createdOn": "2018-04-04T14:05:25.000Z",
 *       "authorization": "YWxpQG1haWxkcm9wLmNjY2NjfHx1amNydXFSRFcxZlN1N2Z5fHwyMDE4LTA0LTA0IDE5OjA1OjI1"
 *   }
 *  }
 *
 * @apiError {Object} meta-data User not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Bad-Request
 * {
 *   "meta-data": {
 *       "statusCode": 401,
 *       "message": "User not found"
 *   }
 * }
 *
 */
router.post('/user/login',validators.users.loginUser,controllers.users.loginUser);

/**
 * @api {get} /user/me User Profile Info
 * @apiVersion 0.1.0
 * @apiName Profile Info
 * @apiGroup User
 * @apiDescription Use this api to get user detail
 *
 * @apiSampleRequest /user/me
 *
 * @apiHeader {String} authorization Authorization token of user
 *
 * @apiSuccess {Number} ID id of user
 * @apiSuccess {String} fullName    Full name of user
 * @apiSuccess {String} email   Email address of user
 * @apiSuccess {String} authorization   Authorization of user to access additional data
 * @apiSuccess {Date} updatedOn Last updated date of user
 * @apiSuccess {Date} createdOn Creation date of user
 *
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   "meta-data": {
 *       "statusCode": 200,
 *       "message": "success"
 *   },
 *   "data": {
 *       "id": 25,
 *       "fullName": "ali",
 *       "email": "ali@maildrop.ccccc",
 *       "updatedOn": "2018-04-04T14:05:25.000Z",
 *       "createdOn": "2018-04-04T14:05:25.000Z",
 *       "authorization": "YWxpQG1haWxkcm9wLmNjY2NjfHx1amNydXFSRFcxZlN1N2Z5fHwyMDE4LTA0LTA0IDE5OjA1OjI1"
 *   }
 *  }
 *
 * @apiError {Object} meta-data User not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Bad-Request
 * {
 *   "meta-data": {
 *       "statusCode": 401,
 *       "message": "Access token invalid"
 *   }
 * }
 *
 */
router.get('/user/me',authorization,controllers.users.meUser);

module.exports = router;

