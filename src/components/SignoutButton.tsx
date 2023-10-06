import type { JSX } from "preact/jsx-runtime";

export const prerender = false;
export default function SignOutButton() {
  const handleSubmit = async (
    e: JSX.TargetedEvent<HTMLFormElement, Event<EventTarget>>,
  ) => {
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
