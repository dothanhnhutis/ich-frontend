import { z } from "zod";
import { signIn } from "../actions";
import { useServerAction } from "zsa-react";
import { createServerAction } from "zsa";

export const produceNewMessage = createServerAction()
  .input(
    z.object({
      name: z.string().min(5),
    }),
    {
      type: "formData",
    }
  )
  .handler(async ({ input }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return "Hello, " + input.name;
  });

export const SignInForm = () => {
  const { isPending, isSuccess, data, error, isError, executeFormAction } =
    useServerAction(produceNewMessage);
  return (
    <form action={executeFormAction}>
      <input type="text" name="name" placeholder="Enter your name..." />

      {/* <input placeholder="email" type="text" name="email" id="email" />
      <input
        placeholder="password"
        type="password"
        name="password"
        id="password"
      />
      <button type="submit">signin</button> */}
    </form>
  );
};
