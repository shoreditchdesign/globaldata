import { Tabs, TabsList, TabsPanel, TabsTab } from "./Tabs";
import {
  OverviewDemo,
  OverviewShell,
  OverviewShowcaseRow,
} from "../storybook/OverviewShell";
import overviewStyles from "../storybook/Overview.module.css";
import styles from "./TabsOverview.module.css";

const previewCode = `<Tabs defaultValue="analysis">
  <TabsList>
    <TabsTab value="analysis">Analysis</TabsTab>
    <TabsTab value="deals">Deals</TabsTab>
    <TabsTab value="news">News</TabsTab>
  </TabsList>
  <TabsPanel value="analysis">Analysis content</TabsPanel>
  <TabsPanel value="deals">Deals content</TabsPanel>
  <TabsPanel value="news">News content</TabsPanel>
</Tabs>`;

export function TabsOverview() {
  return (
    <OverviewShell
      badge={
        <svg
          aria-hidden="true"
          className={overviewStyles.heroBadgeIcon}
          viewBox="0 0 24 24"
        >
          <path d="M4 7h5" />
          <path d="M11 7h5" />
          <path d="M4 11h16" />
        </svg>
      }
      code={previewCode}
      description="Tabs switch between related views in the same context. Pair TabsList and TabsTab with TabsPanel so the selected tab actually changes the content below."
      preview={
        <div className={styles.previewBlock}>
          <Tabs defaultValue="analysis">
            <TabsList>
              <TabsTab value="analysis">Analysis</TabsTab>
              <TabsTab value="deals">Deals</TabsTab>
              <TabsTab value="news">News</TabsTab>
            </TabsList>
            <TabsPanel value="analysis">
              Market analysis and research for the selected coverage.
            </TabsPanel>
            <TabsPanel value="deals">
              Deal activity and related records in this workspace.
            </TabsPanel>
            <TabsPanel value="news">
              Latest headlines matched to this topic.
            </TabsPanel>
          </Tabs>
        </div>
      }
      previewWide
      title="Tabs"
    >
      <OverviewShowcaseRow
        description="A compact set of tabs with one panel per tab. Keyboard arrow keys move focus; Enter activates the tab."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M4 8h4" />
            <path d="M10 8h4" />
            <path d="M16 8h4" />
            <path d="M4 12h16" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneBrand}
        title="Basic tabs"
      >
        <OverviewDemo>
          <div className={styles.previewBlock}>
            <Tabs defaultValue="one">
              <TabsList>
                <TabsTab value="one">One</TabsTab>
                <TabsTab value="two">Two</TabsTab>
                <TabsTab value="three">Three</TabsTab>
              </TabsList>
              <TabsPanel value="one">Panel for One.</TabsPanel>
              <TabsPanel value="two">Panel for Two.</TabsPanel>
              <TabsPanel value="three">Panel for Three.</TabsPanel>
            </Tabs>
          </div>
        </OverviewDemo>
      </OverviewShowcaseRow>

      <OverviewShowcaseRow
        description="Labels come from the consumer. Longer catalogues wrap or scroll horizontally inside the list — there are no extra visual variants in the API."
        icon={
          <svg
            aria-hidden="true"
            className={overviewStyles.iconSvg}
            viewBox="0 0 24 24"
          >
            <path d="M4 8h6" />
            <path d="M12 8h8" />
            <path d="M4 12h16" />
          </svg>
        }
        iconClassName={overviewStyles.iconToneTeal}
        title="More labels"
      >
        <OverviewDemo>
          <div className={styles.previewBlock}>
            <Tabs defaultValue="analysis">
              <TabsList>
                <TabsTab value="analysis">Analysis</TabsTab>
                <TabsTab value="deals">Deals</TabsTab>
                <TabsTab value="news">News</TabsTab>
                <TabsTab value="clinical-trials">Clinical Trials</TabsTab>
              </TabsList>
              <TabsPanel value="analysis">Analysis panel.</TabsPanel>
              <TabsPanel value="deals">Deals panel.</TabsPanel>
              <TabsPanel value="news">News panel.</TabsPanel>
              <TabsPanel value="clinical-trials">
                Clinical Trials panel.
              </TabsPanel>
            </Tabs>
          </div>
        </OverviewDemo>
      </OverviewShowcaseRow>
    </OverviewShell>
  );
}
