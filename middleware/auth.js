import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(403).send("Access denied");

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(500).json({ error: "Invalid Authentication" });

            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};