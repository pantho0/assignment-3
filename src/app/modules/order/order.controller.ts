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
    const result = await OrderService.getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
