import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

const mapSearch = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  return <div>mapSearch</div>;
};

export default mapSearch;
