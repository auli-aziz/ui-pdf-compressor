import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function Params() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center pt-10">
        <CheckCircledIcon className="h-10 w-10" />
        <h3 className="mt-2 font-bold text-xl">Params</h3>
        <p className="mt-2">No additional params needed</p>
      </div>
    </div>
  );
}
