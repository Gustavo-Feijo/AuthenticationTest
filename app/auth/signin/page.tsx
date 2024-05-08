import SignInForm from "@/components/SignInForm";

//Props for the component, which are the search params that carry the error message.
type Props = {
  searchParams?: Record<"callbackURL" | "error", string>;
};
function page(props: Props) {
  return <SignInForm error={props.searchParams?.error} />;
}

export default page;
