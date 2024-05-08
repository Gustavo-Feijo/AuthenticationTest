import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

const prisma = new PrismaClient();

//Schema containing the zod requirements for the password and email.
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * Function that hashes the given password for a given email and insert it into the database.
 * @param email Client email.
 * @param password Client password on plain text.
 */
async function hashAndStore(email: string, password: string) {
  //Hashing the password with 10 salting rounds.
  const hashedPassword = await bcrypt.hash(password, 10);

  //Creating the user on the database.
  await prisma.user.create({
    data: { email: email, password: hashedPassword },
  });
}
//Handling the post request.
export async function POST(request: Request) {
  try {
    const req = await request.json();

    //Verifying if the request has
    if (!req.email || !req.password) {
      return Response.json({ error: "Missing parameters" }, { status: 400 });
    }

    //Treat the request with the zod schema, them call the function for hashing and storing.
    const treatedReq = userSchema.parse(req);
    await hashAndStore(treatedReq.email, treatedReq.password);

    return Response.json(
      { message: "User was inserted sucesfully" },
      { status: 201 }
    );
  } catch (err: any) {
    //Verify if a error is a invalid input from Zod or the email unique key already exists.
    if (err instanceof z.ZodError) {
      return Response.json(
        { error: "Invalid input: " + err.message },
        { status: 400 }
      );
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return Response.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }
    } else {
      console.error("Unhandled error on client signup: " + err.message);
      return Response.json({ error: err.message }, { status: 500 });
    }
  }
}
