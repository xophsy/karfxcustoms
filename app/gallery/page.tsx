import { redirect } from "next/navigation";

// /gallery → /portfolio (canonical portfolio route)
export default function GalleryPage() {
  redirect("/portfolio");
}
