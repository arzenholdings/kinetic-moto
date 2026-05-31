"use server";

import { redirect } from "next/navigation";

import { insertKineticLead } from "@/lib/kinetic-leads";

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return value.replace(/\D/g, "").length >= 7;
}

async function sendOptionalInquiryWebhook(inquiry: {
  name: string;
  email: string;
  phone: string;
  selectedModel: string;
  purchaseTimeframe: string;
  financingInterest: string;
  reserveDepositInterest: string;
  location: string;
  message: string;
  intent: string;
  submittedAt: string;
  source: string;
}) {
  const webhookUrl = process.env.KINETIC_INQUIRY_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });

    if (response.ok) {
      return true;
    }

    console.error("Kinetic Moto optional inquiry webhook failed", {
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error) {
    console.error("Kinetic Moto optional inquiry webhook error", error);
  }

  return false;
}

export async function submitKineticInquiry(formData: FormData) {
  const inquiry = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    selectedModel:
      readField(formData, "selectedModel") ||
      readField(formData, "preferredModel") ||
      readField(formData, "interestedBike"),
    purchaseTimeframe:
      readField(formData, "purchaseTimeframe") ||
      readField(formData, "purchaseIntent") ||
      readField(formData, "buyingTimeline"),
    financingInterest: readField(formData, "financingInterest"),
    reserveDepositInterest:
      readField(formData, "reserveDepositInterest") || readField(formData, "depositInterest"),
    location: readField(formData, "location"),
    message: readField(formData, "message"),
    intent: readField(formData, "intent") || "availability",
    submittedAt: new Date().toISOString(),
    source: "kinetic-moto-catalog",
  };

  if (
    !inquiry.name ||
    !inquiry.selectedModel ||
    !inquiry.purchaseTimeframe ||
    !inquiry.financingInterest ||
    !inquiry.reserveDepositInterest ||
    !inquiry.location ||
    !isValidEmail(inquiry.email) ||
    !isValidPhone(inquiry.phone)
  ) {
    redirect("/?inquiry=missing#inquiry");
  }

  const supabaseResult = await insertKineticLead(inquiry);

  if (supabaseResult.ok) {
    redirect("/?inquiry=sent#inquiry");
  }

  const webhookFallbackSent = await sendOptionalInquiryWebhook(inquiry);

  if (webhookFallbackSent) {
    console.warn("Kinetic lead used optional webhook fallback because Supabase was unavailable");
    redirect("/?inquiry=sent#inquiry");
  }

  if (!supabaseResult.configured) {
    console.error("Kinetic lead capture is not configured. Set Supabase server env vars.");
  }

  redirect("/?inquiry=error#inquiry");
}
