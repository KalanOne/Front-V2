import React, { useEffect, useState } from "react";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import {
  TableBodyCell,
  TableHeaderCellGray,
} from "src/components/common/CustomTable";
import { useProgressQuery } from "src/hooks/progress";

import { getReviewPerformanceAccordion } from "../api/reviewPerformanceApi";
import { ReviewPerformanceAccordionTable } from "./ReviewPerformanceAccordionTable";

export { ReviewPerformanceReportTable };

interface ReviewPerformanceReportTableProps {
  reviewPerformance: any;
  onButtonClick: (params: any) => void;
}

function ReviewPerformanceReportTable({
  reviewPerformance,
  onButtonClick,
}: ReviewPerformanceReportTableProps): React.ReactElement {
  const [reviewId, setReviewId] = useState("");
  const [subsidiaryId, setSubsidiaryId] = useState("");
  const [reviewAccordionData, setReviewAccordionData] = useState<any>();

  const accordionData = useQuery({
    queryKey: ["accordionData", reviewId.toString(), subsidiaryId.toString()],
    queryFn: async () => {
      return await getReviewPerformanceAccordion(
        reviewId.toString(),
        subsidiaryId.toString(),
      );
    },
    enabled: reviewId !== "" && subsidiaryId !== "",
  });

  const reviewPerformanceAccordion = accordionData.data;
  useProgressQuery(accordionData, "accordionData");

  useEffect(() => {
    if (reviewPerformanceAccordion) {
      setReviewAccordionData(JSON.parse(reviewPerformanceAccordion));
    }
  }, [reviewPerformanceAccordion]);

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCellGray>{"Mes"}</TableHeaderCellGray>
              <TableHeaderCellGray>{"Año"}</TableHeaderCellGray>
              <TableHeaderCellGray>{"Número de Daños"}</TableHeaderCellGray>
              <TableHeaderCellGray>{"Ponchaduras"}</TableHeaderCellGray>
              <TableHeaderCellGray>
                {"Número de Revitalizados"}
              </TableHeaderCellGray>
              <TableHeaderCellGray>
                {"Neumáticos Dados de Baja"}
              </TableHeaderCellGray>
              <TableHeaderCellGray>
                {"Neumáticos Revisados"}
              </TableHeaderCellGray>
              <TableHeaderCellGray>
                {"Número de Revisiones a Neumáticos"}
              </TableHeaderCellGray>
              <TableHeaderCellGray>{"Vehículos Revisados"}</TableHeaderCellGray>
              <TableHeaderCellGray>{"Vehículos Totales"}</TableHeaderCellGray>
              <TableHeaderCellGray>
                {"Vehículos Sin Revisar"}
              </TableHeaderCellGray>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewPerformance.map((review: any) => (
              <TableRow key={review.review_performance_id}>
                <TableBodyCell>
                  {dayjs(review.created_at).format("MMMM")}
                </TableBodyCell>
                <TableBodyCell>
                  {new Date(review.created_at).getFullYear()}
                </TableBodyCell>
                <TableBodyCell>{review.number_damage}</TableBodyCell>
                <TableBodyCell>{review.punctures}</TableBodyCell>
                <TableBodyCell>{review.number_revitalizations}</TableBodyCell>
                <TableBodyCell>{review.number_tires_pile}</TableBodyCell>
                <TableBodyCell>{review.number_tires_review}</TableBodyCell>
                <TableBodyCell>{review.number_review}</TableBodyCell>
                <TableBodyCell>{review.number_vehicles_review}</TableBodyCell>
                <TableBodyCell>{review.number_vehicles}</TableBodyCell>
                <TableBodyCell>
                  {review.number_vehicles_no_review === 0 ? (
                    review.number_vehicles_no_review
                  ) : (
                    <Button
                      sx={{ color: "#2F3D53" }}
                      onClick={() => {
                        setReviewId(review.review_performance_id);
                        setSubsidiaryId(review.subsidiary_id);
                      }}
                    >
                      {review.number_vehicles_no_review}
                    </Button>
                  )}
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {reviewAccordionData && (
        <ReviewPerformanceAccordionTable
          report={reviewAccordionData}
          onButtonClick={onButtonClick}
        ></ReviewPerformanceAccordionTable>
      )}
    </>
  );
}
