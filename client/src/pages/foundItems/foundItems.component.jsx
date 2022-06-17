import React, { useEffect, useState } from "react";
import FoundItemOverview from "../../components/foundItemOverview/foundItemOverview.component";

import useItems from "../../hooks/useItems";

const FoundItems = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { getAllFoundItems, foundItems } = useItems();

  useEffect(() => {
    getAllFoundItems();
  }, []);

  useEffect(() => {
    setFilteredItems(foundItems);
  }, [foundItems]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const items = foundItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(items);
    }else{
      setFilteredItems(foundItems);
    }
  }, [searchQuery]);

  return (
    <div className="w-full flex flex-col items-center mb-24">
      <input
        type="text"
        className="bg-[#F4F5F7] w-full rounded-full px-5 py-3 outline-none"
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
      />
      <div className="w-full mt-12">
        {filteredItems
          .slice()
          .reverse()
          .map((item) => (
            <FoundItemOverview item={item} />
          ))}
        {/* {[...Array(10)].map((i) => (
          <FoundItemOverview />
        ))} */}
      </div>
    </div>
  );
};

export default FoundItems;
