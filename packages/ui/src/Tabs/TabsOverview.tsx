import { Tabs, TabsList, TabsTab } from "./Tabs";
import styles from "./TabsOverview.module.css";

export function TabsOverview() {
  return (
    <div className={styles.canvas}>
      <div className={styles.page}>
        <h1 className={styles.title}>Tabs</h1>
        <p className={styles.lead}>
          Horizontal tabs with a sliding active indicator. Labels come from the
          consumer — this overview uses the Figma catalogue example.
        </p>

        <Tabs defaultValue="analysis">
          <TabsList>
            <TabsTab value="analysis">Analysis</TabsTab>
            <TabsTab value="deals">Deals</TabsTab>
            <TabsTab value="news">News</TabsTab>
            <TabsTab value="clinical-trials">Clinical Trials</TabsTab>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
