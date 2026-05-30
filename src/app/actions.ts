"use server";

import { redirect } from "next/navigation";

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

export async function submitKineticInquiry(formData: FormData) {
  const webhookUrl = process.env.KINETIC_INQUIRY_WEBHOOK_URL;
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

  if (webhookUrl) {
    let webhookFailed = false;

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });

      if (!response.ok) {
        console.error("Kinetic Moto inquiry webhook failed", {
          status: response.status,
          statusText: response.statusText,
        });
        webhookFailed = true;
      }
    } catch (error) {
      console.error("Kinetic Moto inquiry webhook error", error);
      webhookFailed = true;
    }

    if (webhookFailed) {
      redirect("/?inquiry=error#inquiry");
    }
  } else {
    console.info("Kinetic Moto inquiry received without webhook configured", inquiry);
  }

  redirect("/?inquiry=sent#inquiry");
}
