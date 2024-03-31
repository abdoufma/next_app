import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { decryptJWT, verifyJWT } from "@/utils/jwt";

export default async function TestPage() {
  const cookielist = cookies();
  // const session = await getIronSession(cookielist, { password: process.env.AUTH_SECRET!, cookieName: "jwt" });
  // console.log(session);

  // return <h2>Your session : {`${JSON.stringify(session)}`}</h2>;

  // return
  const jwt = cookielist.get("jwt");
  console.log(jwt);
  if (!jwt) return <h2 className="flex min-h-screen min-w-full flex-col items-center justify-center text-xl font-bold">Invalid JWT, bro!</h2>;
  try {
    const decoded = await decryptJWT(jwt.value);
    const user = decoded.payload.user as { email: string; admin: boolean };
    // console.log({ payload: decoded.payload });
    if (decoded) {
      return (
        <div className="grid h-full w-full place-content-center">
          <h2>Valid token!</h2>
          <h2>Welcome, {user.email}</h2>
        </div>
      );
    }
  } catch (err: any) {
    return <h2>Auth Error : ${err}</h2>;
  }
}
