import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { Select } from "@base-ui/react/select";
import clsx from "clsx";

import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import styles from "./DialogOverview.module.css";
import { PROFILE_COUNTRIES } from "./profileCountries";

const FOCUS_HINT =
  "None selected – add this to tailor our content to your business objectives.";

const GEOGRAPHY_OPTIONS = ["United Kingdom", "United States", "Germany"];
const SECTOR_OPTIONS = ["Technology", "Healthcare", "Energy"];
const SOLUTION_OPTIONS = [
  "Market Intelligence",
  "Data Analytics",
  "Consulting",
];

const PROFILE_FORM_ID = "profile-and-focus";
const MOBILE_NUMBER_ERROR = "Enter a valid mobile number";
const ALLOWED_PHONE_CHARS = /^[0-9+\s().-]+$/;

function isAllowedMobileNumber(value: string) {
  const trimmed = value.trim();

  if (trimmed === "") {
    return true;
  }

  return ALLOWED_PHONE_CHARS.test(trimmed) && /\d/.test(trimmed);
}

function FieldChevron({ className }: { className?: string }) {
  return <span className={clsx(styles.fieldChevron, className)} />;
}

function FocusChevron() {
  return (
    <svg
      aria-hidden="true"
      className={styles.focusChevronIcon}
      fill="none"
      focusable="false"
      viewBox="0 0 12 8"
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.saveIcon}
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
    >
      <path
        d="M3 2h7.5L14 5.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path d="M5 2.5V5h5.5V2.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 14v-4.5h6V14" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.chipClearIcon}
      fill="none"
      focusable="false"
      viewBox="0 0 16 16"
    >
      <path
        d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.5 9h6l.5-9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function stopSelectKeys(event: KeyboardEvent<HTMLInputElement>) {
  event.stopPropagation();
}

function stopSelectPointer(event: PointerEvent<HTMLInputElement>) {
  event.stopPropagation();
}

function SelectPopup({
  anchor,
  children,
  popupClassName,
  search,
}: {
  anchor?: RefObject<Element | null>;
  children: ReactNode;
  popupClassName?: string;
  search?: {
    label: string;
    onQueryChange: (query: string) => void;
    query: string;
  };
}) {
  return (
    <Select.Portal>
      <Select.Positioner
        align="start"
        alignItemWithTrigger={false}
        anchor={anchor}
        className={styles.selectPositioner}
        collisionAvoidance={{ align: "none" }}
        side="bottom"
        sideOffset={4}
      >
        <Select.Popup className={clsx(styles.selectPopup, popupClassName)}>
          {search ? (
            <div className={styles.searchWrap}>
              <input
                aria-label={search.label}
                className={styles.searchInput}
                onChange={(event) => search.onQueryChange(event.target.value)}
                onClick={(event) => event.stopPropagation()}
                onKeyDown={stopSelectKeys}
                onPointerDown={stopSelectPointer}
                placeholder="Search"
                type="search"
                value={search.query}
              />
            </div>
          ) : null}
          {children}
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  );
}

function ProfileTextInput({ label }: { label: string }) {
  return (
    <div className={styles.field}>
      <input
        aria-label={label}
        className={styles.profileTextInput}
        placeholder={label}
        type="text"
      />
    </div>
  );
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function FocusChip({
  item,
  onRemove,
}: {
  item: string;
  onRemove: (item: string) => void;
}) {
  const [exiting, setExiting] = useState(false);

  const requestRemove = () => {
    if (exiting) {
      return;
    }

    if (prefersReducedMotion()) {
      onRemove(item);
      return;
    }

    setExiting(true);
  };

  return (
    <li
      className={clsx(styles.chip, exiting && styles.chipOut)}
      onAnimationEnd={(event) => {
        if (event.currentTarget !== event.target || !exiting) {
          return;
        }

        onRemove(item);
      }}
    >
      <span className={styles.chipLabel}>{item}</span>
      <button
        aria-label={`Remove ${item}`}
        className={styles.chipRemove}
        onClick={requestRemove}
        type="button"
      >
        ×
      </button>
    </li>
  );
}

function FocusMultiSelect({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [committed, setCommitted] = useState<string[]>([]);
  const [draft, setDraft] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const committedRef = useRef(committed);
  const draftRef = useRef(draft);

  committedRef.current = committed;
  draftRef.current = draft;

  const closeWithoutCommit = () => {
    setDraft([...committedRef.current]);
    setOpen(false);
  };

  const commitAndClose = () => {
    setCommitted([...draftRef.current]);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: Event) => {
      const target = event.target;

      if (
        target instanceof Node &&
        rootRef.current &&
        !rootRef.current.contains(target)
      ) {
        setDraft([...committedRef.current]);
        setOpen(false);
      }
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeWithoutCommit();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggleOption = (option: string) => {
    setDraft((current) =>
      current.includes(option)
        ? current.filter((entry) => entry !== option)
        : [...current, option],
    );
  };

  const removeItem = (item: string) => {
    setCommitted((current) => current.filter((entry) => entry !== item));
    setDraft((current) => current.filter((entry) => entry !== item));
  };

  const hasSelection = committed.length > 0;

  return (
    <div
      className={clsx(styles.field, open && styles.fieldOpen)}
      ref={rootRef}
    >
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={label}
        className={clsx(
          styles.selectTrigger,
          styles.fieldControl,
          styles.focusTrigger,
        )}
        onClick={() => {
          if (open) {
            closeWithoutCommit();
            return;
          }

          setDraft([...committedRef.current]);
          setOpen(true);
        }}
        type="button"
      >
        <span className={styles.fieldLabel}>{label}</span>
        <span className={styles.focusAction} aria-hidden="true">
          <FocusChevron />
        </span>
      </button>
      {open ? (
        <div
          className={styles.focusPanel}
          id={panelId}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <ul className={styles.checkList}>
            {options.map((option) => (
              <li key={option}>
                <label className={styles.checkRow}>
                  <input
                    checked={draft.includes(option)}
                    className={styles.checkbox}
                    onChange={() => toggleOption(option)}
                    onClick={(event) => event.stopPropagation()}
                    type="checkbox"
                  />
                  <span>{option}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className={styles.focusPanelActions}>
            <button
              className={styles.focusPanelAction}
              onClick={() => setDraft([...options])}
              type="button"
            >
              Select All
            </button>
            <button
              className={styles.focusPanelAction}
              onClick={() => setDraft([])}
              type="button"
            >
              Clear
            </button>
            <button
              className={styles.focusPanelSubmit}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                commitAndClose();
              }}
              type="button"
            >
              Submit
            </button>
          </div>
          <p className={styles.focusPanelHint}>
            Please submit to save selected preferences.
          </p>
        </div>
      ) : null}
      {hasSelection ? (
        <div className={styles.chipRow}>
          <ul className={styles.chipList}>
            {committed.map((item) => (
              <FocusChip item={item} key={item} onRemove={removeItem} />
            ))}
          </ul>
          <button
            aria-label={`Clear ${label}`}
            className={styles.chipClear}
            onClick={() => {
              setCommitted([]);
              setDraft([]);
            }}
            type="button"
          >
            <TrashIcon />
          </button>
        </div>
      ) : (
        <p className={styles.fieldHint}>{FOCUS_HINT}</p>
      )}
    </div>
  );
}

function SearchableCountrySelect() {
  const [value, setValue] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (!needle) {
      return PROFILE_COUNTRIES;
    }

    return PROFILE_COUNTRIES.filter((country) =>
      country.name.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <div className={styles.field}>
      <Select.Root
        modal={false}
        value={value}
        onOpenChange={(open) => {
          if (!open) {
            setQuery("");
          }
        }}
        onValueChange={(next) => {
          setValue(typeof next === "string" ? next : null);
        }}
      >
        <Select.Trigger
          aria-label="Country"
          className={clsx(
            styles.selectTrigger,
            styles.fieldControl,
            styles.countryTrigger,
          )}
        >
          <Select.Value className={styles.fieldLabel} placeholder="Country" />
          <Select.Icon className={styles.selectIcon}>
            <FieldChevron />
          </Select.Icon>
        </Select.Trigger>
        <SelectPopup
          search={{
            label: "Search countries",
            onQueryChange: setQuery,
            query,
          }}
        >
          <Select.List>
            {filtered.map((country) => (
              <Select.Item
                key={country.code}
                className={styles.selectItem}
                value={country.name}
              >
                <Select.ItemText>{country.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.List>
          {filtered.length === 0 ? (
            <p className={styles.emptyResults}>No matches</p>
          ) : null}
        </SelectPopup>
      </Select.Root>
    </div>
  );
}

function CountryCodeSelect({
  anchorRef,
}: {
  anchorRef: RefObject<HTMLDivElement | null>;
}) {
  const [value, setValue] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const selected = PROFILE_COUNTRIES.find((country) => country.code === value);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (!needle) {
      return PROFILE_COUNTRIES;
    }

    return PROFILE_COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(needle) ||
        country.dial.includes(needle),
    );
  }, [query]);

  return (
    <div className={styles.phoneSelect}>
      <Select.Root
        modal={false}
        value={value}
        onOpenChange={(open) => {
          if (!open) {
            setQuery("");
          }
        }}
        onValueChange={(next) => {
          setValue(typeof next === "string" ? next : null);
        }}
      >
        <Select.Trigger
          aria-label="Country Code"
          className={clsx(styles.selectTrigger, styles.phoneCode)}
        >
          <span className={styles.fieldLabel}>
            {selected ? `${selected.flag} ${selected.dial}` : "Country Code"}
          </span>
          <Select.Icon className={styles.selectIcon}>
            <FieldChevron />
          </Select.Icon>
        </Select.Trigger>
        <SelectPopup
          anchor={anchorRef}
          popupClassName={styles.phoneCodePopup}
          search={{
            label: "Search country codes",
            onQueryChange: setQuery,
            query,
          }}
        >
          <Select.List>
            {filtered.map((country) => (
              <Select.Item
                key={country.code}
                className={clsx(styles.selectItem, styles.countryCodeItem)}
                value={country.code}
              >
                <Select.ItemText>
                  {country.flag} {country.name} {country.dial}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.List>
          {filtered.length === 0 ? (
            <p className={styles.emptyResults}>No matches</p>
          ) : null}
        </SelectPopup>
      </Select.Root>
    </div>
  );
}

function PhoneField() {
  const groupRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | false>(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  function validate(next: string) {
    if (isAllowedMobileNumber(next)) {
      setError(false);
      return true;
    }

    setError(MOBILE_NUMBER_ERROR);
    return false;
  }

  useEffect(() => {
    const form = groupRef.current?.closest("form");

    if (!form) {
      return undefined;
    }

    const handleSubmit = () => {
      const valid = validate(valueRef.current);

      if (!valid) {
        groupRef.current
          ?.querySelector<HTMLInputElement>('input[type="tel"]')
          ?.focus();
      }
    };

    form.addEventListener("submit", handleSubmit);

    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <div className={styles.phoneField}>
      <div className={styles.phoneGroup} ref={groupRef}>
        <CountryCodeSelect anchorRef={groupRef} />
        <TextInput
          className={styles.phoneInput}
          error={error}
          inputMode="tel"
          label="Mobile Number"
          placeholder="Mobile Number"
          type="tel"
          value={value}
          onBlur={() => {
            validate(value);
          }}
          onChange={(event) => {
            const next = event.target.value;
            setValue(next);

            if (error) {
              validate(next);
            }
          }}
        />
      </div>
    </div>
  );
}

export function DialogProfileContent() {
  return (
    <form
      className={styles.content}
      id={PROFILE_FORM_ID}
      noValidate
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      }}
    >
      <section className={styles.focusSection}>
        <h3 className={styles.sectionTitle}>My Focus</h3>
        <div className={styles.focusContent}>
          <p className={styles.sectionHint}>
            Please select your areas of focus.
          </p>
          <div className={styles.fieldStack}>
            <FocusMultiSelect
              label="Geography Focus"
              options={GEOGRAPHY_OPTIONS}
            />
            <FocusMultiSelect label="Sector Focus" options={SECTOR_OPTIONS} />
            <FocusMultiSelect
              label="Solutions Interested"
              options={SOLUTION_OPTIONS}
            />
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h3 className={styles.aboutTitle}>Tell us about yourself</h3>
        <div className={styles.aboutFields}>
          <div className={styles.grid}>
            <ProfileTextInput label="Job Department" />
            <ProfileTextInput label="Job Title" />
          </div>
          <div className={styles.grid}>
            <PhoneField />
            <SearchableCountrySelect />
          </div>
        </div>
      </section>
    </form>
  );
}

export function DialogProfileFooter() {
  return (
    <div className={styles.footerStack}>
      <Button className={styles.saveButton} form={PROFILE_FORM_ID} type="submit">
        Save Preferences
        <SaveIcon />
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
