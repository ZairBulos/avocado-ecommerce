import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Item } from "../../types/Item";

function ItemCard({ item }: { item: Item }) {
  return (
    <Card shadow="sm" isPressable className="rounded-none">
      <CardBody className="overflow-visible p-0">
        <Image
          src={item.image}
          alt={item.name}
          radius="lg"
          width="100%"
          className="object-cover hover:scale-105"
          style={{ maxWidth: '300px', maxHeight: '300px', margin: 'auto' }}
        />
      </CardBody>
      <CardFooter className="justify-between">
        <b>{item.name}</b>
        <p>${item.sellPrice}</p>
      </CardFooter>
    </Card>
  );
}

export default ItemCard;
