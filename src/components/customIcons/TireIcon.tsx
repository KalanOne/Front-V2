import { SvgIcon } from "@mui/material";

export { TireIcon };

interface TireIconProps {
  color?: string;
}

function TireIcon({ color = "#000" }: TireIconProps) {
  return (
    <SvgIcon>
      <path
        d="M23611,21582a10.006,10.006,0,1,1,10.008,10A10.015,10.015,0,0,1,23611,21582Zm2.73,0a7.275,7.275,0,1,0,7.277-7.275A7.283,7.283,0,0,0,23613.727,21582Zm5.9,5.912a.275.275,0,0,1-.242-.395l1.375-2.758a.275.275,0,0,1,.488,0l1.379,2.758a.273.273,0,0,1-.242.395Zm5.469-1.764-1.7-2.574a.277.277,0,0,1,.25-.422l3.074.184a.272.272,0,0,1,.215.41l-1.371,2.385a.273.273,0,0,1-.465.018Zm-8.672-.018-1.379-2.385a.272.272,0,0,1,.215-.41l3.074-.184a.272.272,0,0,1,.246.422l-1.7,2.568a.271.271,0,0,1-.461-.012Zm3.219-4.131a1.363,1.363,0,1,1,1.363,1.365A1.362,1.362,0,0,1,23619.641,21582Zm3.758-1.568,1.7-2.576a.271.271,0,0,1,.461.018l1.375,2.383a.272.272,0,0,1-.219.41l-3.074.184a.025.025,0,0,1-.012,0A.269.269,0,0,1,23623.4,21580.436Zm-5.066.418-3.074-.184a.272.272,0,0,1-.215-.41l1.379-2.383a.271.271,0,0,1,.461-.018l1.7,2.568a.277.277,0,0,1-.234.428Zm2.426-1.611-1.375-2.758a.271.271,0,0,1,.242-.393h2.758a.27.27,0,0,1,.242.393l-1.379,2.758a.267.267,0,0,1-.242.15A.277.277,0,0,1,23620.758,21579.242Z"
        transform="translate(-23608.996 -21570.004)"
        fill={color}
      />
    </SvgIcon>
  );
}
