import React from "react";

import { TableTitleLvl1 } from "src/components/common/CustomAccordionTable";

export { AccordionDataRow };

interface UserReviewProps {
  data: any;
}

function AccordionDataRow({ data }: UserReviewProps): React.ReactElement {
  const formatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

  const percentFormatter = new Intl.NumberFormat("en", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
  return (
    <>
      <TableTitleLvl1
        title="Revisiones"
        value={formatter.format(data["statistics"])}
      />
      <TableTitleLvl1
        title="Porcentaje"
        value={percentFormatter.format(data["percent"]) + "%"}
      />
    </>
  );
}
