export const prerender = false;
export default function SignOutButton() {
  const handleSubmit = async (e: SubmitEvent) => {
    console.log("sign out");
    e.preventDefault();
    const response = await fetch("/api/signout", {
      method: "POST",
    });
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
