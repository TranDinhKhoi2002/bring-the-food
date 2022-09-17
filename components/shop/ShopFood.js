import ShopFilter from "./shopFilter/ShopFilter";

function ShopFood({ shopInfor }) {
  const { foodTypes, priceOptions } = shopInfor;
  return (
    <div>
      <ShopFilter foodTypes={foodTypes} priceOptions={priceOptions} />
    </div>
  );
}

export default ShopFood;
