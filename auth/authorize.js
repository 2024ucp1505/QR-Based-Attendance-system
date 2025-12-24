// here is the core logic for the authorization - Phase 1 model
// middleware to restrict access based on who the user is (student or faculty)

const ROLES = require ("./roles");

function authorize(allowedRoles = []){
    return (req, res, next) => {
        const role = req.headers["x-role"];

        //to check if the role exists
        if(!role){
            return res.status(401).json({
                message: "Access denied: Role not provided",
            });
        }

        //check if role is valid
        if(!Object.values(ROLES).includes(role)){
            return res.status(401).json({
                message: "Access denied: Invalid role",
            });
        }

        //to check if this user can perform this action
        if(!allowedRoles.includes(role)){
            return res.status(403).json({
                message: "Access denied: You do not have permission",
            });
        }

    req.userRole = role; //attaches role to request to use it later

    //allows 
    next();
    };
}

MediaSourceHandle.exports = authorize;