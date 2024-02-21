import { useState } from "react";

export const Checkbox = (data) => {
  const [isChecked, setIsChecked] = useState(false);
  const [items, setItems] = useState([]);
  let itemArry = [];
  const checkHandler = () => {
    setIsChecked(!isChecked);
    if (!isChecked === true) {
      console.log("herllooooooo");
      itemArry.push(data.itemname);
      console.log("isChecked == ", data.itemname, " is ", !isChecked, itemArry);
    } else {
      console.log("isChecked == ", data.itemname, " is ", !isChecked, itemArry);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={checkHandler}
        value={data.itemname}
      />
    </div>
  );
};
export default Checkbox;
