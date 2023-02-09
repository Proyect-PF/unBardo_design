import { Request, Response } from "express";
import db from "../../database";


export const POST_AddToCart = async (req:Request, res: Response)=>{
    try {
        const {id, eliminate} = req.body;
        const product = await db.Product.findByPk(id);
        console.log("PRODUCT PRICE", product.price)
        let cart = await db.Cart.findOne({ where: { id_product: id } });
        if (!cart) {
            cart = await db.Cart.create({
                total: product.price,
                id_product: product.id,
                quantity: 1,
            });
        } else {
            if (eliminate) {
                if (cart.quantity > 1) {
                    cart.total = (cart.total - product.price); // * (cart.quantity - 1)
                    cart.quantity = cart.quantity - 1;
                    await cart.save();
                } else {
                    await cart.destroy();
                }
                res.json({ message: 'Product removed from cart' });
            } else {
                cart.total = (cart.total + product.price); // * (cart.quantity + 1)
                cart.quantity = cart.quantity + 1;
                await cart.save();
                res.json({ message: 'Product added to cart' });
            }
        }
    } catch(error: any) {
        return res.status(400).json({ error: error.message });
    }
}



