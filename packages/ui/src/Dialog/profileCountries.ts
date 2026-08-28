import { getCountryDataList, getEmojiFlag } from "countries-list";

export type ProfileCountry = {
  code: string;
  dial: string;
  flag: string;
  name: string;
};

export const PROFILE_COUNTRIES: ProfileCountry[] = getCountryDataList()
  .filter((country) => country.name.trim() !== "" && country.phone.length > 0)
  .map((country) => ({
    code: country.iso2,
    dial: `+${country.phone[0]}`,
    flag: getEmojiFlag(country.iso2),
    name: country.name,
  }))
  .sort((left, right) => left.name.localeCompare(right.name, "en"));
