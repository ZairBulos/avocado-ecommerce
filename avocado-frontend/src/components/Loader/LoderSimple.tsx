import { Spinner } from "@nextui-org/react";

type color = "current" | "white" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;

function LoaderSimple({ color }: { color: color }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner color={color} />
    </div>
  );
}

export default LoaderSimple;
