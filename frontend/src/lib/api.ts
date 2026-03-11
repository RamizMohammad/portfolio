// Flask backend API configuration
// Update this URL when your server is deployed
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://mohammadramiz.in";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(data: ContactFormData): Promise<{ success: boolean }> {
  const formData = new FormData();
  formData.append("message", `From: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);

  const response = await fetch(`${API_BASE_URL}/send`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

export async function checkServerHealth(): Promise<{ status: string; version: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}
