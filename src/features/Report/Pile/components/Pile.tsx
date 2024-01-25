import { useEffect, useState } from "react";

import FilterListIcon from "@mui/icons-material/FilterList";
import { Container, IconButton, Stack } from "@mui/material";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer";
import { Portal } from "src/components/common/Portal";
import { BaseCustomModal } from "src/components/modal/BaseCustomModal";
import { BaseFilterModal } from "src/components/modal/BaseFilterModal";
import { useFilterDependencies } from "src/hooks/dependencies";
import { useProgressQuery } from "src/hooks/progress";
import { useIdentity } from "src/stores/general/identity";
import { formatter } from "src/utils/formatters";
import {
  getCompanyViaWorkArea,
  getCorporateViaWorkArea,
  getSubsidiaryViaWorkArea,
} from "src/utils/workArea";

import {
  getPile,
  getPileHistoric,
  getPileModel,
  getPileResponsible,
} from "../api/pileApi";
import {
  PileFilterInputType,
  PileFilterSchemaType,
  pileFilterDefaultValues,
  pileFilterSchema,
} from "../validation/filterPile";
import { ModelTable } from "./ModelTable";
import { PileAccordionTable } from "./PileAccordionTable";
import { PileButtons } from "./PileButtons";
import { PileFilterForm } from "./PileFilterForm";
import { PileFilters } from "./PileFilters";
import { PileHistoric } from "./PileHistoric";
import { ResponsibleTable } from "./ResponsibleTable";

export { Pile };

function Pile() {
  const { t } = useTranslation();
  const account = useIdentity((state) => state.account);
  const workArea = useIdentity((state) => state.workArea);
  const profileCorporate = getCorporateViaWorkArea(account, workArea);
  const profileCompanies = getCompanyViaWorkArea(account, workArea);
  const profileSubsidiaries = getSubsidiaryViaWorkArea(account, workArea);
  const policy = profileSubsidiaries[0]?.subsidiary.policy;
  const policyNumberCycle = policy?.number_cycle ?? 0;
  const [active, setActive] = useState("G");
  const [filters, setFilters] = useState<URLSearchParams>();
  const [responsibleFilters, setResponsibleFilters] =
    useState<URLSearchParams>();
  const [modelFilters, setModelFilters] = useState<URLSearchParams>();
  const [openModals, setOpenModals] = useState({
    filter: false,
    historic: false,
    model: false,
    responsible: false,
  });
  const [selectedFilters, setSelectedFilters] =
    useState<Partial<Record<keyof PileFilterSchemaType, string>>>();

  const pileQuery = useQuery({
    queryKey: ["pile", filters?.toString(), active],
    queryFn: async () => {
      return await getPile(active, filters);
    },
    enabled: !!filters,
  });
  useProgressQuery(pileQuery, "pile");

  const pile = pileQuery.data;

  const pileHistoricQuery = useQuery({
    queryKey: ["pileHistoric", filters?.toString(), active],
    queryFn: async () => {
      return await getPileHistoric(filters);
    },
    enabled: !!filters,
  });
  useProgressQuery(pileHistoricQuery, "pileHistoric");

  const pileHistoric = pileHistoricQuery.data ?? [];

  const pileResponsibleQuery = useQuery({
    queryKey: ["pileResponsible", responsibleFilters?.toString()],
    queryFn: async () => {
      return await getPileResponsible(responsibleFilters);
    },
    enabled: !!responsibleFilters,
  });
  useProgressQuery(pileResponsibleQuery, "pileResponsible");

  const pileResponsible = pileResponsibleQuery.data ?? [];

  const pileModelQuery = useQuery({
    queryKey: ["pileModel", modelFilters?.toString()],
    queryFn: async () => {
      return await getPileModel(modelFilters);
    },
    enabled: !!modelFilters,
  });
  useProgressQuery(pileModelQuery, "pileResponsible");

  const pileModel = pileModelQuery.data ?? [];

  const pileFilterForm = useForm<
    PileFilterInputType,
    unknown,
    PileFilterSchemaType
  >({
    defaultValues: pileFilterDefaultValues,
    resolver: zodResolver(pileFilterSchema),
  });

  const [corporate_id, companies, brands] = useWatch({
    control: pileFilterForm.control,
    name: ["corporate_id", "companies", "brands"],
  });

  const dependencies = useFilterDependencies(
    [
      "corporates",
      "companies",
      "subsidiaries",
      {
        name: "brands",
        scope: "brand_id,name,status,approved,brand_type",
        params: { brand_type: "TIRE,RETREAD" },
      },
      {
        name: "sizes",
        scope: "tire_size_id,size,status,approved",
      },
      "models",
    ],
    {
      corporate_id: corporate_id,
      company_id: companies.toString(),
      brands: brands,
    },
    ["corporate_id", "companies", "subsidiaries"],
  );

  function handleResponsibleClick(data: any) {
    const values = pileFilterForm.getValues();
    const searchParams = new URLSearchParams(data);
    if (values.date_from) {
      searchParams.append("date_from", values.date_from);
    }
    if (values.date_to) {
      searchParams.append("date_to", values.date_to);
    }
    if (values.corporate_id) {
      searchParams.append("corporate_id", `${values.corporate_id}`);
    }
    if (values.companies.length > 0) {
      searchParams.append("companies", `${values.companies.join(",")}`);
    }
    if (values.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", values.subsidiaries.join(","));
    }
    if (values.tire_condition.length > 0) {
      searchParams.append("tire_condition", values.tire_condition.join(","));
    }
    if (values.tire_application.length > 0) {
      searchParams.append(
        "tire_application",
        values.tire_application.join(","),
      );
    }
    if (values.helmet_value) {
      searchParams.append("helmet_value", `${values.helmet_value}`);
    }
    if (values.price) {
      searchParams.append("price", `${values.price}`);
    }
    if (values.brands.length > 0) {
      searchParams.append("brands", values.brands.join(","));
    }
    if (values.models.length > 0) {
      searchParams.append("models", values.models.join(","));
    }
    if (values.sizes.length > 0) {
      searchParams.append("sizes", values.sizes.join(","));
    }
    searchParams.append("number_cycle", active);
    setResponsibleFilters(searchParams);
    setOpenModals((prevState) => {
      return { ...prevState, responsible: true };
    });
  }

  function handleModelClick(data: any) {
    const values = pileFilterForm.getValues();
    const searchParams = new URLSearchParams(data);
    if (values.date_from) {
      searchParams.append("date_from", values.date_from);
    }
    if (values.date_to) {
      searchParams.append("date_to", values.date_to);
    }
    if (values.corporate_id) {
      searchParams.append("corporate_id", `${values.corporate_id}`);
    }
    if (values.companies.length > 0) {
      searchParams.append("companies", `${values.companies.join(",")}`);
    }
    if (values.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", values.subsidiaries.join(","));
    }
    if (values.tire_condition.length > 0) {
      searchParams.append("tire_condition", values.tire_condition.join(","));
    }
    if (values.tire_application.length > 0) {
      searchParams.append(
        "tire_application",
        values.tire_application.join(","),
      );
    }
    if (values.helmet_value) {
      searchParams.append("helmet_value", `${values.helmet_value}`);
    }
    if (values.price) {
      searchParams.append("price", `${values.price}`);
    }
    if (values.brands.length > 0) {
      searchParams.append("brands", values.brands.join(","));
    }
    if (values.models.length > 0) {
      searchParams.append("models", values.models.join(","));
    }
    if (values.sizes.length > 0) {
      searchParams.append("sizes", values.sizes.join(","));
    }
    searchParams.append("number_cycle", active);
    setModelFilters(searchParams);
    setOpenModals((prevState) => {
      return { ...prevState, model: true };
    });
  }

  function handleSelectedFilters() {
    const newSelectedFilters: Partial<
      Record<keyof PileFilterSchemaType, string>
    > = {};
    const values = pileFilterForm.getValues();
    if (values.date_from !== "") {
      newSelectedFilters["date_from"] = values.date_from;
    }
    if (values.date_to !== "") {
      newSelectedFilters["date_to"] = values.date_to;
    }
    if (values.corporate_id) {
      const localCorporate = dependencies.corporates.find(
        (c: any) => `${c.corporate_id}` === `${values.corporate_id}`,
      );
      if (localCorporate) {
        newSelectedFilters["corporate_id"] = localCorporate.name;
      }
    }
    if (values.companies.length > 0) {
      const companyArray = dependencies.companies
        .filter((c: any) => values.companies.includes(c.company_id))
        .map((c: any) => c.name);
      newSelectedFilters["companies"] = companyArray.join(", ");
    }
    if (values.subsidiaries.length > 0) {
      const subsidiaryArray = dependencies.subsidiaries
        .filter((c: any) => values.subsidiaries.includes(c.subsidiary_id))
        .map((c: any) => c.name);
      newSelectedFilters["subsidiaries"] = subsidiaryArray.join(", ");
    }
    if (values.brands.length > 0) {
      const brandsArray = dependencies.brands
        .filter((c: any) => values.brands.includes(c.brand_id))
        .map((c: any) => c.name);
      newSelectedFilters["brands"] = brandsArray.join(", ");
    }
    if (values.models.length > 0) {
      const modelsArray = dependencies.models
        .filter((c: any) => values.models.includes(c.tire_model_id))
        .map((c: any) => c.tire_model.name);
      newSelectedFilters["models"] = modelsArray.join(", ");
    }
    if (values.sizes.length > 0) {
      const sizesArray = dependencies.sizes
        .filter((c: any) => values.sizes.includes(c.tire_size_id))
        .map((c: any) => c.size);
      newSelectedFilters["sizes"] = sizesArray.join(", ");
    }
    if (values.tire_condition.length > 0) {
      const conditionArray = values.tire_condition.map((c: any) => {
        switch (c) {
          case "RETREAD_USED":
            return t("labels:tire_condition.options.renewed");
          case "ORIGINAL_USED":
            return t("labels:tire_condition.options.original");
          default:
            return c;
        }
      });
      newSelectedFilters["tire_condition"] = conditionArray.join(", ");
    }
    if (values.tire_application.length > 0) {
      const applicationArray = values.tire_application.map((c: any) => {
        return t(`labels:tire_application.options.${c.toLowerCase()}`);
      });
      newSelectedFilters["tire_application"] = applicationArray.join(", ");
    }
    if (values.helmet_value) {
      newSelectedFilters["helmet_value"] = `${formatter.format(
        Number(values.helmet_value),
      )}`;
    }
    if (values.price) {
      newSelectedFilters["price"] = `${formatter.format(Number(values.price))}`;
    }

    setSelectedFilters(newSelectedFilters);
  }

  function handleDefaultFilters() {
    pileFilterForm.setValue(
      "corporate_id",
      profileCorporate?.corporate_id || "",
    );
    pileFilterForm.setValue(
      "companies",
      profileCompanies.map((company) => company.company_id),
    );
    pileFilterForm.setValue(
      "subsidiaries",
      profileSubsidiaries.map((subsidiary) => subsidiary.subsidiary_id),
    );
    setFilters(
      new URLSearchParams({
        corporate_id: profileCorporate?.corporate_id.toString() || "",
        companies: profileCompanies.map((company) => company.company_id).join(),
        subsidiaries: profileSubsidiaries
          .map((subsidiary) => subsidiary.subsidiary_id)
          .join(),
      }),
    );
    handleSelectedFilters();
  }

  function onFilter(data: PileFilterSchemaType) {
    const searchParams = new URLSearchParams();
    if (data.date_from) {
      searchParams.append("date_from", data.date_from);
    }
    if (data.date_to) {
      searchParams.append("date_to", data.date_to);
    }
    if (data.corporate_id) {
      searchParams.append("corporate_id", `${data.corporate_id}`);
    }
    if (data.companies.length > 0) {
      searchParams.append("companies", `${data.companies.join(",")}`);
    }
    if (data.subsidiaries.length > 0) {
      searchParams.append("subsidiaries", data.subsidiaries.join(","));
    }
    if (data.tire_condition.length > 0) {
      searchParams.append("tire_condition", data.tire_condition.join(","));
    }
    if (data.tire_application.length > 0) {
      searchParams.append("tire_application", data.tire_application.join(","));
    }
    if (data.helmet_value) {
      searchParams.append("helmet_value", `${data.helmet_value}`);
    }
    if (data.price) {
      searchParams.append("price", `${data.price}`);
    }
    if (data.brands.length > 0) {
      searchParams.append("brands", data.brands.join(","));
    }
    if (data.models.length > 0) {
      searchParams.append("models", data.models.join(","));
    }
    if (data.sizes.length > 0) {
      searchParams.append("sizes", data.sizes.join(","));
    }
    setFilters(searchParams);
  }

  function onClear() {
    pileFilterForm.reset();
    handleDefaultFilters();
  }

  useEffect(() => {
    if (account && workArea) {
      handleDefaultFilters();
    }
  }, [account, workArea]);

  useEffect(() => {
    if (dependencies.done) {
      handleSelectedFilters();
    }
  }, [dependencies.done]);

  return (
    <>
      <BaseFilterModal
        open={openModals.filter}
        title={t("general:filter")}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, filter: false };
          })
        }
        onConfirm={pileFilterForm.handleSubmit(async (data) => {
          onFilter(data);
          handleSelectedFilters();
        })}
        onClear={() => {
          onClear();
          setOpenModals((prevState) => {
            return { ...prevState, filter: false };
          });
        }}
      >
        <PileFilterForm form={pileFilterForm} dependencies={dependencies} />
      </BaseFilterModal>
      <BaseCustomModal
        open={openModals.historic}
        title={t("titles:historic")}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, historic: false };
          })
        }
        size="xl"
      >
        <PileHistoric data={pileHistoric} />
      </BaseCustomModal>
      <BaseCustomModal
        open={openModals.responsible}
        title={`${t("common:tire_plural")}: ${pileResponsible.length}`}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, responsible: false };
          })
        }
        size="xl"
      >
        <ResponsibleTable data={pileResponsible} />
      </BaseCustomModal>
      <BaseCustomModal
        open={openModals.model}
        title={`${t("common:tire_plural")}: ${pileModel.length}`}
        onClose={() =>
          setOpenModals((prevState) => {
            return { ...prevState, model: false };
          })
        }
        size="xl"
      >
        <ModelTable data={pileModel} />
      </BaseCustomModal>
      <BaseContainer title={t("favorites:favorites.report_tire_pile_depth")}>
        <Container sx={{ p: 3 }} maxWidth={"xl"}>
          {selectedFilters && Object.keys(selectedFilters).length > 0 && (
            <PileFilters selectedFilters={selectedFilters} />
          )}
          <PileButtons
            active={active}
            setActive={setActive}
            policyNumberCycle={policyNumberCycle ?? 0}
            setOpenModals={setOpenModals}
          />
          {pile && (
            <PileAccordionTable
              pileData={
                active == "G"
                  ? pile.general
                  : active == "R"
                  ? pile.revitalized
                  : active == "0"
                  ? pile.origin
                  : pile[active]
              }
              handleResponsibleClick={handleResponsibleClick}
              handleModelClick={handleModelClick}
            />
          )}

          <Portal elementId={"navbarPortal"}>
            <Stack direction={"row"} alignItems={"center"}>
              <IconButton
                sx={{ mr: 2 }}
                onClick={() =>
                  setOpenModals((prevState) => {
                    return { ...prevState, filter: true };
                  })
                }
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
