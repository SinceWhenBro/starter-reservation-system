/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/").get(controller.list).post(controller.create);


router.route("/new").post(controller.create)
.all(methodNotAllowed);
//I think i gave to create a get call for this route also

//Must validate reservations are not on tuesdays or in the past.

module.exports = router;
