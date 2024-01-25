import { useEffect, useState } from "react";

import { Box, SxProps } from "@mui/material";

import { useLocation } from "react-router-dom";

import Tire from "src/assets/images/vehicle/tire.svg";

import { InfoTireTooltip } from "./InfoTireTooltip";

export { Axle };

interface AxleProps {
  sx: SxProps;
  color: string;
  tireQuantity: any;
  axleTires: any;
  origin: boolean;
  onClickTire?: (tire) => void;
  onRotateTire?: (origin, tire) => void;
}

function Axle({
  sx,
  color,
  tireQuantity,
  axleTires,
  origin,
  onClickTire,
  onRotateTire,
}: AxleProps) {
  const [transformedTires, setTransformedTires] = useState([]);
  const location = useLocation();
  const inProcess = true;
  //   const classes = useStyles();

  const [hide, setHide] = useState(true);
  // console.log("axleTires", axleTires);

  useEffect(() => {
    let a = [];
    switch (parseInt(tireQuantity)) {
      case 1:
        a = [[axleTires[0]]];
        break;
      case 2:
        a = [[axleTires[0]], [axleTires[1]]];
        break;
      case 4:
        a = [
          [axleTires[0], axleTires[1]],
          [axleTires[2], axleTires[3]],
        ];
        break;
    }
    setTransformedTires(a);
  }, [tireQuantity, axleTires]);

  //   const { origin, setOrigin, inProcess, review } = rest;

  //   function handleDragStart(e, tire) {
  //     e.stopPropagation();
  //     if (tire.vehicle_tire.length > 0) {
  //       setOrigin(tire);
  //     }
  //   }

  //   function handleDragOver(e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }

  //   function handleDrop(e, tire) {
  //     e.preventDefault();
  //     e.target.classList.remove(classes.droppable);

  //     if (origin && tire.position !== origin.position) {
  //       onRotateTire(origin, tire);
  //     }
  //     setOrigin(null);
  //   }

  //   function handleDragEnter(e) {
  //     e.target.classList.add(classes.droppable);
  //   }

  //   function handleDragLeave(e) {
  //     e.target.classList.remove(classes.droppable);
  //   }

  return (
    <Box
      sx={[
        {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
          width: "100%",
          marginBottom: "4px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        // className={classnames(css.axle, classNameAxle)}
        sx={{
          width: "100%",
          height: "10px",
          position: "absolute",
          left: "0",
          zIndex: "0",
          backgroundColor: `#${color}`,
        }}
      ></Box>
      <Box
        sx={[
          {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: "1",
          },
          axleTires.length === 1 && { justifyContent: "space-around" },
        ]}
      >
        {!location.pathname.includes("type")
          ? transformedTires.map((tires, index) => (
              <Box key={index}>
                {tires.map((tire) =>
                  tire.vehicle_tire.length > 0 ? (
                    <InfoTireTooltip
                      hidden={!!origin}
                      key={tire.position}
                      tire={tire.vehicle_tire[0]}
                      placement={index % 2 ? "right" : "left"}
                    >
                      {location.pathname.includes("review") ? (
                        <Box
                          component={"span"}
                          sx={{
                            height: "66px",
                            "&:nth-child(2)": { marginLeft: "5px" },
                          }}
                        >
                          <Box
                            component={"img"}
                            draggable={false}
                            src={Tire}
                            // className={classnames(css.tire, classNameTire, {
                            //   [css.clickable_tire]: !!onClickTire,
                            //   [css.border_green]:
                            //     inProcess &&
                            //     ((review.review_type === "COMPLETE" &&
                            //       checkIfHasTireReviewInLastVehicleReview(
                            //         tire.vehicle_tire[0],
                            //         review,
                            //       )) ||
                            //       (review.review_type === "DAMAGE AND WEAR" &&
                            //         (checkIfHasDamages(tire.vehicle_tire[0]) ||
                            //           checkIfHasWears(tire.vehicle_tire[0])))),
                            // })}
                            sx={[
                              { height: "66px" },
                              !!onClickTire && {
                                cursor: "pointer",
                                "&:hover": { transform: "scale(1.05)" },
                              },
                              // inProcess &&
                              //   review.review_type === "COMPLETE" &&
                              //   checkIfHasTireReviewInLastVehicleReview(
                              //     tire.vehicle_tire[0],
                              //     review,
                              //   ) && {
                              //     border: "3px solid rgb(4, 181, 45)",
                              //     backgroundColor: "rgb(4, 181, 45)",
                              //     borderRadius: "6px",
                              //   },
                              // inProcess &&
                              //   review.review_type === "DAMAGE AND WEAR" &&
                              //   (checkIfHasDamages(tire.vehicle_tire[0]) ||
                              //     checkIfHasWears(tire.vehicle_tire[0])) && {
                              //     border: "3px solid rgb(4, 181, 45)",
                              //     backgroundColor: "rgb(4, 181, 45)",
                              //     borderRadius: "6px",
                              //   },
                            ]}
                            onClick={
                              onClickTire ? () => onClickTire(tire) : () => {}
                            }
                          />
                        </Box>
                      ) : (
                        <Box
                          component={"span"}
                          //   className={css.tire}
                          sx={{ height: "66px" }}
                          onDragEnter={() => {}}
                          onDragLeave={() => {}}
                          // onDragStart={(e) => handleDragStart(e, tire)}
                          onDragOver={() => {}}
                          // onDrop={(e) => handleDrop(e, tire)}
                        >
                          <Box
                            component={"img"}
                            draggable={false}
                            src={Tire}
                            // className={classnames(css.tire, classNameTire, {
                            //   [css.clickable_tire]: !!onClickTire,
                            //   [css.border_green]:
                            //     review.review_type === "ROTATION" &&
                            // checkIfHasTireReviewInLastVehicleReview(
                            //   tire.vehicle_tire[0],
                            //   review,
                            // ),
                            // })}
                            sx={[
                              { height: "66px" },
                              !!onClickTire && {
                                cursor: "pointer",
                                "&:hover": { transform: "scale(1.05)" },
                              },
                              // review.review_type === "ROTATION" &&
                              //   checkIfHasTireReviewInLastVehicleReview(
                              //     tire.vehicle_tire[0],
                              //     review,
                              //   ) && {
                              //     border: "3px solid rgb(4, 181, 45)",
                              //     backgroundColor: "rgb(4, 181, 45)",
                              //     borderRadius: "6px",
                              //   },
                            ]}
                            onClick={
                              onClickTire ? () => onClickTire(tire) : () => {}
                            }
                          />
                        </Box>
                      )}
                    </InfoTireTooltip>
                  ) : location.pathname.includes("review") ? (
                    <Box
                      component={"span"}
                      key={tire.position}
                      //   className={css.tire}
                      sx={{ height: "66px" }}
                    >
                      <Box
                        component={"img"}
                        draggable={false}
                        key={tire.position}
                        src={Tire}
                        // className={classnames(
                        //   css.tire,
                        //   classNameTire,
                        //   css.no_tire,
                        //   css.border_none,
                        // )}
                        sx={{
                          height: "66px",
                          opacity: "0.5",
                          border: "1.5px solid red",
                          backgroundColor: "red",
                          borderRadius: "6px",
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      component={"span"}
                      onDragEnter={() => {}}
                      onDragLeave={() => {}}
                      onDragOver={() => {}}
                      // onDrop={(e) => handleDrop(e, tire)}
                      key={tire.position}
                      //   className={css.tire}
                      sx={{ height: "66px" }}
                    >
                      <Box
                        component={"img"}
                        draggable={false}
                        key={tire.position}
                        src={Tire}
                        // className={classnames(
                        //   css.tire,
                        //   classNameTire,
                        //   css.no_tire,
                        //   {
                        //     [css.clickable_tire]: !!onClickTire,
                        //   },
                        // )}
                        sx={[
                          {
                            height: "66px",
                            opacity: "0.5",
                            border: "1.5px solid red",
                            backgroundColor: "red",
                            borderRadius: "6px",
                          },
                          !!onClickTire && {
                            cursor: "pointer",
                            "&:hover": { transform: "scale(1.05)" },
                          },
                        ]}
                        onClick={
                          onClickTire ? () => onClickTire(tire) : () => {}
                        }
                      />
                    </Box>
                  ),
                )}
              </Box>
            ))
          : axleTires.map((tires, index) => (
              <Box key={index}>
                {tires.map((tire) => (
                  <Box
                    component={"img"}
                    draggable={false}
                    key={tire.position}
                    src={Tire}
                    // className={classnames(css.tire, classNameTire, {
                    //   [css.clickable_tire]: !!onClickTire,
                    // })}
                    sx={[
                      { height: "66px" },
                      !!onClickTire && {
                        cursor: "pointer",
                        "&:hover": { transform: "scale(1.05)" },
                      },
                    ]}
                    onClick={onClickTire ? () => onClickTire(tire) : () => {}}
                  />
                ))}
              </Box>
            ))}
      </Box>
    </Box>
  );
}

/* Para poner en verde si esta en completa (en proceso) y ya se reviso 
   O si esta en rotaciones y ya tiene revisión (se roto) 
*/
function checkIfHasTireReviewInLastVehicleReview(vehicleTire, review) {
  const lastReviewIndex = vehicleTire?.movement_tire?.tire_review.length - 1;

  return (
    vehicleTire?.movement_tire?.tire_review[lastReviewIndex]
      .vehicle_review_id === review.vehicle_review_id
  );
}

function checkIfHasDamages(vehicleTire) {
  return vehicleTire.movement_tire.tire_damage.some(
    (damage) =>
      damage.movement_tire_id === vehicleTire.movement_tire.movement_tire_id &&
      damage.movement_tire_id ===
        vehicleTire.movement_tire.tire_review[
          vehicleTire.movement_tire.tire_review.length - 1
        ].movement_tire_id,
  );
}

function checkIfHasWears(vehicleTire) {
  return vehicleTire.movement_tire.tire_wear.some(
    (wear) =>
      wear.movement_tire_id === vehicleTire.movement_tire.movement_tire_id &&
      wear.movement_tire_id ===
        vehicleTire.movement_tire.tire_review[
          vehicleTire.movement_tire.tire_review.length - 1
        ].movement_tire_id,
  );
}
