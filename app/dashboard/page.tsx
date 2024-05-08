import { auth } from "@/auth";
import Authentication from "@/components/Authentication";

async function page() {
  const data = await auth();
  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  } else {
    return <Authentication />;
  }
}

export default page;
