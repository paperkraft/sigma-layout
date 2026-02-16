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