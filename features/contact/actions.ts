"use server";

import { redirect } from "next/navigation";

export async function submitContactFormAction(formData: FormData) {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const subject = (formData.get("subject") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    redirect("/contact?error=1");
  }

  redirect("/contact?sent=1");
}
