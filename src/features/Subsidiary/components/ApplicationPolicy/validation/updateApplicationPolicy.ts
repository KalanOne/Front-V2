import { z } from "zod";


export { applicationPolicyUpdateSchema, applicationPolicyUpdateDefaultValues };
export type { ApplicationPolicyUpdateSchemaType };

const applicationPolicyUpdateSchema = z.object({
  critical_number_patches: z.coerce.number().gte(0, "Is required"),
  critical_withdrawal: z.coerce.number().gte(0, "Is required"),
  good_condition: z.coerce.number().gte(0, "Is required"),
  maximum_number_patches: z.coerce.number().gte(0, "Is required"),
  scheduled_withdrawal: z.coerce.number().gte(0, "Is required"),
  tire_application_id: z.string().min(1, "Is required"),
});

type ApplicationPolicyUpdateSchemaType = z.infer<
  typeof applicationPolicyUpdateSchema
>;

interface ApplicationPolicyUpdateDefaultValues {
  critical_number_patches: number;
  critical_withdrawal: number;
  good_condition: number;
  maximum_number_patches: number;
  scheduled_withdrawal: number;
  tire_application_id: string;
}

const applicationPolicyUpdateDefaultValues: ApplicationPolicyUpdateDefaultValues =
  {
    critical_number_patches: 0,
    critical_withdrawal: 0,
    good_condition: 0,
    maximum_number_patches: 0,
    scheduled_withdrawal: 0,
    tire_application_id: "",
  };