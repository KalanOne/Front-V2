import { z } from "zod";

export { physicalDifferenceSchema, physicalDifferenceDefaultValues };
export type { PhysicalDifferenceSchemaType };

const physicalDifferenceSchema = z
  .object({
    type: z.string().default("code"),
    code: z.string(),
    device_code: z.string(),
  })
  .refine((data) => {
    if (data.type === "code") {
      return data.code !== "";
    } else {
      return data.device_code !== "";
    }
  });

type PhysicalDifferenceSchemaType = z.infer<typeof physicalDifferenceSchema>;

interface PhysicalDifferenceDefaultValues {
  type: string;
  code: string;
  device_code: string;
}

const physicalDifferenceDefaultValues: PhysicalDifferenceDefaultValues = {
  type: "code",
  code: "",
  device_code: "",
};

// code
// :
// "RT-DA"
// device_code
// :
// "233"
// required
// :
// 1
// vehicle_type_axle_tire_id
// :
// 191
