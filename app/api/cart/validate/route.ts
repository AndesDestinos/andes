import { client } from "@/lib/sanity.client";

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items?.length) {
      return Response.json([]);
    }

    const ids = items.map((i: any) => i._id);

    const products = await client.fetch(
      `*[_type == "storeProduct" && _id in $ids]{_id, stock}`,
      { ids }
    );

    const valid = items.filter((item: any) => {
      const p = products.find((x: any) => x._id === item._id);
      return p && p.stock > 0;
    });

    return Response.json(valid);
  } catch (err) {
    console.error(err);
    return Response.json([]);
  }
}