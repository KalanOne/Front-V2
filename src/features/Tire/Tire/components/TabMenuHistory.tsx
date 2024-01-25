import React from "react";

import { Tabs } from "@mui/material";

import { useTranslation } from "react-i18next";

import TabsItem from "src/components/common/TabItem";

interface TabMenuHistoryProps {
  pageId: number;
  id?: number | string;
}

function TabMenuHistory({
  pageId,
  id,
}: TabMenuHistoryProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <Tabs
        value={pageId}
        textColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          style: {
            backgroundColor: "white",
          },
        }}
      >
        <TabsItem
          label={t("general:tire_history")}
          href={`/tire/${id}/history`}
        />
        <TabsItem
          label={t("general:tire_review_history")}
          href={`/tire/${id}/review_history`}
        />
        <TabsItem
          label={t("common:damage", { context: "plural" })}
          href={`/tire/${id}/damage`}
        />
        <TabsItem
          label={t("common:wear", { context: "plural" })}
          href={`/tire/${id}/wear`}
        />
      </Tabs>
    </>
  );
}

export default TabMenuHistory;
