export const getCart = async (req, res) => {
    res.json(req.session.cart || []);
};

export const addToCart = async (req, res) => {
    const { product, quantity } = req.body;

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const itemIndex = req.session.cart.findIndex(item => item.product === product);

    if (itemIndex >= 0) {
        req.session.cart[itemIndex].quantity += quantity;
    } else {
        req.session.cart.push({ product, quantity });
    }

    res.json(req.session.cart);
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.body;

    if (!req.session.cart) {
        return res.json([]);
    }

    req.session.cart = req.session.cart.filter(item => item.product !== productId);
    res.json(req.session.cart);
};

export const clearCart = async (req, res) => {
    req.session.cart = [];
    res.json({ message: "Cart cleared" });
};
