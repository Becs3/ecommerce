import { useState } from "react";

const categories = ["Skis", "Snowboards", "Accessories"];

type searchCategoryProps = {
  searchCategory: (category: string) => void;
}

const CategorySearch = (props: searchCategoryProps) => {
  const [search, setSearch] = useState("");

  const handleSubmit = () =>{

    return search;
  }

  return (
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
  );
};

export default CategorySearch;
