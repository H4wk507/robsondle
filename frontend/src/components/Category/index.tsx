interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  return <div className="category">Category: {category}</div>;
}
