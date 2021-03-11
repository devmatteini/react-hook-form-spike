import { Contact } from "./watchers-form"

export const contacts: Record<Contact, string> = {
    EMAIL: "Indirizzo email",
    SIGNAL: "Signal",
    GITHUB: "Github username",
}

export const contactOptions = [
    { label: "Seleziona...", value: "" },
    ...Object.keys(contacts).map((x) => ({ label: contacts[x], value: x })),
]
