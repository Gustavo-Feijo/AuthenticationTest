import { auth } from "@/auth";
import Authentication from "@/components/Authentication";

//Mocking page just for testing, if the user is logged in, return the data, else return the authentication screen. Should be done with middleware.
async function page() {
  const data = await auth();
  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  } else {
    return <Authentication />;
  }
}

export default page;
