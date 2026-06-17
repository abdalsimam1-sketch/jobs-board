import React, { useState } from "react";

const SEARCH = {
  searchTerm: "",
  location: "",
};
const FILTERS = [
  { name: "all", value: "" },
  { name: "full-time", value: "fulltime" },
  { name: "part-time", value: "part-time" },
  { name: "remote", value: "remote" },
];

export const useFilters = () => {
  const [searchForm, setSearchForm] = useState(SEARCH);
  const [filter, setFilter] = useState("");
  return { searchForm, setSearchForm, SEARCH, FILTERS, filter, setFilter };
};
