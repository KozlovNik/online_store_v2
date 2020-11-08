import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { updateCartItem } from "../../store/products/actions";
import "./num-switch.css";
import { useDebounce } from "./custom-hook";

const NumSwitch: React.FC<Props> = ({ id, updateCartItem, quantity }) => {
  const { debouncedFunction, stateQuantity, setStateQuantity } = useDebounce(
    updateCartItem,
    quantity
  );

  const handleChange = (e: React.ChangeEvent) => {
    const inputQuantity = parseInt((e.target as HTMLInputElement).value) || "";
    if (inputQuantity === "" || (inputQuantity > 0 && inputQuantity < 101)) {
      setStateQuantity(inputQuantity);
    }
    if (inputQuantity !== "" && inputQuantity > 0 && inputQuantity <= 100) {
      debouncedFunction(id, inputQuantity);
    }
  };

  const handleIncDec = (type: "INC" | "DEC") => {
    if (
      typeof stateQuantity === "number" &&
      ((type === "INC" && stateQuantity < 100) ||
        (type === "DEC" && stateQuantity > 1))
    ) {
      let newQuantity: number;
      if (type === "INC") {
        newQuantity = stateQuantity + 1;
      } else {
        newQuantity = stateQuantity - 1;
      }
      setStateQuantity(newQuantity);
      debouncedFunction(id, newQuantity);
    }
  };

  return (
    <div className="num-switch">
      <span
        className="num-switch__block num-switch__block--left"
        onClick={() => handleIncDec("DEC")}
      >
        -
      </span>
      <input
        type="text"
        name="quantity"
        className="num-switch__quantity"
        value={stateQuantity}
        onChange={handleChange}
      />
      <span
        className="num-switch__block num-switch__block--right"
        onClick={() => handleIncDec("INC")}
      >
        +
      </span>
    </div>
  );
};

const mapStateToProps = (state: RootState, { id }: OwnProps) => {
  let quantity: number | undefined;
  state.products.cartItems.forEach((item) => {
    if (item.id === id) {
      quantity = item.quantity;
    }
  });
  return {
    quantity,
  };
};

const connector = connect(mapStateToProps, { updateCartItem });

interface OwnProps {
  id: number;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = OwnProps & PropsFromRedux;

export default connector(NumSwitch);
