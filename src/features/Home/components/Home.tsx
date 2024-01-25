import React from "react";

import { useTranslation } from "react-i18next";

import { BaseContainer } from "src/components/common/BaseContainer.tsx";

export { Home };

function Home(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <BaseContainer title={t("features:home.title")}>
      <div>Home</div>
    </BaseContainer>
  );
}
