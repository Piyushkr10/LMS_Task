exports.roleMiddleware =(role)=>{
    return (req,res,next)=>{
        if(!roles.includes(res.users.role)){
            return res.status(403).json({
                message:'Access denied'
            });
        }
        next();
    };
};