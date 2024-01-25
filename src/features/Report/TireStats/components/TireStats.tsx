import React, { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Container, IconButton, Stack } from "@mui/material";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomButton } from "src/components/common/CustomButton";
import { Portal } from "src/components/common/Portal";
import { getRandomHexColor } from "src/utils/color";

import tireStatsData from "../json/x.json";
import { BarChart } from "./BarChart";
import { TireStatsTable } from "./TireStatsTable";

export { TireStats };

function TireStats(): React.ReactElement {
  // Obtén la primera propiedad del objeto
  const [chartJSData, setChartJSData] = useState();
  const [group_by, setGroupBy] = useState("brand_name");
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState({});

  function processData() {
    if (!(group_by in tireStatsData)) {
      return;
    }

    const brandsArray = Object.entries(tireStatsData[group_by]);
    const data1 = [];
    const data2 = [];

    const chartData: any = {
      labels: [],
      datasets: [
        {
          label: "",
          backgroundColor: [],
          borderColor: [],
          data: [],
          borderWidth: 1,
        },
      ],
    };

    for (let i = 0; i < brandsArray.length; i++) {
      const [brand, value] = brandsArray[i];

      chartData.labels.push(brand);
      chartData.datasets[0].data.push(value);
      chartData.datasets[0].backgroundColor.push(getRandomHexColor());
      chartData.datasets[0].borderColor.push("#000000");
      if (i < brandsArray.length / 2) {
        data1.push([brand, value]);
      } else {
        data2.push([brand, value]);
      }
    }
    setChartJSData(chartData);
    setData({ data1, data2 });
  }

  function handleTabChange(group: string) {
    setGroupBy(group);
  }

  function handleTable() {
    setShowTable(!showTable);
  }

  useEffect(() => {
    if (tireStatsData) {
      processData();
    }
  }, [tireStatsData, group_by]);

  return (
    <>
      <BaseContainer title={"Estadísticas de neumáticos"}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Box sx={{ bgcolor: "#343A40", my: 2, borderRadius: 2 }}>
            <CustomButton
              onClick={() => handleTabChange("brand_name")}
              text={"MARCAS"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
            <CustomButton
              onClick={() => handleTabChange("size")}
              text={"MEDIDAS"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
            <CustomButton
              onClick={() => handleTabChange("depth")}
              text={"PROFUNDIDADES"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
            <CustomButton
              onClick={() => handleTabChange("model")}
              text={"MODELOS"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
            <CustomButton
              onClick={() => handleTabChange("number_cycle")}
              text={"CICLOS"}
              sx={{ bgcolor: "#343A40", m: 1, fontSize: "1.3rem" }}
            />
          </Box>
          {chartJSData && <BarChart data={chartJSData}></BarChart>}
          <Box sx={{ display: "flex", gap: 0, mt: 3 }}>
            <CustomButton
              onClick={() => handleTable()}
              text={"Ver tabla de datos"}
              sx={{ width: "100%" }}
            />
            <CustomButton
              onClick={() => {}}
              text={"Generar Excel"}
              sx={{ width: "100%" }}
            />
          </Box>

          {showTable && <TireStatsTable data={data}></TireStatsTable>}
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                // onClick={() => setModals({ ...modals, filter: true })}
              >
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
