import classNames from "classnames";
import { useField } from "remix-validated-form";

export const RadioGroup = ({
  name,
  options,
  id,
}: {
  name: string;
  options: { label: string; value: string }[];
  id?: string;
}) => {
  const field = useField(name);

  return (
    <div className={"flex flex-col w-full"}>
      {options.map(({ label, value }) => (
        <label key={value} htmlFor={value} className="p-8 hover:bg-slate-200">
          <input
            {...field.getInputProps()}
            id={value}
            type="radio"
            name={name}
            value={value}
            onClick={() => {
              field.clearError();
            }}
            onChange={() => {
              if (field.error) field.clearError();
            }}
          />{" "}
          {label}
        </label>
      ))}

      <div className="text-red-500">{field.error}</div>
    </div>
  );
};
