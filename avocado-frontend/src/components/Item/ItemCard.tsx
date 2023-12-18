import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { ItemSimple } from "../../types/Item";
import { Link } from "react-router-dom";

function ItemCard({ item }: { item: ItemSimple }) {
  return (
    <Card shadow="sm" isPressable className="rounded-none">
      <Link to={`/items/${item.id}`}>
        <CardBody className="overflow-visible p-0">
          <Image
            src={item.image}
            alt={item.name}
            radius="lg"
            width="100%"
            className="object-cover hover:scale-105"
            style={{ maxWidth: "300px", maxHeight: "300px", margin: "auto" }}
          />
        </CardBody>
        <CardFooter className="justify-between">
          <b>{item.name}</b>
          <p>${item.sellPrice}</p>
        </CardFooter>
      </Link>
    </Card>
  );
}

export default ItemCard;
