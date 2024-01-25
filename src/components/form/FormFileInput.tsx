import React, { useRef } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Link, keyframes } from "@mui/material";

import { Controller } from "react-hook-form";

const marquee = keyframes`
    0% {
    transform: translateY(0);
    }
    100% {
    transform: translateY(-10px);
    }
`;

interface FormFileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  name: string;
}
/**
 *
 * @param param0
 */
function FormFileInput({ placeholder, name, ...props }: FormFileInputProps) {
  const inputRef = useRef<HTMLInputElement | undefined>();

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => {
        function loadFile(file: Blob | MediaSource) {
          onChange(file);
        }

        function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
          event.persist();
          const target = event.target;
          if (target && target.files && target.files.length > 0) {
            loadFile(target.files[0]);
          }
        }

        function handleDeleteValue() {
          onChange(null);
        }

        function removeDragData(event: React.DragEvent<HTMLDivElement>) {
          if (event.dataTransfer.items) {
            event.dataTransfer.items.clear();
            return;
          }
          event.dataTransfer.clearData();
        }

        function handleOnDragOver(event: React.DragEvent<HTMLDivElement>) {
          event.persist();
          event.preventDefault();
        }

        function handleOnDrop(event: React.DragEvent<HTMLDivElement>) {
          event.persist();
          event.preventDefault();

          if (event.dataTransfer.items) {
            for (const item of event.dataTransfer.items) {
              if (item.kind === "file") {
                const file = item.getAsFile();
                if (file) {
                  loadFile(file);
                }
              }
            }
          } else if (event.dataTransfer.files.length > 0) {
            loadFile(event.dataTransfer.files[0]);
          }

          removeDragData(event);
        }

        return (
          <>
            <Box
              sx={{
                display: "flex !important",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minWidth: "160px !important",
                minHeight: "120px",
                height: "100%",
                border: "0.14rem dashed #707070",
                borderRadius: "6px",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box",
                fontFamily: '"Roboto", sans-serif',
                fontSize: "0.8rem",
                padding: "16px",
                color: "#707070 !important",
              }}
              draggable={true}
              onDrop={handleOnDrop}
              onDragOver={handleOnDragOver}
            >
              <Box
                component={"label"}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textAlign: "center",
                }}
                htmlFor={`${name}`}
              >
                <Box
                  component={"svg"}
                  sx={{
                    fill: "#707070",
                    animation: `${marquee} 2s infinite alternate`,
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  width="48px"
                  height="48px"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l4.65-4.65c.2-.2.51-.2.71 0L17 13h-3z" />
                </Box>
                <span>{placeholder}</span>
                <Box sx={{ mt: 2 }}>
                  {value ? value.name : "Sube un Archivo"}
                </Box>
              </Box>
              {value && (
                <>
                  <Link href={URL.createObjectURL(value)} target="_blank">
                    <VisibilityIcon
                      sx={{
                        fill: "#707070",
                        display: "block",
                        position: "absolute",
                        right: "4px",
                        top: "4px",
                        width: "18px",
                        height: "18px",
                        "&:focus": {
                          fill: "#000000 !important",
                        },
                      }}
                    />
                  </Link>
                  <Box
                    component={"svg"}
                    onClick={handleDeleteValue}
                    sx={{
                      fill: "#707070",
                      display: "block",
                      position: "absolute",
                      left: "4px",
                      top: "4px",
                      right: "4px",
                      "&:focus": {
                        fill: "#000000 !important",
                      },
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" />
                  </Box>
                </>
              )}
            </Box>
            <Box
              component={"input"}
              type="file"
              sx={{
                width: "0px",
                position: "absolute",
                top: "0",
                left: "0",
              }}
              ref={inputRef}
              name={name}
              id={name}
              onChange={handleChange}
              {...props}
            />
            {/* {helperText && <FormHelperText>{helperText}</FormHelperText>} */}
          </>
        );
      }}
    />
  );
}

export default FormFileInput;
