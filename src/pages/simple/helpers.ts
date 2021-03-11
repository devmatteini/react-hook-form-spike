import { Team } from "./simple-form"

export const teams: Record<Team, string> = {
    FIORENTINA: "ACF Fiorentina",
    ATLETICO_MADRID: "Atletico de Madrid",
    LIVERPOOL: "Liverpool FC",
}

export const teamOptions = [
    { label: "Seleziona...", value: "" },
    ...Object.keys(teams).map((x) => ({ label: teams[x], value: x })),
]

export const positionRegex = /^(por|dc|td|ts|cc|cdc|att|ad|as)$/
