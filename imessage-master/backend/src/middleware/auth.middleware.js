import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
  try {
    const demoUserId = req.headers["x-demo-user-id"];
    const userId = demoUserId || req.auth?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let user = await User.findOne({ clerkId: userId });

    if (!user && userId === "demo-user") {
      user = await User.findOneAndUpdate(
        { clerkId: userId },
        {
          clerkId: userId,
          email: "demo@example.com",
          fullName: "Demo User",
          profilePic: "",
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
    }

    if (!user) {
      res.status(404).json({ message: "User profile is not synced yet" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
