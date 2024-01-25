import React from "react";

import { Tabs } from "@mui/material";

import TabsItem from "src/components/common/TabItem";

interface TabMenuSubsidiaryProps {
  pageId: number;
  id?: number | string;
}

function TabMenuSubsidiary({
  pageId,
  id,
}: TabMenuSubsidiaryProps): React.ReactElement {
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
        <TabsItem label="Políticas" href={`/subsidiary/${id}/policy`} />
        <TabsItem
          label="Políticas por aplicación"
          href={`/subsidiary/${id}/application/policy/tire`}
        />
        <TabsItem
          label="Políticas de presión"
          href={`/subsidiary/${id}/pressure/policy/vehicle`}
        />
        <TabsItem
          label="Políticas de profundidad"
          href={`/subsidiary/${id}/depth/policy/vehicle`}
        />
        <TabsItem
          label="Valor de cascos"
          href={`/subsidiary/${id}/helmet/value`}
        />
      </Tabs>
    </>
  );
}

export default TabMenuSubsidiary;
