import { ResData, http } from "../http";

export async function getUserByPasswordResetToken(token: string) {
  try {
    const res = await http.get<ResData>("/users/token/" + token);
    return res.data;
  } catch (error: any) {
    return null;
  }
}
