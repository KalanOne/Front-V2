import { Container, Divider, Typography } from "@mui/material";

export { RenewabilityTitle };

function RenewabilityTitle() {
  return (
    <Container sx={{ p: 3 }} maxWidth={"xl"}>
      <Divider />
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mt: 3, fontWeight: "500" }}
      >
        Reporte índices de renovabilidad
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
        Índices de renovabilidad (número de revitalizaciones / número de
        neumáticos) de modelos de neumáticos.
      </Typography>
      <Typography
        component={"p"}
        textAlign={"center"}
        color={"lightcoral"}
        fontSize={14}
      >
        Solo se toman en cuenta neumáticos que ya han sido desechados.
      </Typography>
      <Typography
        component={"p"}
        textAlign={"center"}
        color={"lightcoral"}
        fontSize={14}
        mb={3}
      >
        Ubicación: MONTADA y ALMACÉN
      </Typography>
      <Divider />
    </Container>
  );
}
