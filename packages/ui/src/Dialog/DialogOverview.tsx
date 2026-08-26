import { useState } from "react";
import { Select } from "@base-ui/react/select";
import clsx from "clsx";

import { Button } from "../Button/Button";
import styles from "./DialogOverview.module.css";

const FOCUS_HINT =
  "None selected – add this to tailor our content to your business objectives.";

const GEOGRAPHY_OPTIONS = ["United Kingdom", "United States", "Germany"];
const SECTOR_OPTIONS = ["Technology", "Healthcare", "Energy"];
const SOLUTION_OPTIONS = [
  "Market Intelligence",
  "Data Analytics",
  "Consulting",
];
const DEPARTMENT_OPTIONS = ["Marketing", "Product", "Sales"];
const TITLE_OPTIONS = ["Manager", "Director", "Analyst"];
const COUNTRY_CODE_OPTIONS = ["+44", "+1", "+91"];
const ADDITIONAL_OPTIONS = ["Option A", "Option B", "Option C"];

function FieldChevron() {
  return <span className={styles.fieldChevron} />;
}

function ProfileSelect({
  ariaLabel,
  hint,
  label,
  options,
  triggerClassName,
  wrapperClassName,
}: {
  ariaLabel?: string;
  hint?: string;
  label: string;
  options: string[];
  triggerClassName?: string;
  wrapperClassName?: string;
}) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className={wrapperClassName ?? styles.field}>
      <Select.Root
        modal={false}
        value={value}
        onValueChange={(next) => {
          setValue(typeof next === "string" ? next : null);
        }}
      >
        <Select.Trigger
          aria-label={ariaLabel ?? label}
          className={clsx(styles.selectTrigger, triggerClassName)}
        >
          <Select.Value className={styles.fieldLabel} placeholder={label} />
          <Select.Icon className={styles.selectIcon}>
            <FieldChevron />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            alignItemWithTrigger={false}
            className={styles.selectPositioner}
            side="bottom"
            sideOffset={4}
          >
            <Select.Popup className={styles.selectPopup}>
              <Select.List>
                {options.map((option) => (
                  <Select.Item
                    key={option}
                    className={styles.selectItem}
                    value={option}
                  >
                    <Select.ItemText>{option}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      {hint && value == null ? <p className={styles.fieldHint}>{hint}</p> : null}
    </div>
  );
}

export function DialogProfileContent() {
  return (
    <div className={styles.content}>
      <section className={styles.focusSection}>
        <h3 className={styles.sectionTitle}>My Focus</h3>
        <div className={styles.focusContent}>
          <p className={styles.sectionHint}>
            Please select your areas of focus.
          </p>
          <div className={styles.fieldStack}>
            <ProfileSelect
              hint={FOCUS_HINT}
              label="Geography Focus"
              options={GEOGRAPHY_OPTIONS}
              triggerClassName={styles.fieldControl}
            />
            <ProfileSelect
              hint={FOCUS_HINT}
              label="Sector Focus"
              options={SECTOR_OPTIONS}
              triggerClassName={styles.fieldControl}
            />
            <ProfileSelect
              hint={FOCUS_HINT}
              label="Solutions Interested"
              options={SOLUTION_OPTIONS}
              triggerClassName={styles.fieldControl}
            />
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h3 className={styles.aboutTitle}>Tell us about yourself</h3>
        <div className={styles.aboutFields}>
          <div className={styles.grid}>
            <ProfileSelect
              label="Job Department"
              options={DEPARTMENT_OPTIONS}
              triggerClassName={styles.fieldControl}
            />
            <ProfileSelect
              label="Job Title"
              options={TITLE_OPTIONS}
              triggerClassName={styles.fieldControl}
            />
          </div>
          <div className={styles.grid}>
            <div className={styles.phoneGroup}>
              <ProfileSelect
                label="Country Code"
                options={COUNTRY_CODE_OPTIONS}
                triggerClassName={styles.phoneCode}
                wrapperClassName={styles.phoneSelect}
              />
              <input
                aria-label="Mobile Number"
                className={styles.phoneNumber}
                placeholder="Mobile Number"
                type="tel"
              />
            </div>
            <ProfileSelect
              ariaLabel="Additional preference"
              label={"\u00a0"}
              options={ADDITIONAL_OPTIONS}
              triggerClassName={styles.fieldControl}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export function DialogProfileFooter() {
  return (
    <div className={styles.footerStack}>
      <Button className={styles.saveButton} type="button">
        Save Preferences
      </Button>
      <p className={styles.legal}>
        Visit our{" "}
        <a className={styles.legalLink} href="#privacy-policy">
          privacy policy
        </a>{" "}
        for more information about our services, how we may use, process and
        share your personal data, including information on your rights in
        respect of your personal data.
      </p>
    </div>
  );
}
