import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const result = await OrderService.createOrderInDB(order);
    res.status(200).json({
      success: true,
      message: 'Order Created Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
        console.log(error);
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
    console.log(error);
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
