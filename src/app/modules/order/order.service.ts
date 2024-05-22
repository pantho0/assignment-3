import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderInDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

const getOrderByUserFromDB = async (email: string) => {
  const result = await OrderModel.find({ email: email });
  return result;
};

export const OrderService = {
  createOrderInDB,
  getAllOrdersFromDB,
  getOrderByUserFromDB,
};
