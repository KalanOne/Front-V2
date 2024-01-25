import React from "react";

import { useTranslation } from "react-i18next";

import {
  AccordionTableCell,
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable.tsx";
import { IconPill } from "src/components/report/IconPill";
import { percentFormatter } from "src/utils/formatters.ts";

export { KmPileResponsibleAccordionRow };

interface KmPileResponsibleAccordionRowProps {
  onClick?: (e: React.MouseEvent<any>) => void | Promise<void>;
  children: React.ReactNode;
  lvl: string;
  title: string;
  data: any;
}
function KmPileResponsibleAccordionRow({
  onClick,
  children,
  lvl,
  title,
  data,
}: KmPileResponsibleAccordionRowProps) {
  const { t } = useTranslation();

  return (
    <>
      <AccordionTableRow onClick={onClick} level={lvl}>
        <AccordionTableHeader level={lvl} sx={{ fontWeight: "600" }}>
          {title}
        </AccordionTableHeader>
        <AccordionTableCell
          sx={{
            width: "fit-content",
          }}
        >
          <IconPill
            icon={<></>}
            text1={`${t("labels2:incidents")}`}
            text2={`${percentFormatter.format(data.statistics)}`}
          />
        </AccordionTableCell>
        <AccordionTableCell
          sx={{
            width: "fit-content",
          }}
        >
          <IconPill
            icon={<></>}
            text1={`${t("labels2:percent")}`}
            text2={`${percentFormatter.format(data.percent)}%`}
          />
        </AccordionTableCell>
      </AccordionTableRow>
      {children}
    </>
  );
}
