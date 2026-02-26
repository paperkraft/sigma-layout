export function getDisplayName(obj: any): string {
    if (!obj || typeof obj !== "object") return "";

    if (obj.name) return String(obj.name);
    if (obj.fullName) return String(obj.fullName);

    if (obj.firstName || obj.lastName) {
        return [obj.firstName, obj.lastName].filter(Boolean).join(" ");
    }

    const key = Object.keys(obj).find((k) =>
        k.toLowerCase().includes("name")
    );

    return key ? String(obj[key]) : "";
}

export const getEmailProviderLink = (email: string) => {
    if (!email || !email.includes("@")) return null;
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return null;

    if (domain === "gmail.com" || domain === "googlemail.com") {
        return { name: "Gmail", url: "https://mail.google.com" };
    }
    if (
        domain === "outlook.com" ||
        domain === "hotmail.com" ||
        domain === "live.com" ||
        domain === "windowslive.com"
    ) {
        return { name: "Outlook", url: "https://outlook.live.com/mail/0/inbox" };
    }
    if (
        domain === "yahoo.com" ||
        domain === "ymail.com" ||
        domain === "yahoo.in" ||
        domain === "yahoo.co.uk"
    ) {
        return { name: "Yahoo Mail", url: "https://mail.yahoo.com" };
    }
    if (domain === "icloud.com" || domain === "me.com" || domain === "mac.com") {
        return { name: "iCloud Mail", url: "https://www.icloud.com/mail" };
    }
    if (domain === "protonmail.com" || domain === "proton.me") {
        return { name: "ProtonMail", url: "https://mail.proton.me" };
    }
    if (domain === "zoho.com" || domain === "zoho.in") {
        return { name: "Zoho Mail", url: "https://mail.zoho.com" };
    }
    if (domain === "yopmail.com") {
        return { name: "Yop Mail", url: "https://yopmail.com/wm" };
    }
    return null;
};