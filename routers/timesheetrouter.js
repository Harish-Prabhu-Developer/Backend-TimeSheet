import express from "express";
import { registerData } from "../controller/registerdata.js";
import { loginUser} from "../controller/loginUser.js";
import { verifyOTP } from "../controller/loginUser.js";
import { forgotPassword } from "../controller/forgetpassword.js";
import { changePassword } from '../controller/changePassword.js';
import { changeTFA } from "../controller/changeTFA.js";
import { getalluserprojectinfo } from "../controller/getalluserprojectinfo.js";
import { savetasklistdata } from "../controller/savetasklistdatainfo.js";
import { gettimesheetdateprojectinfo } from "../controller/gettimesheetdateprojectinfo.js";
import { removetaskdata } from "../controller/removetaskdata.js";
const route =express.Router();


route.post("/register",registerData);
route.get("/loginuser/:email/:password",loginUser);
route.get("/checksecret/:email/:otp",verifyOTP);
route.get("/resetpassword/:email",forgotPassword);
route.get("/removetaskdata/:id",removetaskdata);
route.get("/changepassword/:buildid/:oldpass/:newpass", changePassword);
route.get("/gettimesheetdateprojectinfo/:uemail/:ulevel",gettimesheetdateprojectinfo);
route.get("/changetfa/:buildid/:tfa", changeTFA);
route.post("/savetaskdata",savetasklistdata);
route.get("/getalluserprojectinfo/:email/:userlevel", getalluserprojectinfo);








export default route;