import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).send({ message: "no token provided" })
        }

        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }

    catch (error) {
        res.status(401).send({ message: "please authenticate" })
    }

}

export default auth;