const CartReducer = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_CART':

            let { id, Size, Color, Quantity, SingleProduct } = action.payload;

            // Create a unique identifier for the product by combining the product ID, Size, and Color
            let compoundId = id + "-" + Size + "-" + Color;

            // Check if the product with the same Size and Color already exists in the cart
            let existingProductIndex = state.Cart.findIndex(
                (item) => item.id === compoundId
            );
            let updatedCart;

            if (existingProductIndex !== -1) {
                // If the product exists, update its quantity and price
                updatedCart = [...state.Cart];
                let updatedQuantity = updatedCart[existingProductIndex].Quantity + Quantity;
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    Quantity: updatedQuantity,
                    Price: SingleProduct.SalePrice, // Adjust price based on new quantity
                    Total: SingleProduct.SalePrice * updatedQuantity
                };

            }
            else {
                // If the product does not exist, add it to the cart
                let CartProduct = {
                    id: compoundId,
                    Category: SingleProduct.Category,
                    Price: SingleProduct.SalePrice,
                    Name: SingleProduct.Name,
                    Image: SingleProduct.Image1,
                    Size,
                    Color,
                    Quantity,
                    Total: SingleProduct.SalePrice * Quantity,
                };
                updatedCart = [...state.Cart, CartProduct];
            }
            // Calculate the total number of items in the cart
            let totalItems = updatedCart.length

            let totalPrice = updatedCart.reduce(
                (total, item) => total + item.Total,
                0
            );
            return {
                ...state,
                ProductID: SingleProduct._id,
                Cart: updatedCart,
                TotalItem: totalItems,
                CartTotal: totalPrice
            };
        case "BUY_NOW":
            let compoundIdBuyNow = action.payload.id + "-" + action.payload.Size + "-" + action.payload.Color;
            
            // Create the new cart with only the product the user wants to purchase immediately
            let productInCart = {
                id: compoundIdBuyNow,
                Category: action.payload.SingleProduct.Category,
                Price: action.payload.SingleProduct.SalePrice,
                Name: action.payload.SingleProduct.Name,
                Image: action.payload.SingleProduct.Image1,
                Size:action.payload.Size,
                Color:action.payload.Color,
                Quantity:action.payload.Quantity,
                Total: action.payload.SingleProduct.SalePrice * action.payload.Quantity,
            };

            // Create a new cart with just this one product, reset totals
            let updatedCartBuyNow = [productInCart];

            // Calculate the total number of items in the cart and the total price
            let totalItemsBuyNow = updatedCartBuyNow.length;
            let totalPriceBuyNow = updatedCartBuyNow.reduce(
                (total, item) => total + item.Total,
                0
            );

            // Return the updated state with the "BUY_NOW" logic
            return {
                ...state,
                Cart: updatedCartBuyNow,
                TotalItem: totalItemsBuyNow,
                CartTotal: totalPriceBuyNow,
            };

        case "DeleteCart":
            const productIdToDelete = action.payload;

            const updateCart = state.Cart.filter((item) => item.id !== productIdToDelete);


            const totalItem = updateCart.length

            const totalPrices = updateCart.reduce((total, item) => total + parseFloat(item.Price), 0);


            return {
                ...state,
                Cart: updateCart,
                TotalItem: totalItem,
                CartTotal: totalPrices
            };



        case "QuantityIncrease":
            const Productid = action.payload;
            // Create a new cart array with the updated product
            const updatedCartt = state.Cart.map((item) => {
                if (item.id === Productid) {
                    const newQuantity = item.Quantity + 1; // Increment quantity
                    return {
                        ...item,
                        Quantity: newQuantity,
                        Total: item.Price * newQuantity, // Update the total based on new quantity
                    };
                }
                return item; // Leave other items unchanged
            });

            // Recalculate Total Items and Total Price
            let totalItemss = updatedCartt.length
            const totalPricee = updatedCartt.reduce((total, item) => total + item.Total, 0);

            return {
                ...state,
                Cart: updatedCartt,
                TotalItem: totalItemss,
                CartTotal: totalPricee,
            };


        case "QuantityDecrease":
            const ProductidDec = action.payload;
            const productDec = state.Cart.find((item) => item.id === ProductidDec);
            if (productDec) {
                if (productDec.Quantity === 1) {
                    const updateCart = state.Cart.filter((item) => item.id !== ProductidDec);


                    const totalItem = productDec.length

                    const totalPrices = updateCart.reduce((total, item) => total + parseFloat(item.Total), 0);


                    return {
                        ...state,
                        Cart: updateCart,
                        TotalItem: totalItem,
                        CartTotal: totalPrices
                    };
                    // return {
                    //     ...state,
                    // };
                }
                else {
                    const updatedCartt = state.Cart.map((item) => {
                        if (item.id === ProductidDec) {
                            const newQuantity = item.Quantity - 1; // Increment quantity
                            return {
                                ...item,
                                Quantity: newQuantity,
                                Total: item.Price * newQuantity, // Update the total based on new quantity
                            };
                        }
                        return item; // Leave other items unchanged
                    });

                    // Recalculate Total Items and Total Price
                    let totalItemss = updatedCartt.length
                    const totalPricee = updatedCartt.reduce((total, item) => total + item.Total, 0);

                    return {
                        ...state,
                        Cart: updatedCartt,
                        TotalItem: totalItemss,
                        CartTotal: totalPricee,
                    };
                }


            }
    }
}

export default CartReducer