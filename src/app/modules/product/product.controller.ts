import { Request, Response } from 'express';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const result = await productServices.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | null;
    if (searchTerm) {
      const result = await productServices.productSearchIntoDB(searchTerm);
      if (result.length === 0) {
        res.status(200).json({
          success: true,
          message: `No product found by your search term ${searchTerm}`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Product matching search term '${searchTerm}' successfully`,
          data: result,
        });
      }
    }
    const result = await productServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;
    const result = await productServices.updateProductIntoDB(
      productId,
      product,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
