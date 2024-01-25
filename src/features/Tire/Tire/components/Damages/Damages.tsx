import React, { useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { BaseContainer } from "src/components/common/BaseContainer";
import { CustomPagination } from "src/components/common/CustomPagination";
import { Portal } from "src/components/common/Portal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { useCrud, useCrudQuery } from "src/hooks/crud";
import { useProgressQuery } from "src/hooks/progress";

import { getDamageHistory } from "../../api/historyApi";
import { getTire } from "../../api/tireApi";
import TabMenuHistory from "../TabMenuHistory";
import { DamagesTable } from "./DamagesTable";

export { Damages };

function Damages(): React.ReactElement {
  const { t } = useTranslation();
  const { id } = useParams();
  const [currentDamage, setCurrentDamage] = useState<any>();
  const [imageOpen, setImageOpen] = useState(false);

  const tireQuery = useQuery({
    queryKey: ["tire"],
    queryFn: async () => {
      return await getTire({ id: `${id}` });
    },
  });
  const tire = tireQuery.data ?? undefined;
  useProgressQuery(tireQuery, "tire");

  const crud = useCrud<any>();
  const damageQuery = useCrudQuery({
    apiFunction: getDamageHistory,
    name: "damage",
    page: crud.page,
    search: crud.search,
    filters: crud.filters,
    keepPrevious: true,
    extras: { id: `${id}` },
  });
  const damages = damageQuery.data ?? [];

  function onImagePress(damage: any) {
    setCurrentDamage(damage);
    setImageOpen(true);
  }

  return (
    <>
      <BaseCustomModal
        open={imageOpen}
        size="sm"
        title={"Imagen"}
        onClose={() => {
          setImageOpen(false);
        }}
        onConfirm={() => {
          setImageOpen(false);
        }}
      >
        {currentDamage && (
          <img src={"http://localhost" + currentDamage.image} />
        )}
      </BaseCustomModal>
      <BaseContainer title={tire ? tire.code : ""}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t("general:damage_list")}
          </Typography>
          <DamagesTable damages={damages} onImage={onImagePress} />
          <CustomPagination
            page={crud.page}
            onChange={(_event, page) => crud.setPage(page)}
            totalPages={damageQuery.data?.last_page ?? 1}
          />
          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() => crud.setFilterModalOpen(true)}
              >
                <FilterListIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          </Portal>
          <Portal elementId={"navTabs"}>
            <TabMenuHistory pageId={2} id={id} />
          </Portal>
        </Container>
      </BaseContainer>
    </>
  );
}
