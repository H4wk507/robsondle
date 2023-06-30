import styles from "./style.module.scss";

interface CategoryProps {
  category: string;
}

export default function Category({ category }: CategoryProps) {
  return <div className={styles.category}>Category: {category}</div>;
}
