import { useActionData } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import { Input } from "~/components/Input";
import { RadioGroup } from "~/components/RadioGroup";

const schema = z.object({
  type: z.union([z.literal("friend"), z.literal("best-friend")]),
  name: z.string().min(5),
});

const validator = withZod(schema);
const finalSchema = z.object({
  banana: z.literal("Ebert"),
  ...schema.shape,
});
const finalValidator = withZod(finalSchema);

export const action = async ({ request }: DataFunctionArgs) => {
  console.log("action");
  const url = new URL(request.url);

  const { data, error } = await finalValidator.validate(
    await request.formData()
  );

  console.log(error);

  if (error) {
    return validationError(error);
  }

  const { name, type } = data || {};

  console.log(type, name);

  return redirect(`/friends/success${url.search}`);
};

export default function Friends() {
  const actionData = useActionData<typeof action>();
  const errors =
    actionData?.fieldErrors &&
    (Object.entries(actionData.fieldErrors) as [string, string][]);

  return (
    <ValidatedForm validator={validator} method="post">
      <div className="flex flex-col items-center">
        <div></div>
        {!!errors?.length && (
          <div>
            <h1>Erros do form</h1>
            {errors.map(([key, value]) => (
              <span key={key} className="text-red-500">
                <span>{key}:{' '}</span>
                {value}
              </span>
            ))}
          </div>
        )}
        <div role="radiogroup" className="flex flex-col items-center">
          <RadioGroup
            options={[
              { label: "Amigo", value: "friend" },
              { label: "Melhor amigo", value: "best-friend" },
            ]}
            name="type"
          />
        </div>
        <div>
          <Input name="name" title="Nome do amigo" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </ValidatedForm>
  );
}
