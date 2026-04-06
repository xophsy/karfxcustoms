import { redirect } from "next/navigation";

// /contact → /quote
// Any old links or bookmarks to /contact land cleanly on the quote flow.
export default function ContactRedirect() {
  redirect("/quote");
}
