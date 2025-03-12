import { ChangeEvent, useState } from "react";

type searchCategoryProps = {
  searchCategory: (category: string) => void;
  categories: string[]
}

const CategorySearch = ({ searchCategory, categories }: searchCategoryProps) => {
  const [search, setSearch] = useState(""); 

  /* const handleSubmit = (e: FormEvent) =>{
    e.preventDefault();
    props.searchCategory(search);
  } */

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
    const category = e.currentTarget.value;

    setSearch(category)
    searchCategory(category);
  }

  return (
    <div>
        <p>Filter by category:</p>
        <select value={search} onChange={handleChange}>
            <option value="">All Products</option> {/* Show all products */}
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    </div>
);

/*   return (
    <div>
      <p>Search by category:</p>
      <form onSubmit = {handleSubmit}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter category..."
      />
    <button type="submit">Search</button>
    </form>
    </div>
  ); */
};

export default CategorySearch;
