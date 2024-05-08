import SignInForm from "@/components/SignInForm";

type Props = {
  searchParams?: Record<"callbackURL" | "error", string>;
};
function page(props: Props) {
  return <SignInForm error={props.searchParams?.error} />;
}

export default page;
