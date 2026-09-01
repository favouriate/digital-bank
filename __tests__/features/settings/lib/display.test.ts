import { personalDetailsSchema } from "@/features/settings/schemas/personal-details-schema";
import { displayValue, formatDateOfBirth, MISSING_FIELD } from "@/features/settings/lib/display";

describe("personalDetailsSchema", () => {
  const valid = {
    name: "Carla Rosser",
    email: "carla.rosser@example.com",
    phone: "+234 803 555 0142",
    dateOfBirth: "1992-06-12",
    nationality: "Nigerian",
    address: "18 Admiralty Way, Lekki, Lagos, Nigeria",
  };

  it("accepts complete valid details", () => {
    expect(personalDetailsSchema.parse(valid)).toMatchObject({
      name: "Carla Rosser",
      email: "carla.rosser@example.com",
    });
  });

  it("rejects a future date of birth", () => {
    const result = personalDetailsSchema.safeParse({
      ...valid,
      dateOfBirth: "2099-01-01",
    });

    expect(result.success).toBe(false);
  });
});

describe("display helpers", () => {
  it("uses Not provided for missing fields", () => {
    expect(displayValue("")).toBe(MISSING_FIELD);
    expect(displayValue("  ")).toBe(MISSING_FIELD);
    expect(displayValue(undefined)).toBe(MISSING_FIELD);
    expect(displayValue("Carla")).toBe("Carla");
  });

  it("formats a date of birth without inventing a local timezone shift", () => {
    expect(formatDateOfBirth("1992-06-12")).toBe("12 Jun 1992");
  });
});
