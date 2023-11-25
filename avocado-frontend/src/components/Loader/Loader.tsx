import { Spinner } from "@nextui-org/react";

type color = "current" | "white" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
type labelColor = "primary" | "secondary" | "success" | "warning" | "danger" | "foreground" | undefined;

function Loader({ label, color, labelColor }: { label: string, color: color, labelColor: labelColor }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner label={label} color={color} labelColor={labelColor} />
    </div>
  );
}

export default Loader;
