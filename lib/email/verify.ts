import crypto from "crypto";

export function getVerificationToken() {
  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verifyToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  const verifyTokenExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

  return { verificationToken, verifyToken, verifyTokenExpires };
}