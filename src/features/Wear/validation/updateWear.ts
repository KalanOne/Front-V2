import { z } from "zod";


export { wearUpdateSchema, wearUpdateDefaultValues };
export type { WearUpdateSchemaType };

const wearUpdateSchema = z.object({
  image: z.any(),
  name: z.string().min(1, "Name is required"),
  appearance: z.string(),
  wear_category: z.string().min(1, "Wear category is required"),
  axle: z.string().min(1, "Axle is required"),
  probable_causes: z.string(),
  action_tire: z.string(),
  action_vehicle: z.string(),
  operation: z.string(),
});

type WearUpdateSchemaType = z.infer<typeof wearUpdateSchema>;

interface WearUpdateDefaultValues {
    image: File | null;
    name: string;
    appearance: string;
    wear_category: string;
    axle: string;
    probable_causes: string;
    action_tire: string;
    action_vehicle: string;
    operation: string;
}

const wearUpdateDefaultValues: WearUpdateDefaultValues = {
    image: null,
    name: "",
    appearance: "",
    wear_category: "",
    axle: "",
    probable_causes: "",
    action_tire: "",
    action_vehicle: "",
    operation: "",
};