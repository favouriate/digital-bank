import type { DestinationCountryCode } from "../types/destination";

export const MOCK_RECIPIENT_NAMES: Record<DestinationCountryCode, string[]> = {
  NG: [
    "Ada Okafor",
    "Tobi Adeyemi",
    "Amara Eze",
    "Chidi Nwosu",
    "Kemi Adebayo",
  ],
  US: ["Emily Carter", "Noah Wilson", "Mia Brooks", "Daniel Parker"],
  GB: ["Oliver Hughes", "Sophie Bennett", "George Clarke", "Amelia Lewis"],
  CA: ["Liam Martin", "Emma Campbell", "Noah Tremblay", "Olivia Wilson"],
  GH: ["Kwame Mensah", "Ama Boateng", "Kofi Asare", "Abena Owusu"],
  ZA: ["Thabo Dlamini", "Naledi Mokoena", "Sipho Nkosi", "Lerato Molefe"],
};
