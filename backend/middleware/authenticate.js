import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    // Check if the token is present in the cookies
    const token = req.cookies.token;
    console.log("Token from cookies: ", token);

    // If the token is not present, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    // Verify the token using the secret key
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded user: ", decoded);
        
        req.user = decoded;
        console.log("Authenticated user: ", req.user);
        
        next();
    } catch (error) {
        console.error("Authentication failed: ", error);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }

}