import registerdataschema from "../model/registerdataschema.js";

export const registerData =async(req,res)=>{

    try {
        const RegisterData =new registerdataschema(req.body);
        const {email} =RegisterData;
        const RegisterExist =await registerdataschema.findOne({email});

        if (RegisterExist) {
            return res.status(400).json({msg:"User already exists"});
        }else{
            const registerUser =await RegisterData.save();
           return res.status(200).json({msg:"Register Success"}) ;
        }


    } catch (error) {
         res.status(300).json({error:"Internel Server Error"}) 
    }

};