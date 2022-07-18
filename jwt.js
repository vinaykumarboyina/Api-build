const jwt=require("jsonwebtoken")

const verifyJwtToken=async (req,res,next)=>{

    
    const authHeader=req.headers.authorization

    if (authHeader===undefined){
        res.send("token is not existed")
    }
    else{
        const jwtToken=authHeader.split(" ")[1];
        console.log(jwtToken)
        const isJwtMatched=await jwt.verify(jwtToken,"kljfbbvafgvthbbjhfs", async (err , data)=>{
            if(err){
                res.status(401)
                res.send("Invalid Jwt token")
            }else{
                //req.body.jwtToken=jwtToken
                console.log(jwtToken)
                next()
            }
        })
        
        // if(isJwtMatched){
        //     next()
        // }else{
        //     res.send("jwt is not valid").status(400)
        // }
    }
    
    
    
}

module.exports= verifyJwtToken