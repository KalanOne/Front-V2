import React from "react";

import { Paper, Table, TableBody, TableContainer } from "@mui/material";

import {
  AccordionTableHeader,
  AccordionTableRow,
} from "src/components/common/CustomAccordionTable";
import { AccordionTable } from "src/components/report/AccordionTable";
import { filterNonObjects } from "src/utils/object";

import { AccordionDataRow } from "./AccordionDataRow";
import { ButtonReview } from "./ButtonReview";

export { UserReviewAccordionTable };

interface UserReviewAccordionTableProps {
  review: ReviewResponse;
  onVehicleTypeClick: (params: any) => void;
  onReviewClick: (params: any) => void;
}

function UserReviewAccordionTable({
  review,
  onVehicleTypeClick,
  onReviewClick,
}: UserReviewAccordionTableProps): React.ReactElement {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableBody>
          {review &&
            Object.entries(review.review).map(
              ([corporate, corporateObject]) => (
                <AccordionTable
                  key={corporate}
                  render={(children, onClick) => (
                    <>
                      <AccordionTableRow onClick={onClick} level={"1"}>
                        <AccordionTableHeader level={"1"}>
                          {corporate}
                        </AccordionTableHeader>
                        <AccordionDataRow data={corporateObject} />
                      </AccordionTableRow>
                      {children}
                    </>
                  )}
                >
                  {Object.entries(filterNonObjects(corporateObject)).map(
                    ([company, companyObject]) => (
                      <AccordionTable
                        key={company}
                        render={(children, onClick) => (
                          <>
                            <AccordionTableRow onClick={onClick} level={"2"}>
                              <AccordionTableHeader level={"2"}>
                                {company}
                              </AccordionTableHeader>
                              <AccordionDataRow
                                data={companyObject}
                              ></AccordionDataRow>
                            </AccordionTableRow>
                            {children}
                          </>
                        )}
                      >
                        {Object.entries(filterNonObjects(companyObject)).map(
                          ([subsidiary, subsidiaryObject]) => (
                            <AccordionTable
                              key={subsidiary}
                              render={(children, onClick) => (
                                <>
                                  <AccordionTableRow
                                    onClick={onClick}
                                    level={"3"}
                                  >
                                    <AccordionTableHeader level={"3"}>
                                      {subsidiary}
                                    </AccordionTableHeader>
                                    <AccordionDataRow
                                      data={subsidiaryObject}
                                    ></AccordionDataRow>
                                  </AccordionTableRow>
                                  {children}
                                </>
                              )}
                            >
                              {Object.entries(
                                filterNonObjects(subsidiaryObject),
                              ).map(([division, divisionObject]) => (
                                <AccordionTable
                                  key={division}
                                  render={(children, onClick) => (
                                    <>
                                      <AccordionTableRow
                                        onClick={onClick}
                                        level={"4"}
                                      >
                                        <AccordionTableHeader level={"4"}>
                                          {division}
                                        </AccordionTableHeader>
                                        <AccordionDataRow
                                          data={divisionObject}
                                        ></AccordionDataRow>
                                      </AccordionTableRow>
                                      {children}
                                    </>
                                  )}
                                >
                                  {Object.entries(
                                    filterNonObjects(divisionObject),
                                  ).map(([user, userObject]) => (
                                    <AccordionTable
                                      key={user}
                                      render={(children, onClick) => (
                                        <>
                                          <AccordionTableRow
                                            onClick={onClick}
                                            level={"5"}
                                          >
                                            <AccordionTableHeader level={"5"}>
                                              {user}
                                            </AccordionTableHeader>
                                            <AccordionDataRow
                                              data={userObject}
                                            ></AccordionDataRow>
                                          </AccordionTableRow>
                                          {children}
                                        </>
                                      )}
                                    >
                                      {Object.entries(
                                        filterNonObjects(userObject),
                                      ).map(
                                        ([vehicleType, vehicleTypeObject]) => (
                                          <AccordionTable
                                            key={vehicleType}
                                            render={(children, onClick) => (
                                              <>
                                                <AccordionTableRow
                                                  onClick={(e) => {
                                                    onClick(e);
                                                    onVehicleTypeClick({
                                                      corporate,
                                                      company,
                                                      subsidiary,
                                                      division,
                                                      user,
                                                      vehicleType,
                                                    });
                                                  }}
                                                  level={"6"}
                                                >
                                                  <AccordionTableHeader
                                                    level={"6"}
                                                  >
                                                    {vehicleType}
                                                  </AccordionTableHeader>
                                                  <AccordionDataRow
                                                    data={vehicleTypeObject}
                                                  ></AccordionDataRow>
                                                </AccordionTableRow>
                                                {children}
                                              </>
                                            )}
                                          >
                                            {Object.entries(
                                              filterNonObjects(
                                                vehicleTypeObject,
                                              ),
                                            ).map(
                                              ([vehicle, vehicleObject]) => (
                                                <AccordionTable
                                                  key={vehicle}
                                                  render={(
                                                    children,
                                                    onClick,
                                                  ) => (
                                                    <>
                                                      <AccordionTableRow
                                                        onClick={onClick}
                                                        level={"7"}
                                                      >
                                                        <AccordionTableHeader
                                                          level={"7"}
                                                        >
                                                          {vehicle}
                                                        </AccordionTableHeader>
                                                      </AccordionTableRow>
                                                      {children}
                                                    </>
                                                  )}
                                                >
                                                  {Object.entries(
                                                    filterNonObjects(
                                                      vehicleObject,
                                                    ),
                                                  ).map(
                                                    ([
                                                      review,
                                                      reviewObject,
                                                    ]) => (
                                                      <AccordionTableRow
                                                        level={"8"}
                                                        key={review}
                                                      >
                                                        <ButtonReview
                                                          reviewObject={
                                                            reviewObject
                                                          }
                                                          onClick={
                                                            onReviewClick
                                                          }
                                                        ></ButtonReview>
                                                      </AccordionTableRow>
                                                    ),
                                                  )}
                                                </AccordionTable>
                                              ),
                                            )}
                                          </AccordionTable>
                                        ),
                                      )}
                                    </AccordionTable>
                                  ))}
                                </AccordionTable>
                              ))}
                            </AccordionTable>
                          ),
                        )}
                      </AccordionTable>
                    ),
                  )}
                </AccordionTable>
              ),
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
