interface CategoryPageProps {
    params: {
      category: string;
    };
}
  
export default function Page({ params }: CategoryPageProps) {
    const { category } = params;

    return (
    <div>
        <h1>Category: {category}</h1>
        <p>Movies</p>
    </div>
    );
}