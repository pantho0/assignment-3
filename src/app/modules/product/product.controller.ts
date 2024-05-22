import { Request, Response } from 'express';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const result = await productServices.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: 'Product added successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Product retrived successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product is retrived successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
