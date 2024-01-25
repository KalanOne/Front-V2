import React, { useEffect, useRef } from "react";

import { createPortal } from "react-dom";

export { Portal };

interface PortalProps {
  elementId: string;
  children: React.ReactNode;
}

function Portal({
  elementId,
  children,
}: PortalProps): React.ReactElement | null {
  const portalRef = useRef<HTMLElement | null>(null);
  const [domReady, setDomReady] = React.useState(false);

  useEffect(() => {
    portalRef.current = document.getElementById(elementId);
    setDomReady(true);
  }, []);

  return domReady && portalRef.current != null
    ? createPortal(children, portalRef.current)
    : null;
}
