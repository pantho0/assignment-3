import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { productServices } from '../product/product.service';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const productId = order.productId;
    const findProductById =
      await productServices.getSingleProductFromDB(productId);
    if (findProductById) {
      const zodParsedData = orderValidationSchema.parse(order);
      if (order.quantity > findProductById.inventory.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      }
      const updatedInventory = (findProductById.inventory.quantity -=
        order.quantity);
      if (updatedInventory === 0) {
        findProductById.inventory.inStock = false;
      }
      const updateProductInventory = await productServices.updateProductIntoDB(
        productId,
        findProductById,
      );
      console.log(updateProductInventory);
      const result = await OrderService.createOrderInDB(zodParsedData);
      return res.status(200).json({
        success: true,
        message: 'Order Created Successfully',
        data: result,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error',
      error: error,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const email = req?.query?.email as string | null;
    if (email) {
      try {
        const result = await OrderService.getOrderByUserFromDB(email);
        if (!result) {
          res.status(200).json({
            success: false,
            message: 'Order not found',
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: result,
          });
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Internal Server Error',
        });
      }
    } else {
      const result = await OrderService.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
