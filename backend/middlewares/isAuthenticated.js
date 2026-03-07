import jwt from "jsonwebtoken"

export const isAuthenticated = (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded   // not decoded.user

    next()

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}