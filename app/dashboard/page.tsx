import { cookies } from "next/headers";
import { decryptJWT, verifyJWT } from "../../lib/utils/jwt";
import DashboardPage from "./dashboard_page";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getToken() {
  console.log("----");
  console.count("login attempt");
  const cookielist = cookies();
  const jwt = cookielist.get("jwt");
  console.log(jwt);
  console.log("----");
  if (jwt == null) throw new Error("A valid session token was not found in the request. Make sure you are logged in.");
  const decoded = await decryptJWT(jwt.value);
  return decoded.payload.sid;
}

async function getUserFromSession(sid: string) {
  // return { email: "abds", name: "abds", admin: true };
  const res = await fetch(backendURL + "/authorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ sid }),
  });
  const serverResponse = await res.json();
  if (serverResponse.success) {
    return serverResponse.user;
  } else {
    return null;
  }
}

export default async function Dashboard() {
  try {
    const sessionId = await getToken();
    console.log("Checking session", sessionId);
    const user = await getUserFromSession(sessionId as string);
    console.log({ user });
    if (user && user.admin) return <DashboardPage />;
    return <h2>You are not authorized to view this page.</h2>;
  } catch (err: unknown) {
    return ErrorMessage(err);
  }
}

export function ErrorMessage(e: unknown) {
  return e instanceof Error ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
      <h2>{e.name}</h2>
      <h2>Message : {e.message}</h2>
      {/* <h2>StackTrace : {e.stack}</h2> */}
    </div>
  ) : (
    <h2>{`${e}`}</h2>
  );
}
