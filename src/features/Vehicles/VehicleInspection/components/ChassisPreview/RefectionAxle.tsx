import { SetStateAction, useEffect, useState } from "react";

import { Box } from "@mui/material";

import { useLocation } from "react-router-dom";

import Tire from "src/assets/images/vehicle/refection_tire.png";

import { InfoTireTooltip } from "./InfoTireTooltip";

export { RefectionAxle };

interface RefectionAxleProps {
  sx: SxProps;
  color: string;
  tireQuantity: any;
  axleTires: any;
  origin: boolean;
  onClickTire?: (tire) => void;
  onRotateTire?: (origin, tire) => void;
}

function RefectionAxle({
  sx,
  color,
  tireQuantity,
  axleTires,
  origin,
  onClickTire,
  onRotateTire,
}: RefectionAxleProps) {
  const [transformedTires, setTransformedTires] = useState([]);
  const [hide, setHide] = useState(true);

  const location = useLocation();
  //   const classes = useStyles();
  //   console.log("!!origin", !!origin);

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
          marginTop: "8px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        // className={classnames(css.axle, classNameAxle)}
        // style={{ background: `#${color}` }}
        sx={{
          width: "100%",
          height: "10px",
          position: "absolute",
          opacity: "0.65",
          left: "0",
          backgroundColor: `#${color}`,
        }}
      ></Box>
      <Box
        // className={classnames(css.tire_container)}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          position: "relative",
          zIndex: "1",
        }}
      >
        {!location.pathname.includes("type")
          ? transformedTires.map((tires, index) => (
              <div key={index}>
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
                          //   className={css.tire}
                          sx={{
                            height: "64px",
                            borderRadius: "50%",
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
                              {
                                height: "64px",
                                borderRadius: "50%",
                              },
                              !!onClickTire && {
                                cursor: "pointer",
                                "&:hover": { transform: "scale(1.05)" },
                              },
                              //   inProcess &&
                              //     review.review_type === "COMPLETE" &&
                              //     checkIfHasTireReviewInLastVehicleReview(
                              //       tire.vehicle_tire[0],
                              //       review,
                              //     ) && {
                              //       border: "3px solid rgb(4, 181, 45)",
                              //       backgroundColor: "rgb(4, 181, 45)",
                              //     },
                              //   inProcess &&
                              //     review.review_type === "DAMAGE AND WEAR" &&
                              //     (checkIfHasDamages(tire.vehicle_tire[0]) ||
                              //       checkIfHasWears(tire.vehicle_tire[0])) && {
                              //       border: "3px solid rgb(4, 181, 45)",
                              //       backgroundColor: "rgb(4, 181, 45)",
                              //     },
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
                          sx={{
                            height: "64px",
                            borderRadius: "50%",
                          }}
                          onDragEnter={() => {}}
                          onDragLeave={() => {}}
                          //   onDragStart={(e) => handleDragStart(e, tire)}
                          onDragOver={() => {}}
                          //   onDrop={(e) => handleDrop(e, tire)}
                        >
                          <Box
                            component={"img"}
                            // draggable={review.review_type === "ROTATION"}
                            src={Tire}
                            // className={classnames(css.tire, classNameTire, {
                            //   [css.clickable_tire]: !!onClickTire,
                            //   [css.border_green]:
                            //     review.review_type === "ROTATION" &&
                            //     checkIfHasTireReviewInLastVehicleReview(
                            //       tire.vehicle_tire[0],
                            //       review,
                            //     ),
                            // })}
                            sx={[
                              {
                                height: "64px",
                                borderRadius: "50%",
                              },
                              !!onClickTire && {
                                cursor: "pointer",
                                "&:hover": { transform: "scale(1.05)" },
                              },
                              //   review.review_type === "ROTATION" &&
                              //     checkIfHasTireReviewInLastVehicleReview(
                              //       tire.vehicle_tire[0],
                              //       review,
                              //     ) && {
                              //       border: "3px solid rgb(4, 181, 45)",
                              //       backgroundColor: "rgb(4, 181, 45)",
                              //     },
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
                      sx={{
                        height: "64px",
                        borderRadius: "50%",
                      }}
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
                          height: "64px",
                          borderRadius: "50%",
                          opacity: "0.5",
                          //   border: "1.5px solid red",
                          backgroundColor: "red",
                          border: "none",
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      component={"span"}
                      //   onDragEnter={handleDragEnter}
                      //   onDragLeave={handleDragLeave}
                      //   onDragOver={handleDragOver}
                      //   onDrop={(e) => handleDrop(e, tire)}
                      key={tire.position}
                      //   className={css.tire}
                      sx={{
                        height: "64px",
                        borderRadius: "50%",
                      }}
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
                            height: "64px",
                            borderRadius: "50%",
                            opacity: "0.5",
                            border: "1.5px solid red",
                            backgroundColor: "red",
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
              </div>
            ))
          : transformedTires.map((tires, index) => (
              <div key={index}>
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
                      {
                        height: "64px",
                        borderRadius: "50%",
                      },
                      !!onClickTire && {
                        cursor: "pointer",
                        "&:hover": { transform: "scale(1.05)" },
                      },
                    ]}
                    onClick={onClickTire ? () => onClickTire(tire) : () => {}}
                  />
                ))}
              </div>
            ))}
      </Box>
    </Box>
  );
}
