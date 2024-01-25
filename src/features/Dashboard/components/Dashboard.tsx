import React, { useState } from "react";

import { Container } from "@mui/material";

import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";

import { DashboardSummary } from "./Summary/DashboardSummary.tsx";
import { DashboardBar } from "src/components/common/DashboardBar.tsx";
import { DashboardBarItem } from "src/components/common/DashboardBarItem.tsx";

export { Dashboard };

type DashboardSection = "SUMMARY" | "SAVINGS" | "PILE" | "INSPECTIONS";

function Dashboard(): React.ReactElement {
  const { t } = useTranslation();
  const [currentSection, setCurrentSection] =
    useState<DashboardSection>("SUMMARY");

  return (
    <BaseContainer title={t("features:home.title")}>
      <Container sx={{ p: 3 }} maxWidth={"xl"}>
        <DashboardBar sx={{ mb: 3 }}>
          <DashboardBarItem
            title={"Resumen"}
            isActive={currentSection === "SUMMARY"}
            onClick={() => setCurrentSection("SUMMARY")}
          />
          <DashboardBarItem
            title={"Ahorros"}
            isActive={currentSection === "SAVINGS"}
            onClick={() => setCurrentSection("SAVINGS")}
          />
          <DashboardBarItem
            title={"Pila"}
            isActive={currentSection === "PILE"}
            onClick={() => setCurrentSection("PILE")}
          />
          <DashboardBarItem
            title={"Revisiones"}
            isActive={currentSection === "INSPECTIONS"}
            onClick={() => setCurrentSection("INSPECTIONS")}
          />
        </DashboardBar>
        <DashboardSummary />
      </Container>
    </BaseContainer>
  );
}
